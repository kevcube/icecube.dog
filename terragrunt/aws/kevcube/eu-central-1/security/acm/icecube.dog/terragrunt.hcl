terraform {
  source = "tfr:///cloudposse/acm-request-certificate/aws?version=0.16.3"
}

inputs = {
  domain_name = dependency.domain.outputs.fqdn
  zone_id     = dependency.domain.outputs.zone_id
}

dependency "domain" {
  config_path = "../../../../global/dns/icecube.dog/zone"
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
