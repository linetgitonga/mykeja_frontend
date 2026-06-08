import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const cardVariants = cva(
  'rounded-md transition-all duration-300 ease-smooth',
  {
    variants: {
      variant: {
        glass: 'bg-surface-glass backdrop-blur-[20px] border border-border-glass shadow-sm hover:shadow-md',
        elevated: 'bg-white shadow-md hover:shadow-lg dark:bg-surface-white',
        flat: 'bg-surface-primary dark:bg-surface-primary',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
      interactive: {
        true: 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'glass',
      padding: 'md',
      interactive: false,
    },
  }
);

interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  asChild?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, interactive, className }))}
      {...props}
    />
  )
);

Card.displayName = 'Card';

export { Card, cardVariants };
