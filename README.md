# Praveen Raj A - Portfolio

A static portfolio built with HTML, CSS, and vanilla JavaScript. GSAP and ScrollTrigger provide the animations, loaded from a CDN.

## Run locally

Open a terminal in this folder and start a local server:

    python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

Opening index.html directly also works, but a local server is recommended.

## Deploy

Upload the folder to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages). No build step is needed.

## Edit content

All personal details, skills, projects, and experience live in `js/portfolio-data.js`.

- Set `github` and `email` when you have them. Empty values hide the related links.
- Set `accentColor` to change the accent colour.
- Add or remove entries in `projects` and `experience`.

Colours, spacing, and layout widths are CSS custom properties at the top of `css/style.css`.

## Files

    index.html                 Page structure and section markup
    css/style.css              Design tokens, layout, responsive rules, reduced motion
    js/portfolio-data.js       Personal information and project data
    js/main.js                 Rendering, mobile navigation, GSAP animations
    assets/images/             Reserved for images (none are required)

## Notes

- Content is visible without JavaScript. If GSAP fails to load, the site still works without animations.
- Animations respect `prefers-reduced-motion`.
- Remove the GSAP script tags in index.html and the `setupAnimations` call in main.js to run without animation.
