output "master_secret_arn" {
  value = aws_db_instance.db.master_user_secret[0].secret_arn
}

output "endpoint" {
  value = aws_db_instance.db.endpoint
}

output "rds_db" {
  value = {
    arn = aws_db_instance.db.arn
    username = aws_db_instance.db.username
    db_name  = aws_db_instance.db.db_name
  }
}
