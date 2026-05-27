import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"button"> {
  variant?: "primary" | "outline";
}

export const GoldButton = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "primary", children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={cn(
        "no-tap relative w-full rounded-2xl px-6 py-3.5 font-display text-base tracking-wide transition-all",
        variant === "primary" &&
          "bg-gold text-primary-foreground shadow-gold-strong hover:brightness-110",
        variant === "outline" &&
          "bg-transparent border border-[rgba(232,201,122,0.6)] text-gold hover:bg-[rgba(232,201,122,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);
GoldButton.displayName = "GoldButton";
