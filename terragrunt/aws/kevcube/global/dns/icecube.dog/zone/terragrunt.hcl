terraform {
  source = "github.com/cloudposse/terraform-aws-route53-cluster-zone?ref=0.16.0"
}

inputs = {
  zone_name                  = "icecube.dog"
  parent_zone_record_enabled = false
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
