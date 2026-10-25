# Fatin — AI Engineering & Agentic Products

A responsive personal portfolio for [fashzd.github.io](https://fashzd.github.io/). Built with HTML, CSS, and vanilla JavaScript, with locally served fonts and actual project screenshots. No build process or runtime dependencies.

## Preview

Serve the repository over HTTP with any static server. For example:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Then open http://127.0.0.1:4173. The core portfolio also works without JavaScript; JavaScript adds project filtering, case study dialogs, screenshot galleries, the workflow illustration controls, mobile menu, and email copying.

## Content

- `index.html`: page structure, project summaries, background, contact details, and SEO metadata.
- `styles.css`: responsive design, locally hosted typography, and reduced-motion support.
- `script.js`: interactions and the detailed case study content in `projectDetails`.
- `assets/projects/`: original project screenshots.
- `project-notes.md`: source material for the experience and project descriptions.

Update both project summaries in `index.html` and case studies in `script.js` when changing project details. Add real profile or certificate links only when available. The portfolio makes no calls to AI services and collects no visitor data.

## GitHub Pages

Publish the root directory of the repository's `main` branch in GitHub Pages settings. `.nojekyll` lets Pages serve these static files directly. Relative asset URLs also support previews under a subdirectory. If moving to a different public domain, update the canonical URL, Open Graph URLs, `robots.txt`, and `sitemap.xml`.

## Fonts

DM Sans and Instrument Serif are distributed under the SIL Open Font License. Their license texts are in `assets/fonts/`.
