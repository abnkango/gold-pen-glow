import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { motion } from "framer-motion";
import { Download, BookOpen } from "lucide-react";

export const Route = createFileRoute("/app/library")({
  component: Library,
});

const NOTES = [
  { id: "n1", subject: "نوطة أستاذ الرياضيات", icon: "📐" },
  { id: "n2", subject: "نوطة أستاذ الفيزياء", icon: "⚛️" },
  { id: "n3", subject: "نوطة أستاذ الكيمياء", icon: "🧪" },
  { id: "n4", subject: "نوطة أستاذ اللغة العربية", icon: "📖" },
];

function Library() {
  const [tab, setTab] = useState<"books" | "notes">("notes");
  return (
    <ScreenTransition>
      <div className="px-5 pt-10 max-w-md mx-auto">
        <ScreenHeader title="المكتبة" />

        <div className="relative flex items-center bg-black/40 metallic-border rounded-full p-1 mb-6">
          {(["books", "notes"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="relative flex-1 py-2 text-sm font-display z-10"
            >
              {tab === t && (
                <motion.span
                  layoutId="libTab"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-gold rounded-full shadow-gold"
                />
              )}
              <span className={`relative ${tab === t ? "text-primary-foreground" : "text-silver-dim"}`}>
                {t === "books" ? "الكتب" : "نوط الأساتذة"}
              </span>
            </button>
          ))}
        </div>

        {tab === "books" ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="glass metallic-border rounded-3xl p-10 flex flex-col items-center text-center"
          >
            <BookOpen className="w-16 h-16 text-silver-dim mb-4" strokeWidth={1.2} />
            <p className="font-display text-silver">لا توجد كتب متوفرة حالياً</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {NOTES.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass metallic-border rounded-3xl p-4 flex items-center gap-4"
              >
                <span className="text-3xl">{n.icon}</span>
                <div className="flex-1 text-right">
                  <p className="font-display text-silver">{n.subject}</p>
                  <p className="text-silver-dim text-xs">ملخصات ودروس</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  className="w-11 h-11 rounded-2xl bg-gold flex items-center justify-center shadow-gold"
                >
                  <Download className="w-5 h-5 text-primary-foreground" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ScreenTransition>
  );
}
