import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/subjects/")({
  component: Subjects,
});

export const SUBJECTS = [
  { id: "math", name: "الرياضيات", icon: "📐", progress: 62 },
  { id: "physics", name: "الفيزياء", icon: "⚛️", progress: 78 },
  { id: "chemistry", name: "الكيمياء", icon: "🧪", progress: 71 },
  { id: "arabic", name: "اللغة العربية", icon: "📖", progress: 88 },
];

function Subjects() {
  return (
    <ScreenTransition>
      <div className="px-5 pt-10">
        <ScreenHeader title="المواد" subtitle="اختر مادة لبدء الدراسة" />
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {SUBJECTS.map((s, i) => (
            <Link key={s.id} to="/app/subjects/$id" params={{ id: s.id }}>
              <motion.div
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 380, damping: 26 }}
                className="aspect-square glass metallic-border rounded-3xl p-4 flex flex-col justify-between hover:shadow-gold transition"
              >
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{s.icon}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full text-silver-dim border border-[rgba(176,184,193,0.25)]">
                    {s.progress}%
                  </span>
                </div>
                <div>
                  <p className="font-display text-gold text-lg">{s.name}</p>
                  <div className="mt-2 h-1 rounded-full bg-[rgba(232,201,122,0.12)] overflow-hidden">
                    <div className="h-full bg-gold" style={{ width: `${s.progress}%` }} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </ScreenTransition>
  );
}
