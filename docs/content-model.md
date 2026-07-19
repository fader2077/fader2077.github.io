# Content model

## Projects

Project files live in `src/content/projects`. Their filename should equal the `slug`. `status: draft` or non-public `visibility` prevents public site generation. A featured project also needs `status: published`, `visibility: public`, and a positive `featuredOrder`. Because this is a public Git repository, private/confidential states are not access controls; sensitive material must never be committed.

Every performance metric requires an evidence URL or a precise evidence note. If evidence is unavailable, describe the implementation without publishing a number.

## Publications

Publication files live in `src/content/publications`. `verified: true` requires a documented check and an authoritative DOI or URL. Unverified records can remain visible with a verification notice, but do not enter verified-result totals. Only verified records with `published`, `accepted`, or `in_press` status appear as formal publications in CV and structured data.

## Site data

YAML files in `src/data` control profile data, navigation, homepage section order, education, experience, awards, skills, contact, and default SEO. Navigation permits only root-relative internal links and HTTPS external links. Homepage section types are a closed set; arbitrary templates or scripts cannot be introduced through content.
