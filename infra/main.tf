provider "aws" {
  region = "us-east-1"
}

resource "aws_security_group" "allow_web_sg" {
  name = "security group from terraform"

  ingress {
    description = "SSH from the internet"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "80 from the internet"
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

resource "aws_instance" "aws_ins_web" {

  ami                         = "ami-080a2d17e153ef91f"
  instance_type               = "t2.micro"
  vpc_security_group_ids      = [aws_security_group.allow_web_sg.id]
  associate_public_ip_address = true

}

output "instance_ip" {
  value = aws_instance.aws_ins_web.public_ip
}
