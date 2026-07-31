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

-- Sample featured projects
insert into projects (
  title, slug, short_description, long_description, cover_image_url,
  tech_stack, github_url, live_url, is_featured, display_order
) values
(
  'GuildBoard',
  'guildboard',
  'RPG-Themed Multi-Tenant Task Management Platform.',
  'Transform your team into a guild. Complete quests. Earn XP. Rise through the ranks.\n\n### Features\n- **Guild System:** Create or join a guild using invite codes. Full multi-tenant data isolation.\n- **RPG Mechanics:** Earn experience and level up by completing real-world tasks.\n- **Role-Based Access:** Built with secure RLS policies in Supabase.',
  'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
  ARRAY['React 19', 'Supabase', 'Express.js', 'Node.js', 'Vercel'],
  'https://github.com/mayazad/guildboard-final',
  'https://guildboard-final.vercel.app',
  true, 1
),
(
  'FloatBook AI',
  'floatbook-ai',
  'A modern, transparent, always-on-top AI notebook for study assistance.',
  'FloatBook is a modern, transparent, always-on-top AI notebook designed for seamless study assistance and note-taking. \n\nIt features a unique "Floating Orb" interface that stays out of your way until you need it.\n\n### Architecture\nThis project uses a secure dual-process architecture:\n1. **The Brain (Proxy Server):** Runs an Express server to handle Google Gemini API calls securely.\n2. **The Body (Electron App):** The visual window that you interact with.\n\n### Features\n- AI Tutor (Gemini Flash)\n- Contextual Awareness\n- Markdown Support\n- Screen Capture',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop',
  ARRAY['Electron', 'Express', 'JavaScript', 'Google Gemini AI', 'Markdown'],
  'https://github.com/mayazad/floatBOOK',
  null,
  true, 2
),
(
  'Pomodoro Timer',
  'pomodoro-timer',
  'A beautiful Pomodoro timer built with Python and Tkinter.',
  'A productivity tracker built in Python. Designed to keep focus during long deep-learning training sessions or heavy coding blocks.\n\n### Features\n- Dark mode / Light mode toggle\n- Custom session names\n- Daily progress tracking via CSV data logging\n- Weekly productivity charts plotted with Matplotlib',
  'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=2076&auto=format&fit=crop',
  ARRAY['Python', 'Tkinter', 'Matplotlib', 'CSV'],
  'https://github.com/mayazad/pomodoro-python-ad',
  null,
  true, 3
)
on conflict (slug) do nothing;
