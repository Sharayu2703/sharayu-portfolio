# Sharayu Borude — Portfolio

A responsive React + Vite portfolio for Sharayu Borude, a Computer Engineering graduate focused on full-stack and AI development. The interface uses a dark Bento-inspired visual system with a curated project archive, skills, experience, education, and contact information.

## Run locally

```bash
npm install
npm run dev
```

Create and preview a production build:

```bash
npm run build
npm run preview
```

Run the configured lint check:

```bash
npm run lint
```

## Structure

- `src/data/profile.js` — profile, social, education, and experience content
- `src/data/skills.js` — grouped technical skills
- `src/data/projects.js` — project descriptions, categories, links, and technologies
- `src/components/` — shared navigation, project explorer/details, and portfolio sections
- `src/pages/` — home, about, and project routes
- `public/assets/` — existing project and social imagery

The project archive groups related frontend/backend repositories into one product entry. Project descriptions and links are based on the linked repositories and existing portfolio content; proposed AI integrations are explicitly marked as ideas rather than implemented features.

## Contact form

The contact form submits to the included Express API and stores messages in MongoDB.

