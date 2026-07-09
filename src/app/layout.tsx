import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { PERSONAL, SITE_META } from '@/lib/data'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_META.url),
  title: SITE_META.title,
  description: SITE_META.description,
  keywords: SITE_META.keywords,
  authors: [{ name: PERSONAL.name }],
  openGraph: {
    title: SITE_META.title,
    description: SITE_META.description,
    type: 'website',
    url: SITE_META.url,
    images: [{ url: '/assets/face-forward.png', width: 800, height: 800 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_META.title,
    description: SITE_META.twitterDescription,
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
