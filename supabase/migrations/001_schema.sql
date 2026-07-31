-- ============================================================
-- Portfolio Website — Supabase SQL Migration
-- Run this in Supabase Dashboard → SQL Editor
-- ============================================================

-- PROFILE (single row: the site owner's info)
create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  tagline text not null,
  bio_short text not null,
  bio_long text not null,
  email text not null,
  phone text,
  location text,
  profile_photo_url text,
  resume_url text,
  github_url text,
  linkedin_url text,
  updated_at timestamptz default now()
);

-- PROJECTS
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  short_description text not null,
  long_description text,
  cover_image_url text,
  gallery_image_urls text[] default '{}',
  tech_stack text[] default '{}',
  github_url text,
  live_url text,
  achievements jsonb default '[]',
  is_featured boolean default false,
  display_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- SOCIAL LINKS
create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  url text not null,
  display_order int default 0
);

-- CONTACT MESSAGES
create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  is_read boolean default false,
  created_at timestamptz default now()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table profile enable row level security;
alter table projects enable row level security;
alter table social_links enable row level security;
alter table contact_messages enable row level security;

-- Public read
create policy "Public read profile" on profile for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read social_links" on social_links for select using (true);

-- Admin write (authenticated)
create policy "Admin write profile" on profile for all using (auth.role() = 'authenticated');
create policy "Admin write projects" on projects for all using (auth.role() = 'authenticated');
create policy "Admin write social_links" on social_links for all using (auth.role() = 'authenticated');

-- Contact messages: anyone can insert, only admin can read/update
create policy "Public insert contact" on contact_messages for insert with check (true);
create policy "Admin read contact" on contact_messages for select using (auth.role() = 'authenticated');
create policy "Admin update contact" on contact_messages for update using (auth.role() = 'authenticated');

-- ============================================================
-- SEED DATA (clearly marked — edit via admin panel after setup)
-- ============================================================

insert into profile (
  full_name, tagline, bio_short, bio_long, email, phone, location,
  github_url, linkedin_url, profile_photo_url, resume_url
) values (
  'Md Adnan Hossain Mayaz',
  'AI Engineer building intelligent models and machine learning systems',
  'Computer Science student and AI Engineer passionate about machine learning, deep learning, and building data-driven intelligent solutions.',
  'I''m Md Adnan Hossain Mayaz, an AI Engineer based in Bangladesh. I specialize in Artificial Intelligence, Machine Learning, and Deep Learning.

I have strong hands-on expertise with Python and core data science libraries like NumPy and Pandas. My technical focus revolves around building and training advanced models using TensorFlow, and developing computer vision solutions such as the YOLO object detection model.

I love diving deep into data, training complex neural networks, and creating AI-driven applications that solve real-world problems. When I''m not training models, I''m keeping up with the latest AI research, contributing to projects, and constantly pushing myself to learn new techniques in this rapidly evolving field.',
  'officialmayazad@gmail.com',
  null,
  'Bangladesh',
  'https://github.com/mayazad',
  'https://www.linkedin.com/in/md-mayaz-ad/',
  'https://zubsvwcqekrizyqotkkg.supabase.co/storage/v1/object/public/profile-photos/mayazad.jpg',
  'https://zubsvwcqekrizyqotkkg.supabase.co/storage/v1/object/public/resumes/adnan-hossain-resume.pdf'
) on conflict do nothing;

insert into social_links (platform, url, display_order) values
  ('github', 'https://github.com/mayazad', 1),
  ('linkedin', 'https://www.linkedin.com/in/md-mayaz-ad/', 2)
on conflict do nothing;

-- Sample featured projects (replace with real projects via admin panel)
insert into projects (
  title, slug, short_description, long_description,
  tech_stack, github_url, live_url,
  achievements, is_featured, display_order
) values
(
  'Campus Buddy',
  'campus-buddy',
  'An AI-powered campus companion app with dual-model chat, course recommendations, and real-time campus information.',
  'Campus Buddy is a full-stack platform built for university students. It features a dual-model AI chat system (VarsityAI + ExternalLLM), real-time campus event feeds, course recommendations, and an admin dashboard for content management. Built with Next.js, Supabase, and a custom LLM integration layer.',
  ARRAY['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'OpenAI API'],
  'https://github.com/mayazad',
  null,
  '[{"label": "AI response accuracy", "value": "94%"}, {"label": "Student users", "value": "200+"}]'::jsonb,
  true, 1
),
(
  'Mayaz Journey Portfolio',
  'mayaz-journey',
  'A recruiter-ready personal portfolio with a Supabase-backed admin panel for zero-code content updates.',
  'A fully dynamic personal portfolio built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Supabase. Features a database-backed admin panel where the owner can update profile info, manage projects, and view contact messages — all without touching code.',
  ARRAY['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Framer Motion', 'shadcn/ui'],
  'https://github.com/mayazad/mayaz-journey',
  null,
  '[{"label": "Lighthouse score", "value": "95+"}, {"label": "Deploy time", "value": "< 30s"}]'::jsonb,
  true, 2
),
(
  'Full-Stack Web Project',
  'fullstack-web-project',
  'A complete web application with authentication, real-time database, and responsive UI.',
  'A robust full-stack web application built with modern tooling. Features include user authentication, a real-time PostgreSQL database, RESTful API design, and a clean, accessible frontend.',
  ARRAY['React', 'Node.js', 'Express', 'PostgreSQL', 'Tailwind CSS'],
  'https://github.com/mayazad',
  null,
  '[{"label": "API response time", "value": "< 120ms"}, {"label": "Test coverage", "value": "85%"}]'::jsonb,
  true, 3
)
on conflict (slug) do nothing;
