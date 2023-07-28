variable "key_file" {
  description = "Public key for the aws key pair"
  type = string
}

variable "prefix" {
  description = "The prefix to apply to resource identifiers."
  type        = string
}

variable "public_subnet_id" {
  description = "The ID of the public subnet to deploy the API to."
  type        = string
}

variable "db_subnets" {
  description = "List of subnets to use for the db subnet group."
  type        = list(string)
}

variable "vpc_id" {
  description = "VPC to deploy into"
  type        = string
}

variable "domain_name" {
  type = string
  description = "Domain name to host the API. Used for cloudfront. Should be on the SSL cert."
}

variable "acm_cert_arn" {
  type=string
  description = "ARN of the ACM cert to use with cloudfront"
}