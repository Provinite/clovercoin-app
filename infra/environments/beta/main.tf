
# Bckend configuration, controls where tf-state is stored
terraform {
  backend "s3" {
    bucket = "clovercoin-tf-state"
    key    = "environments/beta"
    region = "us-east-1"
  }
}

resource "aws_iam_user" "deployer" {
  name = "beta-cc-app-deployer"
  path = "/beta/"
}

resource "aws_iam_user_policy_attachment" "deployer_deploys_api" {
  user = aws_iam_user.deployer.name
  policy_arn = module.api.api_deployer_policy_arn
}

resource "aws_iam_user_policy_attachment" "deployer_deploys_client" {
  user = aws_iam_user.deployer.name
  policy_arn = module.client.deployer_policy_arn
}

# AWS provider config, controls used for everything
provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  prefix = "beta"
  source = "../../modules/vpc"

  cidr_block          = "10.0.0.0/23"
  private_cidr_block1 = "10.0.0.0/25"
  private_cidr_block2 = "10.0.0.128/25"
  public_cidr_block   = "10.0.1.0/24"
}

# Create the API app
module "api" {
  source = "../../../packages/api/infra"

  acm_cert_arn = "arn:aws:acm:us-east-1:439703963905:certificate/a2bd2066-7790-4840-b067-5c45396393b9"
  domain_name  = "beta-api.clovercoin.com"

  prefix           = "beta"
  public_subnet_id = module.vpc.subnets.public.id
  db_subnets       = [module.vpc.subnets.private[0].id, module.vpc.subnets.private[1].id]
  vpc_id           = module.vpc.vpc_id
  depends_on       = [module.vpc]
}

module "client" {
  source       = "../../../packages/client/infra"
  prefix       = "beta"
  domain_name  = "beta-app.clovercoin.com"
  acm_cert_arn = "arn:aws:acm:us-east-1:439703963905:certificate/3b442583-021e-4754-81f7-622829cc8f73"
}
