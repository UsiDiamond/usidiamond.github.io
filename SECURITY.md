# Security Policy

## Supported Versions

This site ships as a single rolling release: only the code currently
deployed from the `main` branch is live and supported. There are no
maintained older releases or LTS branches to track.

| Version        | Supported          |
| -------------- | ------------------- |
| `main` (latest) | :white_check_mark: |
| anything older  | :x:                 |

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report it privately through one of these channels:

- [GitHub Security Advisories](https://github.com/UsiDiamond/usidiamond.github.io/security/advisories/new) for this repository (preferred)
- Email [usi@usidiamond.dev](mailto:usi@usidiamond.dev)

Please include as much detail as you can — steps to reproduce, the affected
page/component, and the potential impact — so it can be triaged quickly.

This is a solo-maintained personal project, so there's no formal SLA, but
reports are taken seriously and you can expect an initial acknowledgement
within a week. The site is a static Angular build behind a hardened nginx
image with no backend, no user accounts, and no stored user data (see the
`Dockerfile`/`nginx.conf` for the CSP and other security headers in place),
so most valid reports will concern client-side issues (XSS, CSP bypass) or
vulnerable dependencies.
