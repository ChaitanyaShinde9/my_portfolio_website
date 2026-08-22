# Chaitanya Shinde — Portfolio

A React + Vite portfolio built around an electronics/schematic visual language —
reference-designator section labels (U1, U2…), a "signal trace" rail connecting
each section, datasheet-style project cards, and an engineering title block in
the hero. Built from the real content on your Google Sites portfolio.

## Run it locally

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/`. Preview it with `npm run preview`.

## Deploy it for free

Any static host works. Two easy options:

**Vercel**
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo.
3. Framework preset: Vite. Click Deploy.

**Netlify**
1. Push to GitHub (or drag-and-drop the `dist/` folder after `npm run build`
   at app.netlify.com/drop).
2. Build command: `npm run build`, publish directory: `dist`.

**GitHub Pages**
1. `npm install -D gh-pages`
2. Add to `package.json` scripts: `"deploy": "gh-pages -d dist"`
3. `npm run build && npm run deploy`

## Before you publish — things to update

All real content lives at the top of `src/App.jsx` in the `PROFILE`, `ABOUT`,
`STRENGTHS`, `SKILL_GROUPS` and `PROJECTS` objects/arrays, so you don't have to
touch any JSX/CSS to update copy. Specifically:

- `PROFILE.github` — currently a placeholder (`https://github.com/`). Add your
  real GitHub URL, and update the `/your-username` text next to it in the
  Contact section.
- Each project's `links` array (currently just labels like `"GitHub"`,
  `"Demo"`, `"Paper"`) — wire these up to real URLs by turning them into
  `{ label, href }` objects and rendering `<a href={l.href}>` instead of a
  `<span>` in the Projects section, once you have live repo/demo links.
- The **Gym Management System** project description was rebuilt from the
  project title alone (the source page had a copy-paste duplication bug and
  was missing its real description) — please sanity-check the problem/
  solution/tech-stack text against what you actually built.
- Swap the favicon/meta description in `index.html` if you'd like something
  more custom than the generated "CS" mark.

## Structure

```
index.html          entry HTML
src/main.jsx         React root
src/App.jsx           all sections, styles and content (single file by design)
```
