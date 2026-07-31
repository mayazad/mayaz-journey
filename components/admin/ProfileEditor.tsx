'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createClient } from '@/lib/supabase/client'
import ImageUploader from '@/components/admin/ImageUploader'
import { CheckCircle } from 'lucide-react'
import type { Profile } from '@/types'
import { z } from 'zod'

const profileSchema = z.object({
  full_name: z.string().min(2, 'Required'),
  tagline: z.string().min(5, 'Required'),
  bio_short: z.string().min(10, 'Required'),
  bio_long: z.string().min(20, 'Required'),
  email: z.string().email(),
  phone: z.string().optional(),
  location: z.string().optional(),
})
type ProfileFormData = z.infer<typeof profileSchema>

export default function ProfileEditor({ profile }: { profile: Profile }) {
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [photoUrl, setPhotoUrl] = useState(profile.profile_photo_url || '')
  const [resumeUrl, setResumeUrl] = useState(profile.resume_url || '')
  const supabase = createClient()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      full_name: profile.full_name,
      tagline: profile.tagline,
      bio_short: profile.bio_short,
      bio_long: profile.bio_long,
      email: profile.email,
      phone: profile.phone || '',
      location: profile.location || '',
    },
  })

  async function onSubmit(data: ProfileFormData) {
    setError('')
    const { error: err } = await supabase
      .from('profile')
      .update({ ...data, profile_photo_url: photoUrl || null, resume_url: resumeUrl || null, updated_at: new Date().toISOString() })
      .eq('id', profile.id)
    if (err) { setError(err.message); return }
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const inputCls = 'w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors text-sm'
  const labelCls = 'block text-sm font-medium text-slate-300 mb-1.5'

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="full_name" className={labelCls}>Full Name</label>
          <input id="full_name" {...register('full_name')} className={inputCls} />
          {errors.full_name && <p className="mt-1 text-xs text-red-400">{errors.full_name.message}</p>}
        </div>
        <div>
          <label htmlFor="tagline" className={labelCls}>Tagline</label>
          <input id="tagline" {...register('tagline')} className={inputCls} />
          {errors.tagline && <p className="mt-1 text-xs text-red-400">{errors.tagline.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="bio_short" className={labelCls}>Short Bio (Hero)</label>
        <textarea id="bio_short" {...register('bio_short')} rows={2} className={inputCls + ' resize-none'} />
        {errors.bio_short && <p className="mt-1 text-xs text-red-400">{errors.bio_short.message}</p>}
      </div>

      <div>
        <label htmlFor="bio_long" className={labelCls}>Full Bio (About page)</label>
        <textarea id="bio_long" {...register('bio_long')} rows={8} className={inputCls + ' resize-y'} />
        {errors.bio_long && <p className="mt-1 text-xs text-red-400">{errors.bio_long.message}</p>}
      </div>

      <div className="grid sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="email" className={labelCls}>Email</label>
          <input id="email" type="email" {...register('email')} className={inputCls} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>Phone</label>
          <input id="phone" {...register('phone')} className={inputCls} placeholder="Optional" />
        </div>
        <div>
          <label htmlFor="location" className={labelCls}>Location</label>
          <input id="location" {...register('location')} className={inputCls} placeholder="City, Country" />
        </div>
      </div>

      {/* Photo & Resume uploads */}
      <div className="grid sm:grid-cols-2 gap-6 pt-2">
        <ImageUploader
          bucket="profile-photos"
          currentUrl={photoUrl}
          onUpload={setPhotoUrl}
          label="Profile Photo"
          accept="image/*"
        />
        <ImageUploader
          bucket="resumes"
          currentUrl={resumeUrl}
          onUpload={setResumeUrl}
          label="Resume PDF"
          accept="application/pdf"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60 text-white font-medium transition-all hover:shadow-lg hover:shadow-indigo-500/25 min-h-[44px]"
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-emerald-400 text-sm">
            <CheckCircle size={16} /> Saved!
          </span>
        )}
      </div>
    </form>
  )
}
