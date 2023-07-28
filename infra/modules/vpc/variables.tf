variable "cidr_block" {
  description = "VPC cidr block"
  type        = string
}

variable "public_cidr_block" {
  description = "VPC cidr block for public subnet"
  type        = string
}

variable "private_cidr_block1" {
  description = "VPC cidr block for private subnet"
  type        = string
}

variable "private_cidr_block2" {
  description = "VPC cidr block for private subnet"
  type        = string
}

variable "prefix" {
  description = "Prefix for names of resources"
  type = string
}