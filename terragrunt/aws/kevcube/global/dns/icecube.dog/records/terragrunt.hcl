terraform {
  source = "tfr:///terraform-aws-modules/route53/aws//modules/records?version=5.0.0"
}

dependency "zone" {
  config_path = "../zone"

  mock_outputs = {
    zone_id = "Z3P5QSUBK4POTI"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

dependency "cloudfront" {
  config_path = "../../../../us-east-1/cloudfront/kbmarriage.icecube.dog"

  mock_outputs = {
    cloudfront_distribution_domain_name    = "d111111abcdef8.cloudfront.net"
    cloudfront_distribution_hosted_zone_id = "Z2FDTNDATAQYW2"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

inputs = {
  zone_id = dependency.zone.outputs.zone_id

  records = [
    {
      name = "kb"
      type = "A"
      alias = {
        name                   = dependency.cloudfront.outputs.cloudfront_distribution_domain_name
        zone_id                = dependency.cloudfront.outputs.cloudfront_distribution_hosted_zone_id
        evaluate_target_health = false
      }
    },
    {
      name = "kb"
      type = "AAAA"
      alias = {
        name                   = dependency.cloudfront.outputs.cloudfront_distribution_domain_name
        zone_id                = dependency.cloudfront.outputs.cloudfront_distribution_hosted_zone_id
        evaluate_target_health = false
      }
    }
  ]
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
