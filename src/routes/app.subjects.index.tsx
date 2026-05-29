import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { motion } from "framer-motion";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/app/subjects/")({
  component: Subjects,
});

function Subjects() {
  const { content, branch } = useAppState();
  // المواد الخاصة بفرع الطالب فقط — مصدر واحد مع لوحة الآدمن
  const subjects = content.subjects
    .filter((s) => s.visible && (!branch || s.branch === branch))
    .sort((a, b) => a.order - b.order);

  return (
    <ScreenTransition>
      <div className="px-5 pt-10">
        <ScreenHeader title="المواد" subtitle="اختر مادة لبدء الدراسة" />

        {subjects.length === 0 ? (
          <p className="text-center text-silver-dim text-sm mt-10">
            لا توجد مواد بعد. سيقوم الآدمن بإضافتها قريبًا.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {subjects.map((s, i) => (
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
                  </div>
                  <div>
                    <p className="font-display text-gold text-lg">{s.name}</p>
                    <div className="mt-2 h-1 rounded-full bg-[rgba(232,201,122,0.12)] overflow-hidden">
                      <div className="h-full bg-gold" style={{ width: "0%" }} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ScreenTransition>
  );
}
