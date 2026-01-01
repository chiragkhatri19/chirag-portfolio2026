import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] hover:-translate-y-0.5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5",
        outline: "border border-border bg-transparent text-foreground hover:bg-secondary hover:border-primary/50 hover:-translate-y-0.5",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:-translate-y-0.5",
        ghost: "hover:bg-secondary hover:text-foreground hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline",
        hero: "bg-primary text-primary-foreground font-semibold hover:bg-primary/90 hover:shadow-[0_8px_40px_hsl(var(--primary)/0.5)] hover:-translate-y-1 active:translate-y-0",
        heroOutline: "border-2 border-border bg-transparent text-foreground hover:bg-primary/10 hover:border-primary hover:shadow-[0_8px_30px_hsl(var(--primary)/0.25)] hover:-translate-y-1 active:translate-y-0",
        social: "bg-secondary/50 text-foreground border border-border hover:bg-primary/15 hover:border-primary hover:text-primary hover:shadow-[0_4px_20px_hsl(var(--primary)/0.2)] hover:-translate-y-1",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
