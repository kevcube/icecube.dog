terraform {
  source = "tfr:///cloudposse/cloudfront-s3-cdn/aws?version=0.92.0"
}

inputs = {
  name                = "test-app-f324jff"
  acm_certificate_arn = dependency.certificate.outputs.arn
  aliases             = ["tapp2.${dependency.hosted_zone.outputs.fqdn}"]
  parent_zone_id      = dependency.hosted_zone.outputs.zone_id
  dns_alias_enabled   = true
}

dependency "hosted_zone" {
  config_path = "../../global/dns/icecube.dog/zone"
}

dependency "certificate" {
  config_path = "../../us-east-1/security/acm/icecube.dog"
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
