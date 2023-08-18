import './globals.css'
import { Roboto } from 'next/font/google'

const font = Roboto({ subsets: ['latin'], weight: "300" })

export const metadata = {
  title: 'Chat App',
  description: 'Social Media Messaging App created with web sockets',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  )
}
