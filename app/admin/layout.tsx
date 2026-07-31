import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'Admin Panel', template: '%s | Admin — Mayaz' },
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
