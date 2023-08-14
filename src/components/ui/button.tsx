import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

const buttonVariants = cva(
  "relative inline-flex cursor-pointer items-center justify-center rounded-lg",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        primary:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
      disabled: {
        true: "pointer-events-none opacity-70",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">,
    VariantProps<typeof buttonVariants> {
  label: string;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      type,
      loading = false,
      disabled,
      label,
      variant,
      size,
      ...props
    },
    ref
  ) => (
    <button
      type={type}
      disabled={!!disabled || loading}
      className={cn(buttonVariants({ variant, size, disabled, className }), {
        "text-transparent cursor-not-allowed": loading,
      })}
      ref={ref}
      {...props}
    >
      {loading && (
        <div className="center">
          <Icon className="spinner_P7sC" height="20" width="20" icon="loader" />
        </div>
      )}
      {label}
    </button>
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
