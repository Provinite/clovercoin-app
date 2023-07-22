output "api_url" {
  value = aws_lambda_function_url.api_url.function_url
}

output "lambda_arn" {
  value = aws_lambda_function.api.arn
}