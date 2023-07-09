# # ECS cluster that will hold our service
# resource "aws_ecs_cluster" "cluster" {
#   name = "${var.prefix}-cc-api-cluster"
# }

# # Enable spot instances
# resource "aws_ecs_cluster_capacity_providers" "capacity_provider" {
#   cluster_name       = aws_ecs_cluster.cluster.name
#   capacity_providers = ["FARGATE_SPOT"]
# }

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
  image_uri     = "${var.ecr_repo_url}:latest"
  role          = var.execution_role_arn
  package_type  = "Image"
  memory_size   = 512
  timeout       = 5
  environment {
    variables = {
      CC_DB_HOST    = var.db_endpoint
      DB_SECRET_ARN = var.db_secret_arn
      DB_NAME       = var.db_name
    }
  }
  vpc_config {
    subnet_ids         = [var.public_subnet_id]
    security_group_ids = [var.api_security_group_id]
  }
}

# resource "aws_ecs_task_definition" "api" {
#   family                   = "${var.prefix}-cc-api"
#   requires_compatibilities = ["FARGATE"]
#   network_mode             = "awsvpc"
#   cpu                      = 256 # 0.25 vCPU
#   memory                   = 512 # 0.5 GB
#   execution_role_arn       = var.execution_role_arn
#   container_definitions = jsonencode([{
#     name      = "api"
#     image     = "${var.ecr_repo_url}:latest"
#     essential = true
#     portMappings = [{
#       containerPort = 80
#       hostPort      = 80
#       protocol      = "tcp"
#     }]
#     environment = [{
#       name  = "CC_JWT_SECRET"
#       value = "secret"
#     }]
#     logConfiguration = {
#       logDriver = "awslogs"
#       options = {
#         awslogs-group         = var.log_group_name
#         awslogs-region        = "us-east-1"
#         awslogs-stream-prefix = "${var.prefix}-cc-api"
#       }
#     }
#   }])
# }

# resource "aws_ecs_service" "service" {
#   name            = "${var.prefix}-api-svc"
#   launch_type     = "FARGATE"
#   desired_count   = 1
#   cluster         = aws_ecs_cluster.cluster.arn
#   task_definition = aws_ecs_task_definition.api.arn
#   network_configuration {
#     assign_public_ip = true
#     subnets          = [var.public_subnet_id]
#     security_groups  = [var.api_security_group_id]
#   }
# }
