remote_state {
  backend = "s3"
  generate = {
    path      = "remote_state.tf"
    if_exists = "overwrite_terragrunt"
  }
  config = {
    bucket  = "tf-remote-state-633038869443"
    key     = "${path_relative_to_include()}/terraform.tfstate"
    encrypt = true
    region  = "eu-central-1"
  }
}
