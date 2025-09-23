<div align="center">

# Nitin Bharti — Personal Portfolio & Blog

Showcase of my work, skills, and writing. Built with React, Vite, Tailwind, and a Supabase-powered blog with an admin dashboard.

![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?logo=vite&logoColor=white) 
![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white) 
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwindcss&logoColor=white) 
![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase&logoColor=white)

</div>

## ✨ Features

- **Modern portfolio**: Hero, About, Education, Skills, Experience, Projects, Blog, Contact
- **Blog**: Categories, tags, search with debounce, grid/list view, pagination, featured posts
- **Post details**: `/blog/:slug` route with cover image, meta, and content rendering
- **Admin CMS**: Login, create/edit/delete posts, toggle publish, featured, category & tag relations
- **Auth**: Supabase email/password with session handling via context
- **UI**: Tailwind CSS with Radix UI primitives and custom components
- **Notifications**: `react-hot-toast` toasts configured with theme

## 🧰 Tech Stack

- React 19 + Vite 7
- Tailwind CSS 4 + tailwind-merge + tailwindcss-animate
- Radix UI (`@radix-ui/react-*`), `lucide-react`
- Supabase (`@supabase/supabase-js`)
- React Router DOM 7
- Markdown tooling (`react-markdown`, `remark-gfm`, `rehype-*`) for rich content

## 🗂️ App Structure (Routes)

- `/` — main portfolio page (sections rendered in `src/App.jsx`)
- `/blog` — blog listing (`src/pages/BlogPage.jsx`)
- `/blog/:slug` — blog post details (`src/components/blog/BlogPost.jsx`)
- `/admin/login` — admin authentication
- `/admin` — admin dashboard (`src/pages/AdminDashboard.jsx`)

## 🔑 Environment Variables

Create a `.env` file in the project root (kept out of Git via `.gitignore`):

```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

These are read in `src/lib/supabase.js` via `import.meta.env`.

## 🧱 Database (Supabase)

The blog uses Supabase tables with relations for categories and tags. See `supabase-schema.sql` for a starter schema. Key tables:

- `blog_posts` (title, slug, excerpt, content, cover_image, publish_date, read_time, published, featured)
- `blog_categories`, `blog_tags`
- `blog_post_categories` (join), `blog_post_tags` (join)

## 🚀 Getting Started

```bash
# 1) Install
npm install

# 2) Add environment variables
# create .env as shown above

# 3) Run locally
npm run dev

# 4) Lint (optional)
npm run lint

# 5) Build & preview
npm run build
npm run preview
```

Dev server will print a local URL (typically `http://localhost:5173`).

## 🔐 Admin Login

Auth is handled by Supabase email/password. Create a user in Supabase Auth, then log in at `/admin/login`. Sessions are managed in `src/contexts/AuthContext.jsx`.

## 📝 Content Editing

The `AdminDashboard` provides:

- Create, edit, delete posts
- Toggle `published` and `featured`
- Assign categories and tags

`BlogEditor` handles the editor UI and saves via `src/services/blogService.js`.

## 🧪 Blog Features Highlight

- Debounced search over title/excerpt/content
- Category filtering and tag display
- Grid/list switcher and responsive layouts
- Pagination (`9` posts per page by default)

## 🛡️ Security & Secrets

- `.env` is ignored by Git (see `.gitignore`). If secrets were ever pushed, rotate them in your providers and keep only safe public keys in the repo.

## 🌐 Deployment

- Works well on Vercel/Netlify.
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your hosting provider’s environment settings.
- Build command: `npm run build`
- Output directory: `dist`

`vercel.json` is included; `vercel-build` script maps to `vite build`.

## 📜 Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint

## 📁 Assets

Static images in `public/` are used across sections and blog. PDF resume is available as `public/Nitin_Bharti.pdf`.

## 🙌 Acknowledgements

- UI icons via `lucide-react`
- Radix UI components
- Supabase for backend-as-a-service

---

Made with ❤️ by **Nitin Bharti**.
