# Content model

## Projects

Project files live in `src/content/projects`. Their filename should equal the `slug`. `status: draft` or non-public `visibility` prevents public generation. A featured project also needs `status: published`, `visibility: public`, and a positive `featuredOrder`.

Every performance metric requires an evidence URL or a precise evidence note. If evidence is unavailable, describe the implementation without publishing a number.

## Publications

Publication files live in `src/content/publications`. `verified: true` means the metadata was checked against an authoritative registry or primary record and the check is documented. Unverified records can remain visible with a verification notice, but do not enter verified-result totals.

## Site data

YAML files in `src/data` control profile data, navigation, homepage section order, education, experience, awards, skills, contact, and default SEO. Navigation permits only root-relative internal links and HTTPS external links. Homepage section types are a closed set; arbitrary templates or scripts cannot be introduced through content.
