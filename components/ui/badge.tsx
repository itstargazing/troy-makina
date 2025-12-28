import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "success" | "warning";
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const styles = {
      default: "bg-[rgba(255,255,255,0.08)] text-[#d6dae2] border border-[rgba(255,255,255,0.2)]",
      outline: "border border-[#262c35] text-[#e9edf1]",
      success: "bg-[rgba(255,255,255,0.08)] text-[#d6dae2] border border-[rgba(255,255,255,0.2)]",
      warning: "bg-[rgba(255,255,255,0.08)] text-[#d6dae2] border border-[rgba(255,255,255,0.2)]",
    } as const;

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
          styles[variant],
          className,
        )}
        {...props}
      />
    );
  },
);
Badge.displayName = "Badge";

