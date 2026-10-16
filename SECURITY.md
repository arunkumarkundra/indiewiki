# Security policy

IndieWiki is a static website with no accounts, no database and no server code, but we still take reports seriously: a problem could affect readers' trust, or the contribution process.

## Reporting a vulnerability

Please report privately, not in a public issue:

1. Use GitHub's **Report a vulnerability** button under this repository's **Security** tab (private vulnerability reporting), or
2. Email the address shown on <https://indie.pi3.in/contact/>.

Include what you found, how to reproduce it, and the impact you expect. We aim to acknowledge reports within 5 working days and to fix confirmed issues promptly. We are happy to credit you once a fix is published, if you would like.

## In scope

- The published site at indie.pi3.in
- The build and test code in this repository
- The GitHub Actions workflows

## Out of scope

- Third-party websites and tools linked from the wiki
- Reports from automated scanners without a demonstrated impact
- Missing HTTP headers that GitHub Pages does not let sites set (these are documented in the wiki itself)

The machine-readable version of this policy is at <https://indie.pi3.in/.well-known/security.txt>.
