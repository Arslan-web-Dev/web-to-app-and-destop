import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Universal Web to Native Admin Portal',
  description: 'Enterprise dashboard to manage users, billing, system health, and credit consumption.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
