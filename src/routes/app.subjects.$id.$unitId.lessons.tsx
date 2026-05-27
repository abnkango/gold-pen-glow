import { createFileRoute } from "@tanstack/react-router";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { Play, Download, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/subjects/$id/$unitId/lessons")({
  component: Lessons,
});

const LESSONS = [
  { n: 1, title: "مدخل إلى الوحدة" },
  { n: 2, title: "المفاهيم الأساسية" },
  { n: 3, title: "أمثلة محلولة" },
  { n: 4, title: "تطبيقات متقدمة" },
  { n: 5, title: "مراجعة شاملة" },
];

function Lessons() {
  return (
    <ScreenTransition>
      <div className="px-5 pt-10 max-w-md mx-auto">
        <ScreenHeader title="الدروس" subtitle="اختر درسًا" />
        <div className="space-y-3">
          {LESSONS.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass metallic-border rounded-3xl p-4"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-display text-silver text-sm">{l.title}</p>
                <span className="font-display text-gold text-sm">الدرس {l.n}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Action icon={<Play className="w-4 h-4" />} label="مشاهدة" color="gold" />
                <Action icon={<Download className="w-4 h-4" />} label="تحميل" color="blue" />
                <Action icon={<HelpCircle className="w-4 h-4" />} label="اختبار" color="green" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScreenTransition>
  );
}

function Action({ icon, label, color }: { icon: React.ReactNode; label: string; color: "gold" | "blue" | "green" }) {
  const styles = {
    gold: "border-[rgba(232,201,122,0.5)] text-gold bg-[rgba(232,201,122,0.06)]",
    blue: "border-sky-400/40 text-sky-300 bg-sky-400/5",
    green: "border-emerald-500/40 text-emerald-300 bg-emerald-500/5",
  }[color];
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`no-tap flex items-center justify-center gap-1.5 rounded-2xl py-2 text-sm border ${styles}`}
    >
      {icon}
      <span className="font-display">{label}</span>
    </motion.button>
  );
}
