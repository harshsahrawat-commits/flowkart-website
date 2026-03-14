'use client'

import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'How It Works', href: '#process' },
  { label: 'About', href: '#about' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close on Escape + focus trap when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        return
      }

      // Focus trap: keep Tab cycling within the mobile overlay
      if (e.key === 'Tab') {
        const overlay = document.querySelector('[role="dialog"]')
        if (!overlay) return
        const focusable = overlay.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])',
        )
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-md border-b border-tan'
            : 'bg-transparent'
        }`}
      >
        <nav aria-label="Main navigation" className="max-w-7xl mx-auto px-6 h-[4.5rem] flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-semibold text-xl text-navy tracking-[0.04em]"
          >
            FLOWKART
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-body font-medium text-base text-navy hover:text-teal link-underline transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://cal.com/harshsahrawat/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-orange text-white font-body font-bold text-base rounded-lg hover:bg-orange/90 transition-colors duration-300"
            >
              Book a Call
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-8 h-8 flex items-center justify-center"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`absolute h-0.5 w-5 bg-navy transition-all duration-300 ${
                mobileOpen ? 'rotate-45' : '-translate-y-1.5'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-navy transition-all duration-300 ${
                mobileOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute h-0.5 w-5 bg-navy transition-all duration-300 ${
                mobileOpen ? '-rotate-45' : 'translate-y-1.5'
              }`}
            />
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-cream flex flex-col items-center justify-center gap-8"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-display text-3xl font-semibold text-navy hover:text-teal transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://cal.com/harshsahrawat/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 px-8 py-3 bg-orange text-white font-body font-bold text-base rounded-lg"
            onClick={() => setMobileOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </>
  )
}
