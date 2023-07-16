resource "aws_lambda_function_url" "api_url" {
  function_name      = aws_lambda_function.api.function_name
  authorization_type = "NONE"
  cors {
    allow_credentials = true
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["keep-alive", "date"]
    max_age           = 86400
  }
}

resource "aws_lambda_function" "api" {
  function_name = "${var.prefix}-cc-api-fn"
  image_uri     = "${var.ecr_repo_url}:DUMMY"
  role          = var.execution_role_arn
  package_type  = "Image"
  memory_size   = 512
  timeout       = 5
  environment {
    variables = {
      CC_DB_HOST    = var.db_endpoint
      DB_SECRET_ARN = var.db_secret_arn
      DB_NAME       = var.db_name
      DB_SSL        = "true"
    }
  }
  vpc_config {
    subnet_ids         = [var.public_subnet_id]
    security_group_ids = [var.api_security_group_id]
  }

  lifecycle {
    ignore_changes = [image_uri]
  }
}
