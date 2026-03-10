terraform {
  source = "tfr:///terraform-aws-modules/iam/aws//wrappers/iam-user?version=5.41.0"
}

inputs = {
  items = {
    alexander = {
      name = "alexander"
    }
    kyle      = {
      name = "kyle"
    }
    sarvar    = {
      name = "sarvar"
    }
    volodymyr = {
      name = "volodymyr"
    }
  }
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
