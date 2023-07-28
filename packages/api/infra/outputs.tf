output "api_url" {
  value = module.api.api_url
}

output "api_deployer_policy_arn" {
  value = aws_iam_policy.api_deployer.arn
}