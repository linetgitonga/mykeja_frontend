import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold',
  {
    variants: {
      variant: {
        default: 'bg-surface-primary text-brand-primary',
        success: 'bg-green-100 text-state-success dark:bg-green-900 dark:text-green-200',
        warning: 'bg-yellow-100 text-state-warning dark:bg-yellow-900 dark:text-yellow-200',
        error: 'bg-red-100 text-state-error dark:bg-red-900 dark:text-red-200',
        info: 'bg-brand-primary text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
