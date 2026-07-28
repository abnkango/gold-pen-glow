import { motion } from "framer-motion";

/** كتل ضوئية متحركة خلف المحتوى — تعطي عمقًا للخلفية الفاتحة والداكنة. */
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <motion.span
        className="blob h-64 w-64 -top-16 -right-10"
        style={{ background: "oklch(0.79 0.145 68 / 0.55)" }}
        animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        className="blob h-72 w-72 -bottom-24 -left-16"
        style={{ background: "oklch(0.635 0.185 44 / 0.4)" }}
        animate={{ y: [0, -22, 0], x: [0, 14, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
