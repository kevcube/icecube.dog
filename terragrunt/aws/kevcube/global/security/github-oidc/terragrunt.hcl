terraform {
  source = "tfr:///unfunco/oidc-github/aws?version=1.8.1"
}

inputs = {
  attach_admin_policy = true
  github_repositories = [
    "hamza221/tapp2",
    "kevcube/icecube.dog",
    "kevcube/telegram-web-app",
    "TelegramHackathonBerlin/telegram-web-app",
    "kevcube/openteller",
  ]
}

include "aws" {
  path = find_in_parent_folders("aws.hcl")
}

include "root" {
  path = find_in_parent_folders("root.hcl")
}
