# Multi-AZ private subnet group to hold the RDS instance
resource "aws_db_subnet_group" "private" {
  name       = "${var.prefix}-private_db_subnets"
  subnet_ids = var.db_subnets
}

data "aws_ecr_authorization_token" "token" {}


# ECR repository for API images
resource "aws_ecr_repository" "app_repo" {
  name                 = "${var.prefix}-cc-api"
  image_tag_mutability = "IMMUTABLE"
  force_delete         = true
  image_scanning_configuration {
    scan_on_push = true
  }
  lifecycle {
    ignore_changes = all
  }

  provisioner "local-exec" {
    # This is a 1-time execution to put a dummy image into the ECR repo, so 
    #    terraform provisioning works on the lambda function. Otherwise there is
    #    a chicken-egg scenario where the lambda can't be provisioned because no
    #    image exists in the ECR
    command = <<EOF
      docker login ${data.aws_ecr_authorization_token.token.proxy_endpoint} -u AWS -p ${data.aws_ecr_authorization_token.token.password}
      docker pull alpine
      docker tag alpine ${aws_ecr_repository.app_repo.repository_url}:DUMMY
      docker push ${aws_ecr_repository.app_repo.repository_url}:DUMMY
      EOF
  }
}


resource "aws_secretsmanager_secret" "jwt_secret" {
  name_prefix = "${var.prefix}-cc-api-jwt-secret-"
}

resource "random_password" "jwt_secret" {
  length  = 32
  special = true
}

resource "aws_secretsmanager_secret_version" "jwt_secret" {
  secret_id     = aws_secretsmanager_secret.jwt_secret.id
  secret_string = random_password.jwt_secret.result
}


resource "aws_iam_policy" "api_deployer" {
  name   = "${var.prefix}-cc-api-deploy"
  policy = data.aws_iam_policy_document.api_deployer.json
}

data "aws_iam_policy_document" "api_deployer" {
  statement {
    effect = "Allow"

    actions = [
      "ecr:CompleteLayerUpload",
      "ecr:UploadLayerPart",
      "ecr:InitiateLayerUpload",
      "ecr:BatchCheckLayerAvailability",
      "ecr:PutImage"
    ]
    resources = [aws_ecr_repository.app_repo.arn]
  }
  statement {
    effect = "Allow"

    actions = [
      "ecr:GetAuthorizationToken"
    ]
    resources = ["*"]
  }

  statement {
    effect    = "Allow"
    actions   = ["lambda:UpdateFunctionCode"]
    resources = [module.api.lambda_arn, module.api.migrate_lambda_arn]
  }
    statement {
    effect    = "Allow"
    actions   = ["lambda:InvokeFunction"]
    resources = [module.api.migrate_lambda_arn]
  }
}


# Cloudwatch log group to hold API logs
resource "aws_cloudwatch_log_group" "api_logs" {
  name = "${var.prefix}-cc-api"
}

data "aws_iam_policy_document" "ecs_executor_policy" {
  statement {
    effect = "Allow"

    actions   = ["rds-db:connect"]
    resources = ["${module.db.rds_db.arn}/${module.db.rds_db.db_name}"]
  }

  statement {
    effect = "Allow"

    actions = [
      "secretsmanager:GetSecretValue",
    ]
    resources = [module.db.master_secret_arn, aws_secretsmanager_secret.jwt_secret.arn]
  }
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = [aws_cloudwatch_log_group.api_logs.arn]
  }
}


# IAM Policy allowing AWS to assume a role to start lambdas
data "aws_iam_policy_document" "assume_role_lambda" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}


# IAM role that runs the API lambda
resource "aws_iam_role" "executor" {
  name               = "${var.prefix}-api-executor-role"
  assume_role_policy = data.aws_iam_policy_document.assume_role_lambda.json
  inline_policy {
    name   = "executor"
    policy = data.aws_iam_policy_document.ecs_executor_policy.json
  }

  managed_policy_arns = ["arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"]
}

# Security group for RDS Database Instance
# Use Cases:
# - Receive connections API tasks
resource "aws_security_group" "rds_sg" {
  vpc_id = var.vpc_id
  name   = "${var.prefix}-api-rds-sg"
  egress = []
}

resource "aws_vpc_security_group_ingress_rule" "rds_allow_from_api" {
  from_port                    = 5432
  to_port                      = 5432
  referenced_security_group_id = aws_security_group.api_web_sg.id
  security_group_id            = aws_security_group.rds_sg.id
  ip_protocol                  = "tcp"
}

resource "aws_vpc_security_group_ingress_rule" "rds_allow_from_bastion" {
  from_port                    = 5432
  to_port                      = 5432
  referenced_security_group_id = aws_security_group.bastion_sg.id
  security_group_id            = aws_security_group.rds_sg.id
  ip_protocol                  = "tcp"
}


# Security group for API instances. These are internet-facing instances
# Use Cases:
# Egress:
# - Pulling ECR images
# - Connecting to RDS
# 
# Ingress:
# - Web traffic from the world
# TODO: Egress should be locked down most likely to just RDS on postgres port
# and https to ECR. Not sure if ECR has a known IP range though. Could use VPC
# endpoints otherwise if not.
resource "aws_security_group" "api_web_sg" {
  description = "Security group for api server instances"
  name        = "${var.prefix}-api-web-sg"
  vpc_id      = var.vpc_id
  ingress {
    description = "ALL"
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    description = "HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    description     = "Postgres"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.rds_sg.id]
  }
}

resource "aws_security_group" "bastion_sg" {
  description = "Security group for bastion server"
  name        = "${var.prefix}-api-bastion-sg"
  vpc_id      = var.vpc_id
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  egress {
    description     = "Postgres"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.rds_sg.id]
  }
}
resource "aws_key_pair" "bastion_skrolk" {
  key_name   = "${var.prefix}-cc-api-bastion"
  public_key = file(var.key_file)
}

resource "aws_instance" "bastion" {
  ami           = "ami-0af9d24bd5539d7af"
  instance_type = "t2.micro"
  subnet_id = var.public_subnet_id
  vpc_security_group_ids = [aws_security_group.bastion_sg.id]

  key_name = aws_key_pair.bastion_skrolk.key_name

  tags = {
    Name = "${var.prefix}-cc-api-bastion"
  }
}

module "db" {
  source = "./modules/db"

  prefix            = var.prefix
  subnet_group_name = aws_db_subnet_group.private.name
  vpc_id            = var.vpc_id
  security_group_id = aws_security_group.rds_sg.id
}

module "api" {
  source = "./modules/api"

  domain_name  = var.domain_name
  acm_cert_arn = var.acm_cert_arn

  jwt_secret_arn = aws_secretsmanager_secret.jwt_secret.arn

  db_endpoint   = module.db.endpoint
  db_name       = module.db.rds_db.db_name
  db_secret_arn = module.db.master_secret_arn

  prefix                = var.prefix
  public_subnet_id      = var.public_subnet_id
  execution_role_arn    = aws_iam_role.executor.arn
  api_security_group_id = aws_security_group.api_web_sg.id
  ecr_repo_url          = aws_ecr_repository.app_repo.repository_url
  log_group_name        = aws_cloudwatch_log_group.api_logs.name
}
