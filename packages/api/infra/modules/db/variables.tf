variable "prefix" {
  description = "The prefix to apply to resource identifiers."
  type        = string
}

variable "subnet_group_name" {
  description = "Subnet to deploy the db instance into"
  type        = string
}

variable "vpc_id" {
  description = "VPC to deploy into"
  type        = string
}

variable "security_group_id" {
  description = "Security group for RDS instance"
  type = string
}