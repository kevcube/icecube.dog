terraform {
  source = "tfr:///terraform-aws-modules/kms/aws?version=3.1.0"
}

inputs = {
  description           = "KMS key to encrypt SOPS secrets that are stored in our repo."
  enable_default_policy = false
  key_owners = [
    "arn:aws:iam::633038869443:user/kevin",
    "arn:aws:iam::633038869443:role/github",
  ]
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
