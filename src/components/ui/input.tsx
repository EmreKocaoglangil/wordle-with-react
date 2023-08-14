import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva("flex rounded-lg", {
  variants: {
    variant: {
      default: "hover:bg-white/90 border-2 border-black bg-white text-black",
      destructive: "hover:bg-white/90 border-red-500",
    },
    disabled: {
      true: "cursor-not-allowed opacity-70",
    },
    size: {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10",
    },
    error: {
      true: "border-red-500 focus:outline-red-500",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface InputProps
  extends Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "size" | "disabled"
    >,
    VariantProps<typeof inputVariants> {
  disabled?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { className, error, disabled = false, type, variant, size, ...props },
    ref
  ) => (
    <input
      disabled={disabled}
      className={cn(
        inputVariants({ variant, disabled, size, error, className })
      )}
      ref={ref}
      {...props}
      type={type}
    />
  )
);
Input.displayName = "Input";

export { Input };
