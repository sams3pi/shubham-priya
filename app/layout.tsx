import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Great_Vibes, Tiro_Devanagari_Hindi } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
})

const devanagari = Tiro_Devanagari_Hindi({
  subsets: ['devanagari', 'latin'],
  weight: '400',
  variable: '--font-devanagari',
})

export const metadata: Metadata = {
  title: 'Priya & Shubham — Wedding Invitation',
  description:
    'You are cordially invited to the wedding of Priya & Shubham on 28th January 2027 at Ranchi Haveli Banquet Hall, Ring Road, Kanke, Ranchi.',
  generator: 'v0.app',
  openGraph: {
    title: 'Priya & Shubham — Wedding Invitation',
    description: '28th January 2027 · 8 PM · Ranchi Haveli Banquet Hall, Ranchi',
    images: ['/images/couple.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#fbf9f5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${greatVibes.variable} ${devanagari.variable} bg-background`}>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
