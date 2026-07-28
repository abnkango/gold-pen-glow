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
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "no-tap surface hairline w-full rounded-3xl p-4 text-right transition-shadow duration-300 hover:shadow-elevated",
        glow && "shadow-brand",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  ),
);
PressableCard.displayName = "PressableCard";
