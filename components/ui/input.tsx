import * as React from "react";
import { cn } from "@/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-lg border border-[#1c2633] bg-[rgba(255,255,255,0.03)] px-3 text-sm text-[#e9edf1] placeholder:text-[#9aa4ae] shadow-inner shadow-black/20 transition focus-visible:border-[#f1f2f5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f1f2f5]/50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

