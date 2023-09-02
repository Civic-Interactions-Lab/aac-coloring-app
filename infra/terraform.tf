terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # backend "remote" {
  #   organization = "AAC-Coloring"

  #   workspaces {
  #     name = "aac-coloring-infra"
  #   }
  # }

  # backend "local" {

  # }

  backend "s3" {
    bucket         = "perma-terraform-state-bucket"
    dynamodb_table = "state-lock-aac-IAC"
    key            = "aac/coloring-book-personal/terraform.tfstate"
    region         = "us-east-1"
    encrypt        = true
    profile        = "personal-general"
  }
}
