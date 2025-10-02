resource "vercel_project" "icecube_dog" {
  name = "icecube-dog"
  framework = "nextjs"
  auto_assign_custom_domains = true
  git_repository = {
    production_branch = "main"
    repo = "kevcube/icecube.dog"
    type = "github"
  }
}
