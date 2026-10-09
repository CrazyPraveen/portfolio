# Praveen Raj A - Portfolio

A static portfolio built with HTML, CSS, and vanilla JavaScript. GSAP and ScrollTrigger provide the animations, loaded from a CDN.

## Run locally

Open a terminal in this folder and start a local server:

    python3 -m http.server 8000

Then open http://localhost:8000 in your browser.

Opening index.html directly also works, but a local server is recommended.

## Deploy to GitHub Pages (free)

This site is plain static files, so no build step or Jekyll is needed. The `.nojekyll` file tells GitHub Pages to serve the files as they are.

1. Create a new public repository on GitHub, for example `portfolio`.
2. Upload the **contents** of this folder to the repository root, so `index.html`, `.nojekyll`, and `.github/` sit at the top level. Do not upload the outer `portfolio/` folder itself.
3. Go to **Settings > Pages**. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or open the **Actions** tab and run **Deploy to GitHub Pages** manually).
5. When the workflow finishes, the site is live at:
   - `https://<your-username>.github.io/<repository-name>/`
   - If the repository is named `<your-username>.github.io`, the site is at `https://<your-username>.github.io/`.

All asset paths are relative, so the site works from a sub-path.

To use Jekyll instead, you would not need this workflow. GitHub Pages builds Jekyll sites automatically, but this portfolio does not use Jekyll.

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
    .nojekyll                  Tells GitHub Pages to skip Jekyll processing
    .github/workflows/         GitHub Actions workflow for GitHub Pages

## Notes

- Content is visible without JavaScript. If GSAP fails to load, the site still works without animations.
- Animations respect `prefers-reduced-motion`.
- The background scene is a canvas particle network, a cursor glow, and drifting gradient blobs. It is turned down to a single static frame for reduced-motion users and pauses while the tab is hidden.
- Remove the GSAP script tags in index.html and the `setupAnimations` call in main.js to run without animation.
