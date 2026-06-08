import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ... بقیه ایمپورت‌ها

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground",

        // --- واریانت دکمه رزومه (بدون بوردر سفید در هاور) ---
        cta: [
          "relative isolate overflow-hidden border-2 border-border bg-card px-10 py-4",
          "text-sm font-bold text-card-foreground shadow-4px",
          "rounded-4xl transition-all duration-700 ease-cubic",
          "before:content-[''] before:absolute before:inset-0 before:rounded-[inherit] before:bg-primary",
          "before:scale-[0.3] before:blur-[10px] before:opacity-0 before:-z-10",
          "before:transition-all before:duration-700 before:ease-cubic",
          "hover:border-border hover:text-white hover:before:scale-100 hover:before:blur-0 hover:before:opacity-100",
        ].join(" "),

        // --- واریانت لینک مهارت‌ها (بدون خط، تغییر رنگ به Primary در هاور) ---
        ctaLink: [
          "h-auto p-0 bg-transparent border-0 font-bold text-foreground",
          "transition-colors duration-300 ease-in-out",
          "hover:text-primary",
        ].join(" "),
      },
      size: {
        default: "h-8 gap-1.5 px-2.5",
        lg: "h-11 gap-2 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// ... بقیه کد کامپوننت

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
