resource "random_password" "example" {
  length           = 10
  special          = false
  override_special = "_@%"
}

output "random_password" {
  sensitive = true
  value     = random_password.example.result
}
