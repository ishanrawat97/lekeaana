import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Lekeaana — Get anything from anywhere',
  description: 'Connect with travelers to get US, Korea, Japan products delivered to India without crazy markup.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
