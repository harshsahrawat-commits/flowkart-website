const FOOTER_LINKS = {
  agents: [
    'Research Agent',
    'Marketing Agent',
    'Finance Agent',
    'Outreach Agent',
    'Dev Agent',
    'Copywriting Agent',
  ],
  company: ['About', 'How It Works', 'Contact'],
}

export function Footer() {
  return (
    <footer className="bg-navy text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <span className="font-display font-semibold text-lg tracking-[0.04em]">
              FLOWKART
            </span>
            <p className="mt-3 text-tan text-sm leading-relaxed">
              AI Native Agency. Custom multi-agent teams that run your
              business.
            </p>
          </div>

          {/* Agents */}
          <div>
            <h4 className="font-body font-bold text-xs uppercase tracking-widest text-cream/50 mb-4">
              Agents
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.agents.map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-tan text-sm hover:text-cream transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body font-bold text-xs uppercase tracking-widest text-cream/50 mb-4">
              Company
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.company.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-tan text-sm hover:text-cream transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-bold text-xs uppercase tracking-widest text-cream/50 mb-4">
              Get in Touch
            </h4>
            <a
              href="mailto:hello@flowkart.ai"
              className="text-tan text-sm hover:text-cream transition-colors duration-300"
            >
              hello@flowkart.ai
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Flowkart. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-cream/40 text-xs hover:text-cream/60 transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-cream/40 text-xs hover:text-cream/60 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
