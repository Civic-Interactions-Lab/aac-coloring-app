provider "aws" {
  region                   = "us-east-1"
  shared_credentials_files = ["~/.aws/credentials"]
  profile                  = "personal-dev"
}

# Networking
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = var.vpc_info.vpc_name
  cidr = var.vpc_info.vpc_cidr

  azs             = var.vpc_subnet_info.azs
  private_subnets = var.vpc_subnet_info.private_subnet_blocks
  public_subnets  = var.vpc_subnet_info.public_subnet_blocks

  map_public_ip_on_launch = true
  enable_nat_gateway      = true
  nat_eip_tags = {
    "Name" = "nat-EIP"
  }
  nat_gateway_tags = {
    "Name" = "natgw"
  }

  create_igw = true
  igw_tags = {
    "Name" = "igw-main"
  }
}

resource "aws_security_group" "allow_web_sg" {
  name   = "security group from terraform"
  vpc_id = module.vpc.vpc_id

  ingress {
    description = "SSH from anywhere"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "80 from anywhere"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_launch_template" "launch_template" {
  name          = "aac-expressjs-backend-launch-temp"
  image_id      = var.ami_info.ami
  instance_type = var.ami_info.instance_type

  network_interfaces {
    device_index    = 0
    security_groups = [aws_security_group.allow_web_sg.id]
  }
  tag_specifications {
    resource_type = "instance"

    tags = {
      Name = "ASG-Backend-VM"
    }
  }
}

# Application Load Balancer Resources

resource "aws_lb" "alb" {
  name               = "expressjs-backend-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.allow_web_sg.id]
  subnets            = [for i in module.vpc.public_subnets : i]
}

resource "aws_lb_target_group" "target_group" {
  name     = "expressjs-backend-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  health_check {
    path    = "/health-check"
    matcher = 200
  }
}

resource "aws_lb_listener" "alb_listener" {
  load_balancer_arn = aws_lb.alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.target_group.arn
  }
}

# ASG

resource "aws_autoscaling_group" "auto_scaling_group" {
  desired_capacity    = var.asg_info.desired_capacity
  max_size            = var.asg_info.max_size
  min_size            = var.asg_info.min_size
  vpc_zone_identifier = [for i in module.vpc.private_subnets : i]
  target_group_arns   = [aws_lb_target_group.target_group.arn]

  launch_template {
    id      = aws_launch_template.launch_template.id
    version = aws_launch_template.launch_template.latest_version
  }
}

output "alb_public_url" {
  description = "Public URL"
  value       = aws_lb.alb.dns_name
}
