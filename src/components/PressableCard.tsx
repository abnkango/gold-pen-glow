import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface Props extends HTMLMotionProps<"button"> {
  glow?: boolean;
}

export const PressableCard = forwardRef<HTMLButtonElement, Props>(
  ({ className, glow, children, ...props }, ref) => (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={cn(
        "no-tap text-right w-full glass metallic-border rounded-2xl p-4 transition-shadow",
        glow && "shadow-gold",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  )
);
PressableCard.displayName = "PressableCard";
