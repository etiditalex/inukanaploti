import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean
  helperText?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error = false, helperText, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 border rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0',
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
Input.displayName = 'Input'

export { Input }
