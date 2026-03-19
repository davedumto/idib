import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Cursor from '@/components/common/Cursor'
import GsapProvider from '@/components/GsapProvider'

export const metadata: Metadata = {
  title: 'IDIB Photography',
  description: 'Professional photography services — weddings, portraits, and commercial photography.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 font-sans">
        <GsapProvider />
        <Cursor />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
