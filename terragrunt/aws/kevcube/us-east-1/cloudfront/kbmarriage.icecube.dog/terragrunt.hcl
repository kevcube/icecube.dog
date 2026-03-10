terraform {
  source = "tfr:///terraform-aws-modules/cloudfront/aws?version=4.1.0"
}

dependency "bucket" {
  config_path = "../../../us-east-2/s3/kbmarriage.icecube.dog"

  mock_outputs = {
    s3_bucket_bucket_regional_domain_name = "kb-icecube-dog-origin-633038869443.s3.us-east-2.amazonaws.com"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

dependency "certificate" {
  config_path = "../../security/acm/icecube.dog"

  mock_outputs = {
    arn = "arn:aws:acm:us-east-1:633038869443:certificate/placeholder"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

dependency "hosted_zone" {
  config_path = "../../../global/dns/icecube.dog/zone"

  mock_outputs = {
    fqdn = "icecube.dog"
  }
  mock_outputs_allowed_terraform_commands = ["validate", "plan"]
}

inputs = {
  create_origin_access_control = true
  origin_access_control = {
    kbmarriage = {
      description      = "kb.icecube.dog origin access"
      origin_type      = "s3"
      signing_behavior = "always"
      signing_protocol = "sigv4"
    }
  }

  aliases                        = ["kb.${dependency.hosted_zone.outputs.fqdn}"]
  comment                        = "kb.icecube.dog static site"
  default_root_object            = "index.html"
  create_monitoring_subscription = true
  http_version                   = "http2and3"
  is_ipv6_enabled                = true
  price_class                    = "PriceClass_100"

  default_cache_behavior = {
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]
    compress               = true
    target_origin_id       = "kb-s3-static"
    viewer_protocol_policy = "redirect-to-https"
  }

  origin = {
    "kb-s3-static" = {
      domain_name           = dependency.bucket.outputs.s3_bucket_bucket_regional_domain_name
      origin_access_control = "kbmarriage"
    }
  }

  viewer_certificate = {
    acm_certificate_arn      = dependency.certificate.outputs.arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
