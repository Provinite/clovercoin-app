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
      CC_DB_HOST    = var.db_endpoint
      DB_SECRET_ARN = var.db_secret_arn
      DB_NAME       = var.db_name
      DB_SSL        = "true"
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
  enabled             = true
  aliases             = [var.domain_name]
  origin {
    domain_name = replace(aws_lambda_function_url.api_url.function_url,"/^https?://([^/]+).*/", "$1")
    origin_id   = aws_lambda_function_url.api_url.function_url
    custom_origin_config {
      http_port=80
      https_port=443
      origin_ssl_protocols = ["TLSv1.2"]
      origin_read_timeout = 60
      origin_protocol_policy = "https-only"
    }
  }
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_lambda_function_url.api_url.function_url
    viewer_protocol_policy = "redirect-to-https" # other options - https only, http
    forwarded_values {
      headers      = ["*"]
      query_string = true
      cookies {
        forward = "all"
      }
    }
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
