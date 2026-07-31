import { z } from 'zod'

export const achievementSchema = z.object({
  label: z.string().min(1, 'Label is required'),
  value: z.string().min(1, 'Value is required'),
})

export const projectSchema = z.object({
  title: z.string().min(2, 'Title is required').max(200),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase letters, numbers, and hyphens only'),
  short_description: z
    .string()
    .min(10, 'Short description required')
    .max(300, 'Keep it under 300 characters'),
  long_description: z.string().optional(),
  tech_stack: z.array(z.string()).min(1, 'Add at least one technology'),
  github_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  live_url: z.string().url('Must be a valid URL').optional().or(z.literal('')),
  achievements: z.array(achievementSchema),
  is_featured: z.boolean(),
  display_order: z.number().int().min(0),
})

export type ProjectFormData = z.infer<typeof projectSchema>
