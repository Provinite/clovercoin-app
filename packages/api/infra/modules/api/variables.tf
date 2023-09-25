variable "prefix" {
  description = "The prefix to apply to resource identifiers."
  type        = string
}

variable "public_subnet_id" {
  description = "ID of the public subnet to run API tasks in"
  type = string
}

variable "execution_role_arn" {
  description = "ARN of the execution role for ecs tasks"
  type        = string
}

variable "api_security_group_id" {
  description = "Security group for web api"
  type        = string
}

variable "ecr_repo_url" {
  description = "URL of the ECR repository for the api image"
  type = string
}

variable "log_group_name" {
  description = "Log group for API logs"
  type = string
}

variable "db_endpoint" {
  description = "Endpoint to connect to postgres"
  type = string
}

variable "db_name" {
  description = "Database name to connect to"
  type = string
}

variable "db_secret_arn" {
  description = "ARN of the secrets-manager secret that is used to access the database"
  type = string
}

variable "smtp_secret_arn" {
  description = "ARN of the secrets-manager secret that is used to access SES smtp"
  type = string
}

variable "domain_name" {
  description = "API domain name for use in cloudfront alias"
  type = string
}

variable "acm_cert_arn" {
  description = "ARN for the ACM SSL cert to use with the API cloudfront distribution"
  type = string
}

variable "jwt_secret_arn" {
  description = "ARN for the secrets-manager secret that stores the JWT secret"
  type = string
}

variable "admin_email" {
  description = "Admin email address"
  type = string
}