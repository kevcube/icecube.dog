terraform {
  source = "tfr:///terraform-aws-modules/s3-bucket/aws?version=5.10.0"
}

inputs = {
  bucket = "kb-icecube-dog-origin-633038869443"

  attach_deny_insecure_transport_policy = true
  attach_require_latest_tls_policy      = true

  attach_policy = true
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "AllowCloudFrontServiceReadOnly"
        Effect = "Allow"
        Principal = {
          Service = "cloudfront.amazonaws.com"
        }
        Action   = ["s3:GetObject"]
        Resource = "arn:aws:s3:::kb-icecube-dog-origin-633038869443/*"
        Condition = {
          StringEquals = {
            "AWS:SourceArn" = "arn:aws:cloudfront::633038869443:distribution/E31PJ1G6FH8ZRE"
          }
        }
      }
    ]
  })
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
