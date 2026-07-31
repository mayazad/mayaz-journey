# 🚀 Mayaz Journey — AI Engineer Portfolio

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live%20Demo-mayaz--journey.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://mayaz-journey.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ecf8e?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

A **fully dynamic, recruiter-ready personal portfolio** for Md Adnan Hossain Mayaz — AI Engineer & Software Engineering student. Built with a modern glassmorphism dark aesthetic and a database-backed admin panel for zero-code content updates.

</div>

---

## ✨ Features

- **Dynamic Content** — All text, projects, and links are stored in Supabase and served dynamically. No hardcoding.
- **Admin Panel** — Secure, password-protected dashboard to update profile, manage projects, and read contact messages without touching code.
- **GitHub Activity Section** — Live contribution calendar, language stats, and top repository cards fetched directly from the GitHub API.
- **Education Section** — Academic background displayed with a premium glassmorphism card layout.
- **Contact Form** — Functional form that saves messages directly to the database.
- **Smooth Animations** — Framer Motion powered scroll-triggered animations and micro-interactions throughout.
- **Fully Responsive** — Optimized for mobile, tablet, and desktop with no horizontal scroll issues.
- **SEO Ready** — Dynamic `sitemap.xml`, `robots.txt`, meta tags, and semantic HTML.
- **Custom Favicon** — AI-generated neon "M" logo icon matching the portfolio aesthetic.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Deployment** | Vercel |
| **Icons** | Lucide React |

---

## 📁 Project Structure

```
mayaz_portfolio/
├── app/
│   ├── (public)/          # Public-facing pages (home, projects, about, contact)
│   ├── admin/             # Password-protected admin dashboard
│   └── api/               # API routes (contact form, github stats)
├── components/
│   ├── public/            # All public UI sections (Hero, About, Projects, etc.)
│   └── icons/             # Custom SVG icon components
├── lib/
│   └── supabase/          # Supabase client helpers (server + client)
├── scripts/               # One-off data migration scripts
├── supabase/
│   └── migrations/        # SQL schema & seed data
└── types/                 # Shared TypeScript type definitions
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mayazad/mayaz-journey.git
cd mayaz-journey
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Set up the database

Run the SQL migration in your Supabase SQL Editor:

```bash
# Copy the contents of supabase/migrations/001_schema.sql
# and run it in your Supabase Dashboard → SQL Editor
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

---

## 🔐 Admin Panel

The admin dashboard is available at `/admin`. To set up access:

1. Go to your [Supabase Dashboard](https://supabase.com) → **Authentication** → **Users**
2. Click **Add user** → **Create new user**
3. Enter your email and a secure password
4. Log in at `https://your-site.vercel.app/admin`

From the admin panel you can:
- ✏️ Edit your profile bio, tagline, and links
- 📁 Add, edit, delete, and reorder portfolio projects
- 📬 Read contact form submissions
- 🔗 Manage social media links

---

## 📦 Deployment

This project is deployed on **Vercel**. Any push to `main` triggers an automatic deployment.

**Required Vercel Environment Variables:**
```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL
```

---

## 👤 Author

**Md Adnan Hossain Mayaz**
AI Engineer · Software Engineering Student · Data Science Major

[![GitHub](https://img.shields.io/badge/GitHub-mayazad-181717?style=flat-square&logo=github)](https://github.com/mayazad)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-md--mayaz--ad-0077b5?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/md-mayaz-ad/)
[![Portfolio](https://img.shields.io/badge/Portfolio-mayaz--journey.vercel.app-6366f1?style=flat-square&logo=vercel)](https://mayaz-journey.vercel.app)

---

<div align="center">
  <sub>Built with ❤️ by Mayaz · Deployed on Vercel</sub>
</div>
