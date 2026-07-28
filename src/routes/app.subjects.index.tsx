import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";
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
      <div className="mx-auto max-w-md px-5 pt-6">
        <ScreenHeader title="المواد" subtitle="اختر مادة لبدء الدراسة" />

        {subjects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {subjects.map((s, i) => {
              const units = content.units.filter((u) => u.subjectId === s.id).length;
              return (
                <Link key={s.id} to="/app/subjects/$id" params={{ id: s.id }}>
                  <motion.div
                    whileTap={{ scale: 0.97 }}
                    whileHover={{ y: -4 }}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: i * 0.05,
                      type: "spring",
                      stiffness: 380,
                      damping: 26,
                    }}
                    className="surface hairline flex aspect-square flex-col justify-between rounded-[26px] p-4 transition-shadow duration-300 hover:shadow-elevated"
                  >
                    <span className="bg-gradient-brand-soft grid h-12 w-12 place-items-center rounded-2xl text-2xl">
                      {s.icon}
                    </span>
                    <div>
                      <p className="font-display text-lg text-foreground">{s.name}</p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {units > 0 ? `${units} وحدة` : "قريبًا"}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </ScreenTransition>
  );
}

function EmptyState() {
  return (
    <div className="surface hairline mt-6 flex flex-col items-center rounded-[26px] p-10 text-center">
      <BookOpen className="mb-3 h-12 w-12 text-muted-foreground" strokeWidth={1.2} />
      <p className="font-display text-foreground">لا توجد مواد بعد</p>
      <p className="mt-1 text-xs text-muted-foreground">سيقوم الآدمن بإضافتها قريبًا.</p>
    </div>
  );
}
