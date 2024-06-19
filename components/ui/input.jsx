import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, errors, ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/40 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
        className,
        { 'border-destructive ring-4 ring-destructive/30 focus-visible:ring-offset-0 focus-visible:ring-destructive/40': errors }
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
