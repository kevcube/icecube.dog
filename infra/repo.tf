resource "github_repository" "icecube_dog" {
  name       = "icecube.dog"
  visibility = "public"
  homepage_url           = "https://icecube.dog"

  allow_auto_merge       = true
  allow_update_branch    = true
  allow_merge_commit     = false
  allow_rebase_merge     = false
  allow_squash_merge     = true
  delete_branch_on_merge = true
  has_downloads          = false

  squash_merge_commit_message = "PR_BODY"
  squash_merge_commit_title = "PR_TITLE"

  vulnerability_alerts = true
}
