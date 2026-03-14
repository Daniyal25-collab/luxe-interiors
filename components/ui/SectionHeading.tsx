import { clsx } from 'clsx';

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  className,
}: SectionHeadingProps) {
  return (
    <div className={clsx(
      align === 'center' && 'text-center',
      align === 'right' && 'text-right',
      className
    )}>
      {eyebrow && (
        <p className={clsx(
          'font-accent text-xs tracking-widest-3 uppercase mb-3',
          light ? 'text-gold-400' : 'text-gold-500'
        )}>
          {eyebrow}
        </p>
      )}
      <h2 className={clsx(
        'font-display text-5xl lg:text-6xl font-light leading-none',
        light ? 'text-ivory-100' : 'text-charcoal-900'
      )}>
        {title}
      </h2>
      {subtitle && (
        <p className={clsx(
          'font-body text-sm leading-relaxed mt-4 max-w-lg',
          align === 'center' && 'mx-auto',
          light ? 'text-mink-300' : 'text-charcoal-600'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
