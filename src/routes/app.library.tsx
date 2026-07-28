import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Download } from "lucide-react";
import { useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";

export const Route = createFileRoute("/app/library")({
  component: Library,
});

const NOTES = [
  { id: "n1", subject: "نوطة أستاذ الرياضيات", icon: "📐", size: "4.2 MB" },
  { id: "n2", subject: "نوطة أستاذ الفيزياء", icon: "⚛️", size: "3.1 MB" },
  { id: "n3", subject: "نوطة أستاذ الكيمياء", icon: "🧪", size: "2.8 MB" },
  { id: "n4", subject: "نوطة أستاذ اللغة العربية", icon: "📖", size: "5.6 MB" },
];

const TABS = [
  { id: "books", label: "الكتب" },
  { id: "notes", label: "نوط الأساتذة" },
] as const;

function Library() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("notes");

  return (
    <ScreenTransition>
      <div className="mx-auto max-w-md px-5 pt-6">
        <ScreenHeader title="المكتبة" subtitle="كتبك ونوطك في مكان واحد" />

        <div className="surface hairline mb-6 flex items-center rounded-2xl p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className="no-tap relative z-10 flex-1 py-2 font-display text-sm"
            >
              {tab === t.id && (
                <motion.span
                  layoutId="libTab"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  className="bg-gradient-brand shadow-brand absolute inset-0 rounded-xl"
                />
              )}
              <span
                className={`relative ${
                  tab === t.id ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {t.label}
              </span>
            </button>
          ))}
        </div>

        {tab === "books" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="surface hairline flex flex-col items-center rounded-[26px] p-10 text-center"
          >
            <BookOpen className="mb-4 h-14 w-14 text-muted-foreground" strokeWidth={1.2} />
            <p className="font-display text-foreground">لا توجد كتب متوفرة حالياً</p>
            <p className="mt-1 text-xs text-muted-foreground">سيتم رفع الكتب الرسمية قريبًا.</p>
          </motion.div>
        ) : (
          <div className="space-y-3">
            {NOTES.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="surface hairline lift flex items-center gap-4 rounded-[26px] p-4"
              >
                <span className="bg-gradient-brand-soft grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-2xl">
                  {n.icon}
                </span>
                <div className="flex-1 text-right">
                  <p className="font-display text-foreground">{n.subject}</p>
                  <p className="text-xs text-muted-foreground">ملخصات ودروس · PDF {n.size}</p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.92 }}
                  aria-label={`تحميل ${n.subject}`}
                  className="bg-gradient-brand shadow-brand grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                >
                  <Download className="h-5 w-5 text-primary-foreground" />
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ScreenTransition>
  );
}
