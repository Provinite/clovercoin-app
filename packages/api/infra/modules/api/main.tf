resource "aws_lambda_function_url" "api_url" {
  function_name      = aws_lambda_function.api.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}


resource "aws_lambda_function" "api" {
  function_name = "${var.prefix}-cc-api-fn"
  image_uri     = "${var.ecr_repo_url}:DUMMY"
  role          = var.execution_role_arn
  package_type  = "Image"
  memory_size   = 512
  timeout       = 5
  environment {
    variables = {
      CC_DB_HOST     = var.db_endpoint
      DB_SECRET_ARN  = var.db_secret_arn
      JWT_SECRET_ARN = var.jwt_secret_arn
      DB_NAME        = var.db_name
      DB_SSL         = "true"
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
    response_headers_policy_id = aws_cloudfront_response_headers_policy.api_response_policy.id
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
}

resource "aws_cloudfront_response_headers_policy" "api_response_policy" {
  name = "${var.prefix}-api-response-headers-policy"
  cors_config {
    access_control_allow_credentials = true

    access_control_allow_headers {
      items = ["Authorization"]
    }

    access_control_allow_methods {
      items = ["POST"]
    }

    access_control_allow_origins {
      items = ["example.com"]
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
