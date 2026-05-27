import { createFileRoute, Link } from "@tanstack/react-router";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/teachers/")({
  component: Teachers,
});

export const TEACHERS = [
  { id: "t1", name: "أ. محمد الأحمد", subject: "الرياضيات", online: true },
  { id: "t2", name: "أ. سارة الخوري", subject: "الفيزياء", online: true },
  { id: "t3", name: "أ. ياسر العلي", subject: "الكيمياء", online: false },
  { id: "t4", name: "أ. ليلى الحسن", subject: "اللغة العربية", online: true },
  { id: "t5", name: "أ. عمر النجار", subject: "الإنجليزية", online: false },
];

function Teachers() {
  return (
    <ScreenTransition>
      <div className="px-5 pt-10 max-w-md mx-auto">
        <ScreenHeader title="الأساتذة" subtitle="تواصل مع أساتذتك مباشرة" />
        <div className="space-y-3">
          {TEACHERS.map((t, i) => (
            <Link key={t.id} to="/app/teachers/$id" params={{ id: t.id }}>
              <motion.div
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="glass metallic-border rounded-3xl p-4 flex items-center gap-4"
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center font-display text-primary-foreground text-lg">
                    {t.name.split(" ")[1]?.[0] ?? "أ"}
                  </div>
                  <span
                    className={`absolute -bottom-0.5 -left-0.5 w-3 h-3 rounded-full border-2 border-[#0A0A0A] ${
                      t.online ? "bg-emerald-400" : "bg-zinc-500"
                    }`}
                  />
                </div>
                <div className="flex-1 text-right">
                  <p className="font-display text-silver">{t.name}</p>
                  <p className="text-silver-dim text-xs">{t.subject}</p>
                </div>
                <span
                  className={`text-xs font-display ${
                    t.online ? "text-emerald-300" : "text-silver-dim"
                  }`}
                >
                  {t.online ? "متاح الآن" : "غير متصل"}
                </span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </ScreenTransition>
  );
}
