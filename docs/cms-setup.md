# CMS setup

The CMS is available at `/admin/` after deployment. It uses Decap CMS's GitHub backend and editorial workflow, so content changes are proposed through Git branches and pull requests before reaching `main`.

1. Create a GitHub OAuth App for this site and configure the authorization callback service required by the Decap GitHub backend.
2. Keep client secrets only in that service's secret store; never commit them.
3. Grant repository write access only to intended editors.
4. Open `/admin/`, authenticate, create an editorial-workflow entry, and confirm its pull request passes validation.

Authentication is the one manual deployment prerequisite. The repository contains no deploy-time secret and the public site continues to work if the CMS authentication service is unavailable.
