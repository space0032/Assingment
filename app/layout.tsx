import type { Metadata } from 'next'
import './globals.css'



export const metadata: Metadata = {
  title: 'Learn Dashboard',
  description: 'Next-generation learning platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`font-body bg-bg-base text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
