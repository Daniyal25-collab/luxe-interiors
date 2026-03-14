import { forwardRef } from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  children: React.ReactNode;
}

const base =
  'inline-flex items-center justify-center gap-2 font-accent text-xs tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

const variants: Record<Variant, string> = {
  primary: 'bg-charcoal-900 text-ivory-50 hover:bg-charcoal-700',
  secondary: 'bg-ivory-50 text-charcoal-900 hover:bg-ivory-200',
  outline: 'border border-charcoal-900 text-charcoal-900 hover:bg-charcoal-900 hover:text-ivory-50',
  ghost: 'text-charcoal-700 hover:text-gold-500',
  gold: 'bg-gold-500 text-ivory-50 hover:bg-gold-400',
};

const sizes: Record<Size, string> = {
  sm: 'px-5 py-2.5',
  md: 'px-8 py-4',
  lg: 'px-10 py-5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={clsx(base, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 size={14} className="animate-spin" />}
      {children}
    </button>
  )
);

Button.displayName = 'Button';
export default Button;
