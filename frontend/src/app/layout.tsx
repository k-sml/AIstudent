import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import NextAuthProvider from '../provider/NextAuth'



const inter = Inter({ subsets: ['latin'] })

// SEOやページの説明に影響を与えるところ
export const metadata: Metadata = {
  title: 'AI student',
  description: 'AI student App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
