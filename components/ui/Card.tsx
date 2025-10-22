import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, padding = 'md', ...props }, ref) => {
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
      xl: 'p-10',
    }

    return (
        <div
          ref={ref}
          className={cn(
            'bg-white rounded-2xl shadow-sm border border-neutral-200/50 touch-manipulation',
            hover && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary-200',
            paddingClasses[padding],
            className
          )}
          {...props}
        />
    )
  }
)
Card.displayName = 'Card'

export { Card }
