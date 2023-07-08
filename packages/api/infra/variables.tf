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
