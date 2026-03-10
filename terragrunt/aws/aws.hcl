generate "provider" {
  path      = "aws_provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<-EOF
    provider "aws" {
      region              = "${read_terragrunt_config(find_in_parent_folders("region.hcl")).locals.aws_region}"
      allowed_account_ids = ["633038869443"]
    }
  EOF
}
