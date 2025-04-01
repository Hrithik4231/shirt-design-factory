
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 active:translate-y-0",
        link: "text-primary underline-offset-4 hover:underline",
        "3d": "bg-gradient-to-b from-primary to-primary/90 text-primary-foreground shadow-[0_5px_0_0_rgb(0,0,0,0.1),0_6px_10px_-3px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgb(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-[0_0px_0_0_rgb(0,0,0,0.1)] border-b-2 border-primary/40 transition-all duration-150",
        "3d-yellow": "bg-gradient-to-b from-yellow-500 to-yellow-600 text-black shadow-[0_5px_0_0_rgb(0,0,0,0.1),0_6px_10px_-3px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgb(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-[0_0px_0_0_rgb(0,0,0,0.1)] border-b-2 border-yellow-700/30 transition-all duration-150",
        "3d-white": "bg-gradient-to-b from-white to-gray-100 text-purple-900 shadow-[0_5px_0_0_rgb(0,0,0,0.1),0_6px_10px_-3px_rgba(0,0,0,0.2)] hover:shadow-[0_4px_0_0_rgb(0,0,0,0.1),0_4px_6px_-1px_rgba(0,0,0,0.2)] hover:-translate-y-1 active:translate-y-0 active:shadow-[0_0px_0_0_rgb(0,0,0,0.1)] border-b-2 border-gray-200 transition-all duration-150",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
