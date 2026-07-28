import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ScreenHeader({
  title,
  subtitle,
  action,
  align = "center",
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  align?: "center" | "start";
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-6 flex items-start gap-3",
        align === "center" ? "flex-col items-center text-center" : "justify-between",
      )}
    >
      <div className={align === "center" ? "" : "text-right"}>
        <h1 className="text-gradient-brand font-display text-[28px] leading-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        <span
          aria-hidden
          className={cn(
            "bg-gradient-brand mt-3 block h-[3px] w-14 rounded-full opacity-80",
            align === "center" && "mx-auto",
          )}
        />
      </div>
      {action}
    </motion.header>
  );
}
