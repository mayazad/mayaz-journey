export type Achievement = {
  label: string
  value: string
}

export type Profile = {
  id: string
  full_name: string
  tagline: string
  bio_short: string
  bio_long: string
  email: string
  phone: string | null
  location: string | null
  profile_photo_url: string | null
  resume_url: string | null
  github_url: string | null
  linkedin_url: string | null
  updated_at: string
}

export type Project = {
  id: string
  title: string
  slug: string
  short_description: string
  long_description: string | null
  cover_image_url: string | null
  gallery_image_urls: string[]
  tech_stack: string[]
  github_url: string | null
  live_url: string | null
  achievements: Achievement[]
  is_featured: boolean
  display_order: number
  created_at: string
  updated_at: string
}

export type SocialLink = {
  id: string
  platform: string
  url: string
  display_order: number
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  message: string
  is_read: boolean
  created_at: string
}
