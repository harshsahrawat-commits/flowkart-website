import type { Metadata } from 'next'
import { clashDisplay, satoshi, jetbrainsMono } from './fonts'
import { LenisProvider } from '@/components/layout/LenisProvider'
import { Header } from '@/components/layout/Header'
import './globals.css'

// [TODO] Replace placeholder taglines/descriptions with TaskOrbit's real
// positioning once finalized. Domain (flowkart.ai) kept until the new domain is set up.
export const metadata: Metadata = {
  title: 'TaskOrbit — [TODO: tagline]',
  description: '[TODO: meta description]',
  keywords: ['[TODO: keyword]'],
  authors: [{ name: 'TaskOrbit' }],
  openGraph: {
    title: 'TaskOrbit — [TODO: tagline]',
    description: '[TODO: Open Graph description]',
    url: 'https://flowkart.ai',
    siteName: 'TaskOrbit',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaskOrbit — [TODO: tagline]',
    description: '[TODO: Twitter description]',
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
        name: 'TaskOrbit',
        legalName: 'TaskOrbit Technologies Private Limited',
        url: 'https://flowkart.ai',
        description: '[TODO: organization description]',
        email: 'hello@flowkart.ai',
        sameAs: [],
      },
      {
        '@type': 'WebSite',
        name: 'TaskOrbit',
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
