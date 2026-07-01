import * as React from 'react';
import { cn } from '@/lib/utils';

export const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'secondary' }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-muted text-muted-foreground',
  };
  return (
    <div
      ref={ref}
      className={cn('inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium', variantClasses[variant], className)}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';
