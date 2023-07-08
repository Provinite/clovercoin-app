output "master_secret_arn" {
  value = aws_db_instance.db.master_user_secret[0].secret_arn
}

output "endpoint" {
  value = aws_db_instance.db.endpoint
}
