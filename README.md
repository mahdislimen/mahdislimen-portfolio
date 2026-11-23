# Mahdi Slimen · Portfolio

Personal portfolio of **Mahdi Slimen**, AI Full-Stack Engineer (LLM & RAG engineering, agentic AI, AI integration) based in Dubai, UAE.

**Live:** https://mahdi-slimen.netlify.app/

## Stack

- Angular 19 (standalone components, signals, new control flow)
- Tailwind CSS 3 with a custom dark design system (`tailwind.config.js`, `src/styles.css`)
- No UI or animation libraries: motion uses CSS, SVG and a small canvas, and respects `prefers-reduced-motion`

## Structure

```
src/
  app/
    home/                     page composition (section order)
    components/home/          one folder per section (hero, about, expertise, experience,
                              projects, tech-stack, architecture, education, contact)
    components/shared/        navbar, footer, icon set, flow diagram, neural background,
                              reveal / spotlight directives
  core/models/                TypeScript interfaces
  utils/data/                 all content (edit these files to update the site)
  assets/                     CV PDF, portrait, favicon, Open Graph image
docs/
  MahdiSlimen-Cv.pdf          current CV (same file as src/assets/Mahdi_Slimen_CV.pdf)
  cv/cv.html                  CV source (print to PDF, see below)
```

Content lives in `src/utils/data/*.ts`. Architecture diagrams are data-driven (`architectures.ts`) and rendered by `FlowDiagramComponent`.

## Development

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build → dist/portfolio/browser
npm test           # unit tests (Karma + headless Chrome)
```

## Updating the CV

Edit `docs/cv/cv.html`, then print it to PDF with headless Chrome:

```bash
chrome --headless=new --no-pdf-header-footer --print-to-pdf=docs/MahdiSlimen-Cv.pdf docs/cv/cv.html
cp docs/MahdiSlimen-Cv.pdf src/assets/Mahdi_Slimen_CV.pdf
```

## Deployment

Netlify builds from `netlify.toml`: `npm run build`, publish `dist/portfolio/browser`, Node 20.

© Mahdi Slimen. All rights reserved.
