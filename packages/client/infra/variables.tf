variable "prefix" {
  description = "The prefix to apply to resource identifiers."
  type        = string
}

variable "domain_name" {
  description = "The domain name to use for cloudfront. Must be configured outside of terraform"
  type        = string
}

variable "acm_cert_arn" {
  description = "ARN of the ACM certificate to use in cloudfront"
}
