resource "aws_s3_bucket" "client" {
  bucket_prefix = "${var.prefix}-web-client-"
  force_destroy = true
}
resource "aws_s3_bucket_ownership_controls" "enable_acls" {
  bucket = aws_s3_bucket.client.id

  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}
resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket     = aws_s3_bucket.client.id
  acl        = "private"
  depends_on = [aws_s3_bucket_ownership_controls.enable_acls]
}

resource "aws_s3_bucket_public_access_block" "public_block" {
  bucket                  = aws_s3_bucket.client.id
  block_public_acls       = true
  block_public_policy     = true
  restrict_public_buckets = true
  ignore_public_acls      = true
}

resource "aws_s3_bucket_policy" "bucket_policy" {
  bucket = aws_s3_bucket.client.id
  policy = data.aws_iam_policy_document.bucket_policy_document.json
}

resource "aws_cloudfront_origin_access_identity" "oai" {
  comment = "OAI for ${var.domain_name}"
}

resource "aws_iam_policy" "client_deployer" {
  name   = "${var.prefix}-cc-client-deploy"
  policy = data.aws_iam_policy_document.client_deployer.json
}

data "aws_iam_policy_document" "client_deployer" {
  statement {
    effect = "Allow"

    actions = [
      "s3:ListBucket",
      "s3:DeleteObject",
      "s3:PutObject",
    ]
    resources = [aws_s3_bucket.client.arn, "${aws_s3_bucket.client.arn}/*"]
  }
  statement {
    effect = "Allow"

    actions = [
      "ecr:GetAuthorizationToken"
    ]
    resources = ["*"]
  }
}


data "aws_iam_policy_document" "bucket_policy_document" {
  statement {
    actions = ["s3:GetObject", "s3:ListBucket"]
    resources = [
      aws_s3_bucket.client.arn,
      "${aws_s3_bucket.client.arn}/*"
    ]
    principals {
      type        = "AWS"
      identifiers = [aws_cloudfront_origin_access_identity.oai.iam_arn]
    }
  }
}

resource "aws_cloudfront_distribution" "cf_dist" {
  enabled             = true
  aliases             = [var.domain_name]
  default_root_object = "index.html"
  origin {
    domain_name = aws_s3_bucket.client.bucket_regional_domain_name
    origin_id   = aws_s3_bucket.client.id
    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.oai.cloudfront_access_identity_path
    }
  }
  default_cache_behavior {
    allowed_methods        = ["GET", "HEAD", "OPTIONS", "PUT", "POST", "PATCH", "DELETE"]
    cached_methods         = ["GET", "HEAD", "OPTIONS"]
    target_origin_id       = aws_s3_bucket.client.id
    viewer_protocol_policy = "redirect-to-https" # other options - https only, http
    forwarded_values {
      headers      = []
      query_string = true
      cookies {
        forward = "all"
      }
    }
  }
  custom_error_response {
    error_code         = 404
    response_code      = 200
    response_page_path = "/index.html"
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

