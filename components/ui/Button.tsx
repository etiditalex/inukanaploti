import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, children, ...props }, ref) => {
        const baseClasses = 'inline-flex items-center justify-center font-medium rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none touch-manipulation'
    
    const variantClasses = {
      primary: 'bg-primary-500 text-white hover:bg-primary-700 hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-primary-500 transition-all duration-200',
      secondary: 'bg-secondary-500 text-white hover:bg-secondary-700 hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-secondary-500 transition-all duration-200',
      outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-primary-500 transition-all duration-200',
      ghost: 'text-neutral-600 hover:text-primary-600 hover:bg-primary-50 focus:ring-primary-500 transition-all duration-200',
      success: 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-green-500 transition-all duration-200',
      danger: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-red-500 transition-all duration-200',
    }
    
    const sizeClasses = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-4 text-base',
      xl: 'px-10 py-5 text-lg',
    }

    const buttonClasses = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )

    if (asChild && children) {
      return (
        <div className={buttonClasses} ref={ref as any}>
          {children}
        </div>
      )
    }

    return (
      <button
        className={buttonClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
