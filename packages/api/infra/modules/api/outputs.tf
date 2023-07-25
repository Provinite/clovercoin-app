output "api_url" {
  value = aws_lambda_function_url.api_url.function_url
}

output "lambda_arn" {
  value = aws_lambda_function.api.arn
}

output "migrate_lambda_arn" {
  description = "ARN for the migration lambda"
  value = aws_lambda_function.migrate.arn
}