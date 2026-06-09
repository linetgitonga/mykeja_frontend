import React from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      label,
      error,
      helperText,
      icon,
      iconPosition = 'left',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-semibold text-foreground">
            {label}
            {props.required && <span className="ml-1 text-destructive">*</span>}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && iconPosition === 'left' && (
            <span className="absolute left-3 text-muted-foreground pointer-events-none">
              {icon}
            </span>
          )}

          <input
            type={type}
            className={cn(
              'flex h-11 w-full rounded-md border border-input bg-background px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground transition-all duration-150 ease-smooth',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-muted',
              icon && iconPosition === 'left' && 'pl-10',
              icon && iconPosition === 'right' && 'pr-10',
              error && 'border-destructive focus:ring-destructive',
              className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
          />

          {icon && iconPosition === 'right' && (
            <span className="absolute right-3 text-muted-foreground pointer-events-none">
              {icon}
            </span>
          )}
        </div>

        {error && (
          <p className="text-xs text-destructive">{error}</p>
        )}

        {helperText && !error && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
