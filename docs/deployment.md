# Deployment

Pull requests run the complete validation workflow. Production deployment runs only for `main` (or a manual workflow dispatch), builds a fresh static artifact, and publishes it with GitHub's official Pages actions. The build and deploy jobs are separate; the deploy job receives only the validated artifact.

In repository Settings → Pages, select **GitHub Actions** as the source. Protect `main`, require the Validate check, and require pull-request review before merge. The deployed HTML records the source commit in a `deploy-sha` meta tag.

Decap CMS authentication is separate from Pages deployment. Complete the OAuth setup in `docs/cms-setup.md`; do not place OAuth secrets in repository variables used by the public build.

Rollback by reverting the faulty commit on `main`. The revert triggers a new validated deployment and preserves an auditable history.
