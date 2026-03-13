import type { Metadata } from 'next'
import { clashDisplay, satoshi, jetbrainsMono } from './fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flowkart — AI Native Agency',
  description:
    'Custom multi-agent orchestration with LangChain & LangGraph. We build AI teams that run your business.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
