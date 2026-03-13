type CardProps = {
  icon: string
  title: string
  description: string
  className?: string
}

const ICONS: Record<string, string> = {
  search: '🔍',
  megaphone: '📢',
  chart: '📊',
  send: '📨',
  code: '💻',
  pen: '✍️',
}

export function Card({ icon, title, description, className = '' }: CardProps) {
  return (
    <div
      className={`group p-6 bg-cream rounded-xl border border-tan hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      <div className="w-12 h-12 rounded-lg bg-teal/10 flex items-center justify-center mb-4 text-xl group-hover:bg-teal/20 transition-colors duration-300">
        {ICONS[icon] || '⚡'}
      </div>
      <h3
        className="font-display font-medium text-navy mb-2"
        style={{
          fontSize: 'clamp(1.25rem, 0.9rem + 1.2vw, 2rem)',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
      <p className="font-body text-sienna text-sm leading-relaxed">
        {description}
      </p>
    </div>
  )
}
