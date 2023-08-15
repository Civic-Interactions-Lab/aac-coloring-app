variable "vpc_info" {
  type = map(any)
  default = {
    "vpc_name"              = "core_vpc"
    "vpc_cidr"              = "10.0.0.0/16"
    "azs"                   = ["us-east-1", "us-east-2"]
    "private_subnet_blocks" = ["10.0.128.0/18", "10.0.192.0/18"]
    "public_subnet_blocks"  = ["10.0.0.0/18", "10.0.64.0/18"]
  }
}
