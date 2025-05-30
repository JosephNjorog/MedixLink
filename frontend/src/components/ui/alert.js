import * as React from "react"
import { AlertTriangle, Info } from "lucide-react"

const Alert = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-background text-foreground",
    destructive: "border-destructive/50 text-destructive dark:border-destructive bg-destructive/10",
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={`relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={`mb-1 font-medium leading-none tracking-tight ${className}`}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }