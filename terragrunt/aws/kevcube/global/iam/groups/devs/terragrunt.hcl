terraform {
  source = "tfr:///terraform-aws-modules/iam/aws//modules/iam-group-with-policies?version=5.41.0"
}

inputs = {
  name = "devs"

  group_users = [
    "alexander",
    "kyle",
    "sarvar",
    "volodymyr",
  ]

  custom_group_policy_arns = [
    "arn:aws:iam::aws:policy/PowerUserAccess",
  ]

  enable_mfa_enforcement = true
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
