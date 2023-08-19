variable "vpc_info" {
  type = map(any)
  default = {
    "vpc_name" = "core_vpc"
    "vpc_cidr" = "10.0.0.0/16"
  }
}

variable "vpc_subnet_info" {
  type = map(list(string))
  default = {
    "azs"                   = ["us-east-1a", "us-east-1b"]
    "private_subnet_blocks" = ["10.0.128.0/18", "10.0.192.0/18"]
    "public_subnet_blocks"  = ["10.0.0.0/18", "10.0.64.0/18"]
  }
}

variable "ami_info" {
  type = map(string)
  default = {
    "ami"           = "ami-0224e2424def4eab2"
    "instance_type" = "t2.micro"
  }
}

variable "iam_info" {
  type = map(string)
  default = {
    "access_key_param_intance_profile_arn" = "arn:aws:iam::396954209126:instance-profile/AllowEC2ToAccessParamStoreViaSSMAndDecryptViaKMS"
  }
}

variable "asg_info" {
  type = map(any)
  default = {
    desired_capacity = 1
    max_size         = 4
    min_size         = 1
  }
}
