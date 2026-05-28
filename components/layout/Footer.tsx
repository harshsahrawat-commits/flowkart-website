// [TODO] Replace with TaskOrbit's real footer navigation once positioning is finalized.
const FOOTER_LINKS = {
  offerings: [
    '[TODO: link 1]',
    '[TODO: link 2]',
    '[TODO: link 3]',
    '[TODO: link 4]',
    '[TODO: link 5]',
    '[TODO: link 6]',
  ],
  company: ['[TODO: link 1]', '[TODO: link 2]', '[TODO: link 3]'],
}

export function Footer() {
  return (
    <footer aria-label="Site footer" className="bg-navy text-cream">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <span className="font-display font-semibold text-lg tracking-[0.04em]">
              TASKORBIT
            </span>
            <p className="mt-3 text-tan text-sm leading-relaxed">
              [TODO: TaskOrbit tagline]
            </p>
          </div>

          {/* Offerings */}
          <div>
            <h4 className="font-body font-bold text-xs uppercase tracking-widest text-cream/50 mb-4">
              [TODO: column heading]
            </h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.offerings.map((item) => (
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
                    href="#"
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
            {/* [TODO] Email kept from previous site until TaskOrbit's domain/inbox is set up. */}
            <a
              href="mailto:hello@flowkart.ai"
              className="text-tan text-sm hover:text-cream transition-colors duration-300"
            >
              hello@flowkart.ai
            </a>
            {/* [TODO] Add TaskOrbit's real contact + social details once available. */}
            <ul className="mt-4 space-y-2 text-tan text-sm">
              <li>[TODO: phone number]</li>
              <li>[TODO: LinkedIn URL]</li>
              <li>[TODO: X / Twitter URL]</li>
              <li>[TODO: registered office address]</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} TaskOrbit Technologies Private
            Limited. All rights reserved.
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
