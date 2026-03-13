import type { Metadata } from 'next'
import { clashDisplay, satoshi, jetbrainsMono } from './fonts'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { Header } from '@/components/layout/Header'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flowkart — AI Native Agency | Custom Multi-Agent Teams',
  description:
    'Flowkart builds custom multi-agent AI teams using LangChain & LangGraph. Six specialized agents — Research, Marketing, Finance, Outreach, Development, Copywriting — working as one team for your business.',
  keywords: [
    'AI agency',
    'multi-agent systems',
    'LangChain',
    'LangGraph',
    'AI automation',
    'custom AI teams',
  ],
  authors: [{ name: 'Flowkart' }],
  openGraph: {
    title: 'Flowkart — AI Native Agency',
    description:
      'Custom multi-agent orchestration with LangChain & LangGraph. We build AI teams that run your business.',
    url: 'https://flowkart.ai',
    siteName: 'Flowkart',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flowkart — AI Native Agency',
    description:
      'Custom multi-agent orchestration with LangChain & LangGraph.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Flowkart',
        url: 'https://flowkart.ai',
        description:
          'AI Native Agency building custom multi-agent teams using LangChain & LangGraph.',
        email: 'hello@flowkart.ai',
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        name: 'Flowkart',
        url: 'https://flowkart.ai',
      },
    ],
  }

  return (
    <html
      lang="en"
      className={`${clashDisplay.variable} ${satoshi.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <LenisProvider>
          <Header />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
