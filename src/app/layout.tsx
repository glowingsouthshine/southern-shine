import type { Metadata } from 'next'
import './globals.css'
import Analytics from '@/components/Analytics'
import CallNow from '@/components/CallNow'

export const metadata: Metadata = {
  title: 'A Southern Glow | House & Office Cleaning',
  description: 'Trusted house & office cleaning in Oak Ridge, Knoxville, Sevierville and surrounding areas. Call 865-265-4105. Mon–Sat 9–5.',
  openGraph: {
    title: 'A Southern Glow',
    description: 'Trusted house & office cleaning in Oak Ridge, Knoxville, Sevierville and surrounding areas.',
    url: 'https://asouthernglow.com',
    siteName: 'A Southern Glow',
    locale: 'en_US',
    type: 'website',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body">
        {children}
        <CallNow />
        <Analytics />
      </body>
    </html>
  )
}
