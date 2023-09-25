resource "aws_lambda_function_url" "api_url" {
  function_name      = aws_lambda_function.api.function_name
  authorization_type = "NONE"
}

resource "aws_lambda_function" "api" {
  function_name = "${var.prefix}-cc-api-fn"
  image_uri     = "${var.ecr_repo_url}:DUMMY"
  role          = var.execution_role_arn
  package_type  = "Image"
  memory_size   = 512
  timeout       = 30
  environment {
    variables = {
      CC_DB_HOST                 = var.db_endpoint
      DB_SECRET_ARN              = var.db_secret_arn
      JWT_SECRET_ARN             = var.jwt_secret_arn
      DB_NAME                    = var.db_name
      DB_SSL                     = "true"
      CC_IMG_BUCKET              = aws_s3_bucket.image_bucket.id
      CC_AWS_SES_FROM_ADDRESS    = "${var.prefix}-no-reply@clovercoin.com"
      CC_WEB_CLIENT_ORIGIN       = "https://${var.prefix}-app.clovercoin.com"
      CC_ENV_NAME                = title(var.prefix)
      CC_APP_NAME                = "Cloverse Species"
      CC_AWS_SES_SMTP_SECRET_ARN = var.smtp_secret_arn
      CC_AWS_SES_SMTP_SECURE     = "false"
      CC_AWS_SES_USE_SMTP        = "true"
      CC_AWS_SES_SMTP_HOST       = "email-smtp.us-east-1.amazonaws.com"
      CC_AWS_SES_SMTP_PORT       = "587"
      CC_ADMIN_EMAIL             = var.admin_email
    }
  }
  vpc_config {
    subnet_ids         = [var.public_subnet_id]
    security_group_ids = [var.api_security_group_id]
  }

  lifecycle {
    ignore_changes = [image_uri]
  }
}

# bucket for cloudfront logs
resource "aws_s3_bucket" "image_bucket" {
  bucket_prefix = "${var.prefix}-cc-api-cloudfront-"
  force_destroy = true
}
resource "aws_s3_bucket_ownership_controls" "enable_image_bucket_acls" {
  bucket = aws_s3_bucket.image_bucket.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_s3_bucket_acl" "image_bucket_acl" {
  bucket     = aws_s3_bucket.image_bucket.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.enable_image_bucket_acls]
}

resource "aws_s3_bucket_public_access_block" "no_public_img_access" {
  bucket                  = aws_s3_bucket.image_bucket.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}


# Migration lambda
resource "aws_lambda_function" "migrate" {
  function_name = "${var.prefix}-cc-api-migrate-fn"
  image_uri     = "${var.ecr_repo_url}:DUMMY"
  image_config {
    command = ["app.migrate"]
  }
  role         = var.execution_role_arn
  package_type = "Image"
  memory_size  = 512
  timeout      = 900 # 15 minutes
  environment {
    variables = {
      CC_DB_HOST                 = var.db_endpoint
      DB_SECRET_ARN              = var.db_secret_arn
      JWT_SECRET_ARN             = var.jwt_secret_arn
      DB_NAME                    = var.db_name
      DB_SSL                     = "true"
      CC_IMG_BUCKET              = aws_s3_bucket.image_bucket.id
      CC_AWS_SES_FROM_ADDRESS    = "${var.prefix}-no-reply@clovercoin.com"
      CC_WEB_CLIENT_ORIGIN       = "https://${var.prefix}-app.clovercoin.com"
      CC_ENV_NAME                = title(var.prefix)
      CC_APP_NAME                = "Cloverse Species"
      CC_AWS_SES_SMTP_SECRET_ARN = var.smtp_secret_arn
      CC_AWS_SES_SMTP_SECURE     = "false"
      CC_AWS_SES_USE_SMTP        = "true"
      CC_AWS_SES_SMTP_HOST       = "email-smtp.us-east-1.amazonaws.com"
      CC_AWS_SES_SMTP_PORT       = "587"
      CC_ADMIN_EMAIL             = var.admin_email
    }
  }
  vpc_config {
    subnet_ids         = [var.public_subnet_id]
    security_group_ids = [var.api_security_group_id]
  }

  lifecycle {
    ignore_changes = [image_uri]
  }
}

# bucket for cloudfront logs
resource "aws_s3_bucket" "api_cf_logs" {
  bucket_prefix = "${var.prefix}-cc-api-cloudfront-"
  force_destroy = true
}
resource "aws_s3_bucket_ownership_controls" "enable_api_cf_logs_acls" {
  bucket = aws_s3_bucket.api_cf_logs.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket     = aws_s3_bucket.api_cf_logs.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.enable_api_cf_logs_acls]
}

resource "aws_s3_bucket_public_access_block" "public_block" {
  bucket                  = aws_s3_bucket.api_cf_logs.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}


resource "aws_cloudfront_distribution" "cf_dist" {
  enabled = true
  aliases = [var.domain_name]
  origin {
    domain_name = replace(aws_lambda_function_url.api_url.function_url, "/^https?://([^/]+).*/", "$1")
    origin_id   = aws_lambda_function_url.api_url.function_url
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_ssl_protocols   = ["TLSv1.2"]
      origin_read_timeout    = 60
      origin_protocol_policy = "https-only"
    }
  }
  default_cache_behavior {
    allowed_methods            = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods             = ["GET", "HEAD"]
    target_origin_id           = aws_lambda_function_url.api_url.function_url
    viewer_protocol_policy     = "redirect-to-https" # other options - https only, http
    cache_policy_id            = aws_cloudfront_cache_policy.api_cache_policy.id
    origin_request_policy_id   = aws_cloudfront_origin_request_policy.api_origin_request_policy.id
    response_headers_policy_id = "5cc3b908-e619-4b99-88e5-2cf7f45965bd" #aws_cloudfront_response_headers_policy.api_response_policy.id
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    acm_certificate_arn      = var.acm_cert_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2018"
  }
  logging_config {
    bucket = aws_s3_bucket.api_cf_logs.bucket_domain_name
    prefix = "${var.prefix}/cc-api-cloudfront/"
  }
}

resource "aws_cloudfront_response_headers_policy" "api_response_policy" {
  name = "${var.prefix}-api-response-headers-policy"
  cors_config {
    access_control_allow_credentials = false

    access_control_allow_headers {
      items = ["*"]
    }

    access_control_allow_methods {
      items = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    }

    access_control_allow_origins {
      items = ["*"]
    }

    origin_override = false
  }
}

resource "aws_cloudfront_cache_policy" "api_cache_policy" {
  name        = "${var.prefix}-api-cache-policy"
  min_ttl     = 0
  max_ttl     = 0
  default_ttl = 0
  parameters_in_cache_key_and_forwarded_to_origin {
    headers_config {
      header_behavior = "none"
    }
    query_strings_config {
      query_string_behavior = "none"
    }
    cookies_config {
      cookie_behavior = "none"
    }
  }
}

resource "aws_cloudfront_origin_request_policy" "api_origin_request_policy" {
  name = "${var.prefix}-api-origin-request-policy"
  headers_config {
    header_behavior = "allExcept"
    # If the host header is forwarded to the lambda URL, it breaks. This policy
    # forces cloudfront to send the origin host in the host header instead 
    # so that the lambda service can properly tell what lambda we're invoking
    headers {
      items = ["Host"]
    }
  }
  query_strings_config {
    query_string_behavior = "all"
  }
  cookies_config {
    cookie_behavior = "none"
  }
}
