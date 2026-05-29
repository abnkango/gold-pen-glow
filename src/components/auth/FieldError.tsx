import { AnimatePresence, motion } from "framer-motion";

export function FieldError({ message }: { message?: string | null }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {message ? (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden text-[11px] text-gold/85 mt-1.5 pr-1"
        >
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
