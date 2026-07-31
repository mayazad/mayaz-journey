import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Md Adnan Hossain Mayaz — AI Engineer',
    template: '%s | Mayaz',
  },
  description:
    'Personal portfolio of Md Adnan Hossain Mayaz — an AI Engineer building intelligent models and data-driven solutions.',
  keywords: ['Mayaz', 'AI Engineer', 'Machine Learning', 'Deep Learning', 'Portfolio', 'Bangladesh'],
  authors: [{ name: 'Md Adnan Hossain Mayaz', url: 'https://github.com/mayazad' }],
  creator: 'Md Adnan Hossain Mayaz',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Md Adnan Hossain Mayaz — AI Engineer',
    description:
      'Personal portfolio of Md Adnan Hossain Mayaz — an AI Engineer building intelligent models and data-driven solutions.',
    siteName: 'Mayaz Portfolio',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Mayaz Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Md Adnan Hossain Mayaz — AI Engineer',
    description: 'Personal portfolio of Md Adnan Hossain Mayaz.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} overflow-x-hidden`}>
      <body className="font-inter antialiased bg-[#0a0a0f] text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
