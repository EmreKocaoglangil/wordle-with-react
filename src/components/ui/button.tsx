import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Icon from "./Icon";

const buttonVariants = cva(
  "relative inline-flex cursor-pointer items-center justify-center rounded-md border-2 border-primary-foreground bg-primary-background text-primary-foreground dark:border-none dark:bg-darkGreen",
  {
    variants: {
      variant: {
        primary: "bg-green text-primary-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
      disabled: {
        true: "cursor-not-allowed opacity-70",
      },
    },
    defaultVariants: {
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
    { className, loading = false, disabled, label, variant, size, ...props },
    ref
  ) => (
    // eslint-disable-next-line react/button-has-type
    <button
      disabled={!!disabled || loading}
      className={cn(buttonVariants({ variant, size, disabled, className }), {
        "text-transparent border-primary-foreground cursor-not-allowed":
          loading,
      })}
      ref={ref}
      {...props}
    >
      {loading && (
        <div className="center w-fit">
          <Icon
            className="spinner_P7sC fill-primary-foreground"
            height="20"
            width="20"
            icon="loader"
          />
        </div>
      )}
      {label}
    </button>
  )
);
Button.displayName = "Button";

export { Button, buttonVariants };
