import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "success";
type Size = "sm" | "md" | "lg";

interface Props extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: Variant;
  size?: Size;
  children?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary: "bg-gradient-brand text-primary-foreground shadow-brand hover:shadow-brand-strong",
  outline: "border border-border-strong text-brand bg-surface hover:bg-accent/50",
  ghost: "text-brand hover:bg-accent/50",
  success: "border border-success/45 text-success bg-success/10 hover:bg-success/20",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm rounded-xl",
  md: "px-6 py-3.5 text-base rounded-2xl",
  lg: "px-7 py-4 text-lg rounded-2xl",
};

export const GoldButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => (
    <motion.button
      ref={ref}
      disabled={disabled}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      whileHover={disabled ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className={cn(
        "no-tap sheen relative w-full font-display tracking-wide transition-[box-shadow,background,color,opacity] duration-300",
        "disabled:pointer-events-none disabled:opacity-45 disabled:shadow-none",
        SIZES[size],
        VARIANTS[variant],
        className,
      )}
      {...props}
    >
      <span className="relative z-[2] inline-flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  ),
);
GoldButton.displayName = "GoldButton";
