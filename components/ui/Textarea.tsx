import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean
  helperText?: string
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error = false, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 resize-none',
            error
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-neutral-300 focus:ring-primary-500 focus:border-primary-500',
            className
          )}
          {...props}
        />
        {helperText && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-red-600' : 'text-neutral-500'
          )}>
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
