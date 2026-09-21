# Emmanuel Keter | Portfolio

Personal portfolio website: a static site (HTML, CSS, vanilla JS) with no build step, ready for GitHub Pages.

## Structure

- `index.html`: all content (about, experience, projects, skills, education, contact)
- `styles.css`: styling, with light/dark themes and responsive layout
- `app.js`: theme toggle, mobile menu, scroll reveal, active nav link
- `assets/`: images. Contains `DP.jpeg` (portrait shown in the hero) and `Emmanuel_Keter_Resume.docx` (linked as the Download CV button).

## Run locally

Open `index.html` in a browser, or serve the folder:

```sh
python -m http.server 8000
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (name it `<username>.github.io` for a root URL, or any name for a project URL).
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then save.
4. The site goes live at `https://<username>.github.io/` (or `/<repo>/`) within a minute or two.

## Updating content

Edit the text directly in `index.html`. Colours live in the `:root` variables at the top of `styles.css`.
