terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 6"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 3.0"
    }
  }
}
