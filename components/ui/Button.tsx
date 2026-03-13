import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'

type ButtonBaseProps = {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  className?: string
  children: React.ReactNode
}

type AsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: never
  }

type AsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string
  }

type ButtonProps = AsButton | AsLink

const variants: Record<Variant, string> = {
  primary: 'bg-orange text-white hover:bg-orange/90',
  secondary: 'bg-teal text-white hover:bg-teal/90',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-cream',
}

const sizes = {
  sm: 'px-4 py-2 text-xs',
  md: 'px-6 py-3 text-[0.9375rem]',
  lg: 'px-8 py-4 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center',
    'font-body font-bold rounded-lg',
    'transition-colors duration-300',
    variants[variant],
    sizes[size],
    className,
  ].join(' ')

  if ('href' in props && props.href) {
    const { href, ...rest } = props as AsLink
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as AsButton)}>
      {children}
    </button>
  )
}
