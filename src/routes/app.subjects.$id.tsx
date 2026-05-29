import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { GoldButton } from "@/components/GoldButton";
import { motion } from "framer-motion";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/app/subjects/$id")({
  component: Units,
});

function Units() {
  const { id } = useParams({ from: "/app/subjects/$id" });
  const { content } = useAppState();
  const subject = content.subjects.find((s) => s.id === id);
  const UNITS = content.units
    .filter((u) => u.subjectId === id)
    .sort((a, b) => a.order - b.order)
    .map((u) => ({ id: u.id, title: u.name }));
  return (
    <ScreenTransition>
      <div className="px-5 pt-10 max-w-md mx-auto">
        <ScreenHeader title={subject?.name ?? "المادة"} subtitle="اختر وحدة" />
        <div className="space-y-4">
          {UNITS.map((u, i) => (
            <motion.div
              key={u.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="glass metallic-border rounded-3xl p-5"
            >
              <p className="font-display text-gold text-center text-lg">{u.title}</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link to="/app/subjects/$id/$unitId/lessons" params={{ id, unitId: u.id }}>
                  <GoldButton variant="outline" className="text-sm py-2.5">مشاهدة الدروس</GoldButton>
                </Link>
                <Link to="/app/subjects/$id/$unitId/quiz" params={{ id, unitId: u.id }}>
                  <motion.button
                    whileTap={{ scale: 0.96 }} whileHover={{ scale: 1.02 }}
                    className="no-tap w-full rounded-2xl py-2.5 font-display text-sm border border-emerald-500/50 text-emerald-300 bg-emerald-500/5 hover:bg-emerald-500/10 transition"
                  >
                    اختبار الوحدة
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ScreenTransition>
  );
}
