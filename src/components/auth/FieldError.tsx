import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function FieldError({ message }: { message?: string | null }) {
  return (
    <AnimatePresence initial={false} mode="wait">
      {message ? (
        <motion.p
          key={message}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="text-destructive mt-1.5 flex items-center gap-1.5 overflow-hidden pr-1 text-[11px]"
        >
          <AlertCircle className="h-3 w-3 shrink-0" />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}
