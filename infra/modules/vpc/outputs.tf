output "subnets" {
  description = "Subnets created for the vpc"
  value = {
    private = [{
      id = aws_subnet.private1.id
      },
      {
        id = aws_subnet.private2.id
    }]
    public = {
      id = aws_subnet.public.id
    }
  }
}

output "vpc_id" {
  description = "ID of the vpc"
  value       = aws_vpc.main.id
}
