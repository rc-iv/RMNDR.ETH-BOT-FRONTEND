import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from './context/client-provider'
import Navbar from './components/ui/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RMNDR.ETH BOTH',
  description: 'Your personal discord blockchain reminder bot.',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><NextAuthProvider><Navbar/>{children}</NextAuthProvider></body>
    </html>
  )
}
