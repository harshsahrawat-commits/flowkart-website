import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google'

// Priority 1: Preload — hero headline font (above fold)
// font-display: block — brief invisible period acceptable for hero
export const clashDisplay = localFont({
  src: './fonts/ClashDisplay-Variable.woff2',
  variable: '--font-clash-display',
  display: 'block',
  weight: '200 700',
})

// Priority 2: Swap — body text (appears everywhere)
// font-display: swap — content readable immediately with fallback
export const satoshi = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap',
  weight: '300 900',
})

// Priority 3: Optional — accent mono font (non-critical)
// font-display: optional — use only if already cached
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'optional',
})
