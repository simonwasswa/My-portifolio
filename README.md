# Portfolio

A single-page portfolio/resume site built with **React + TypeScript + Tailwind CSS + Vite**.

## Getting started

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve the production build
```

## Personalise it

Almost everything lives in **`src/data/profile.ts`** — search for `TODO`:

| What | Where |
| --- | --- |
| Name, title, summary, contact links | `profile` object |
| GitHub username (drives the Projects section) | `GITHUB_USERNAME` |
| Location & availability (Contact section) | `profile.contactInfo` |
| Skills and icons | `skillGroups` |
| Job history | `experiences` |
| CV download | put your file at `public/resume.pdf` (or change `resumeUrl`) |
| Accent colour | `brand` palette in `tailwind.config.js` |

## Structure

```
src/
├── components/   Navbar, Hero, About, Skills, Experience, Projects, ProjectCard,
│                 Contact, Footer, Section (shared wrapper), ThemeToggle
├── data/         profile.ts — all personal content
├── hooks/        useDarkMode, useGitHubRepos, useInView, useActiveSection
├── types/        shared TypeScript interfaces
├── App.tsx
├── main.tsx
└── index.css     Tailwind directives + base styles
```

## Notes

- **Projects** are fetched client-side from `https://api.github.com/users/<username>/repos`.
  Every public repo is shown except forks and your profile-README repo. They're ordered by stars, forks,
  how recently you pushed, and whether they have a description/homepage. To show only the top few, set
  `PROJECT_LIMIT` in `src/components/Projects.tsx`.
  Responses are cached in `sessionStorage` for 10 minutes to stay under GitHub's 60 requests/hour anonymous limit.
- A repo's **live demo** link comes from its GitHub "Website" field; its **tags** come from its language and topics.
  Set both on GitHub to get richer cards.
- The **message form** sends through [Formspree](https://formspree.io), so messages arrive in your email inbox.
  Set `contactInfo.formspreeId` in `src/data/profile.ts` to your form ID (the part after `/f/` in your form's
  endpoint). The visitor's email is used as the reply-to address, so you can answer by simply replying.
  "Send on WhatsApp" opens a WhatsApp chat with the message already written instead.
- **Dark mode** uses Tailwind's `class` strategy. The choice is saved to `localStorage` and falls back to the OS setting.
  A tiny script in `index.html` applies it before first paint so the page doesn't flash.
