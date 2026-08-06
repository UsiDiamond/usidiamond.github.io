# Usi's Personal Website [![Deploy static content to Pages](https://github.com/UsiDiamond/usidiamond.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/UsiDiamond/usidiamond.github.io/actions/workflows/deploy.yml) [![Integration Tests](https://github.com/UsiDiamond/usidiamond.github.io/actions/workflows/integration-tests.yml/badge.svg)](https://github.com/UsiDiamond/usidiamond.github.io/actions/workflows/integration-tests.yml) [![Code Coverage](https://github.com/UsiDiamond/usidiamond.github.io/actions/workflows/coverage.yml/badge.svg)](https://github.com/UsiDiamond/usidiamond.github.io/actions/workflows/coverage.yml)

---

## ✨ What is an Usi?

> *It is a queer, autistic, trans and non-binary, autodidactic developer as well as a lifelong Linux desktop geek, and impassioned mathematics enthusiast.*

Its expertise covers a litany of web application standards, languages, libraries, protocols, and system security patterns. Its passion is to analyze and solve difficult problems with rapid research and prototyping.

---

## 🪷 Pronouns?

Usi is **plural** and uses mostly **it/its** pronouns, but accepts **they/them** or **its name** in contexts where confusion may arise.

Members of the Usi System use *'It'*, *'We'*, and sometimes rarely *'I'* as first-person pronouns in speech and text.

🔗 [pronouns.page/@usiia](https://en.pronouns.page/@usiia)

---

## 🎵 What music does it like?

It listens to a lot of classical and opera (mostly from 1900–1940s recording artists) from training and interest, but in modern music it's mostly caught coding to **chiptune** and **furry electronica**.

When not consulting, advocating, tinkering, or coding, it keeps its whole self engaged with continuing **classical voice training** in operatic repertoire.

---

## 🌈 What causes does it care about?

It enjoys helping non-profit efforts in:

- 🏳️‍🌈 LGBTQIA+ Civil Rights
- 🧠 Neurodiversity
- ♿ IT enrichment for disabled and vulnerable Americans
- 🐧 Free Open Source Software (FOSS) advocacy
- 🔧 Right to Repair
- 🏛️ Government Transparency

It has **over a decade of public service** at the largest social insurance program ever made on earth.

---

## 🎮 What games does it like?

In gaming, it enjoys:

- 🗡️ Third-person RPGs
- 🌸 JRPGs
- 🎲 TTRPGs — playing and GMing since 1999:
  - D&D (2e, 3.5e, 4.5e, 5e)
  - Pathfinder
  - Vampire the Masquerade
  - Star Wars 5e
- 🗺️ Indie Metroidvanias
- 🧝 LARPing

**NES Ninja Gaiden II** is its favorite challenge.

It is an advocate of "save player one" — doesn't play gachas or other financially predatory multiplayer games.

---

## 💼 What does the Usi do for money?

It has been a **professional full-stack developer for over 13 years**. It is responsible for:

- Customer, Technician, Management Information, Human Resources, and Auditing Online Self-Service Application Design/Modification
- Analyzing and Refining Systems Requirements
- Code-Level Security Implementation, Design, and Maintenance
- Secure DevOps Environment Development
- Cloud Migration
- Enterprise Architecture

---

## 🛠️ What's this site built with?

This is an [Angular](https://angular.dev/) (v21) + TypeScript single-page app, styled with Bootstrap and a [Three.js](https://threejs.org/)/[Vanta.js](https://www.vantajs.com/) animated background. A few things worth knowing if you're poking around the code:

- **🌍 Internationalization** — [`@ngx-translate`](https://github.com/ngx-translate/core) drives translations across **11 languages** (English, Spanish, French, German, Russian, Korean, Vietnamese, Tagalog, Simplified Chinese, Arabic, and Yiddish), including full **right-to-left (RTL) layout** support for Arabic and Yiddish.
- **♿ Accessibility** — the main nav is a proper WAI-ARIA `menubar`, with roving-tabindex keyboard navigation (arrow keys, <kbd>Home</kbd>/<kbd>End</kbd>), a skip-to-main-content link, and focus management on route changes.
- **🔒 Hardened deployment** — production runs as a multi-stage Docker build: the Angular app served by an `nginx:stable-alpine` image locked down per OWASP guidance (CSP, `X-Frame-Options`, `X-Content-Type-Options`, hidden server tokens, non-root user, request-rate limiting).
- **✅ Tests** — unit tests via Karma/Jasmine with code coverage, plus a Nightwatch + Cucumber (Gherkin) end-to-end suite covering navigation, i18n, RTL layout, and responsive behavior across Chrome/Firefox/Safari/Edge.
- **🚦 CI/CD** — every push runs the Integration Tests and Code Coverage workflows above; merges to `main` auto-deploy to GitHub Pages via the Deploy workflow.

### Running it locally

```bash
npm install
npm run start-dev   # ng serve with live reload, http://localhost:4200
```

### Building & testing

```bash
npm run build       # production build -> public/usidiamond.github.io/browser
npm test            # unit tests (Karma/Jasmine)
npm run coverage    # unit tests with code coverage
npm run e2e         # builds, serves, and runs the Nightwatch/Cucumber e2e suite in Chrome
```

(`e2e:firefox`, `e2e:safari`, and `e2e:edge` run the same suite in other browsers; `e2e:docker` runs it against the containerized build via `docker compose`.)

### Running the container

```bash
npm run dockerBuild
npm run dockerRun
# or, equivalently:
docker compose up
```
