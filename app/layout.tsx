import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NextAuthProvider from './context/client-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RMNDR.ETH BOTH',
  description: 'Your personal discord blockchain reminder bot.',
}

export default function RootLayout({
  children,
  session
}: {
  children: React.ReactNode,
  session: any
}) {
  return (
    <html lang="en">
      <body className={inter.className}><NextAuthProvider>{children}</NextAuthProvider></body>
    </html>
  )
}
