
# Bckend configuration, controls where tf-state is stored
terraform {
  backend "s3" {
    bucket = "clovercoin-tf-state"
    key    = "environments/beta"
    region = "us-east-1"
  }
}

# AWS provider config, controls used for everything
provider "aws" {
  region = "us-east-1"
}

module "vpc" {
  source = "../../modules/vpc"

  cidr_block          = "10.0.0.0/23"
  private_cidr_block1 = "10.0.0.0/25"
  private_cidr_block2 = "10.0.0.128/25"
  public_cidr_block   = "10.0.1.0/24"
}

# Create the API app
module "api" {
  source = "../../../packages/api/infra"

  prefix           = "beta"
  public_subnet_id = module.vpc.subnets.public.id
  db_subnets       = [module.vpc.subnets.private[0].id, module.vpc.subnets.private[1].id]
  vpc_id           = module.vpc.vpc_id
  depends_on       = [module.vpc]
}
