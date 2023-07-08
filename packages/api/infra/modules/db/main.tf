
# create a RDS Database Instance
resource "aws_db_instance" "db" {
  engine                      = "postgres"
  identifier                  = "${var.prefix}-cc-api-postgres"
  db_subnet_group_name        = var.subnet_group_name
  allocated_storage           = 20
  engine_version              = "15.3"
  instance_class              = "db.t3.micro"
  manage_master_user_password = true
  username                    = "postgres"
  parameter_group_name        = "default.postgres15"
  vpc_security_group_ids      = [var.security_group_id]
  multi_az                    = false
  skip_final_snapshot         = true
  publicly_accessible         = false
}
