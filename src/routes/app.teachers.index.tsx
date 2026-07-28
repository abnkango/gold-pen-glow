import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MessageCircle, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";

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
  const [query, setQuery] = useState("");
  const list = useMemo(() => {
    const q = query.trim();
    if (!q) return TEACHERS;
    return TEACHERS.filter((t) => t.name.includes(q) || t.subject.includes(q));
  }, [query]);

  return (
    <ScreenTransition>
      <div className="mx-auto max-w-md px-5 pt-6">
        <ScreenHeader title="الأساتذة" subtitle="تواصل مع أساتذتك مباشرة" />

        <div className="bg-input focus-within:border-border-strong mb-5 flex items-center gap-2 rounded-2xl border border-border px-3 transition-colors">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث باسم الأستاذ أو المادة"
            aria-label="بحث عن أستاذ"
            className="w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
        </div>

        <div className="space-y-3">
          {list.map((t, i) => (
            <Link key={t.id} to="/app/teachers/$id" params={{ id: t.id }}>
              <motion.div
                whileTap={{ scale: 0.985 }}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="surface hairline flex items-center gap-4 rounded-[26px] p-4 transition-shadow duration-300 hover:shadow-elevated"
              >
                <div className="relative">
                  <div className="bg-gradient-brand shadow-brand grid h-12 w-12 place-items-center rounded-2xl font-display text-lg text-primary-foreground">
                    {t.name.split(" ")[1]?.[0] ?? "أ"}
                  </div>
                  <span
                    className={`border-background absolute -bottom-0.5 -left-0.5 h-3.5 w-3.5 rounded-full border-2 ${
                      t.online ? "bg-success" : "bg-muted-foreground/60"
                    }`}
                  />
                </div>

                <div className="flex-1 text-right">
                  <p className="font-display text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.subject}</p>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <MessageCircle className="text-brand h-4 w-4" />
                  <span
                    className={`font-display text-[10px] ${
                      t.online ? "text-success" : "text-muted-foreground"
                    }`}
                  >
                    {t.online ? "متاح الآن" : "غير متصل"}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}

          {list.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">لا نتائج مطابقة</p>
          )}
        </div>
      </div>
    </ScreenTransition>
  );
}
