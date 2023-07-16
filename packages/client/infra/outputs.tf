output "bucket" {
  value = aws_s3_bucket.client.id
}

output "cloudfront_domain" {
  value = aws_cloudfront_distribution.cf_dist.domain_name
}

output "domain_name" {
  value = var.domain_name
}