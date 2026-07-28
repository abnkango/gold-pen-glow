import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Download, HelpCircle, Play } from "lucide-react";
import type { ReactNode } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";

export const Route = createFileRoute("/app/subjects/$id/$unitId/lessons")({
  component: Lessons,
});

const LESSONS = [
  { n: 1, title: "مدخل إلى الوحدة", minutes: 12 },
  { n: 2, title: "المفاهيم الأساسية", minutes: 18 },
  { n: 3, title: "أمثلة محلولة", minutes: 24 },
  { n: 4, title: "تطبيقات متقدمة", minutes: 21 },
  { n: 5, title: "مراجعة شاملة", minutes: 15 },
];

function Lessons() {
  const { id } = useParams({ from: "/app/subjects/$id/$unitId/lessons" });

  return (
    <ScreenTransition>
      <div className="mx-auto max-w-md px-5 pt-6">
        <ScreenHeader
          align="start"
          title="الدروس"
          subtitle="اختر درسًا للمشاهدة"
          action={
            <Link
              to="/app/subjects/$id"
              params={{ id }}
              aria-label="رجوع إلى الوحدات"
              className="surface hairline grid h-10 w-10 place-items-center rounded-2xl"
            >
              <ArrowRight className="text-brand h-4 w-4" />
            </Link>
          }
        />

        <div className="space-y-3">
          {LESSONS.map((l, i) => (
            <motion.article
              key={l.n}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="surface hairline rounded-[26px] p-4"
            >
              <div className="mb-3 flex items-center gap-3">
                <span className="bg-gradient-brand-soft text-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl font-display text-sm">
                  {l.n}
                </span>
                <div className="flex-1">
                  <p className="font-display text-sm text-foreground">{l.title}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {l.minutes} دقيقة
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <Action icon={<Play className="h-4 w-4" />} label="مشاهدة" tone="brand" />
                <Action icon={<Download className="h-4 w-4" />} label="تحميل" tone="info" />
                <Action icon={<HelpCircle className="h-4 w-4" />} label="اختبار" tone="success" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </ScreenTransition>
  );
}

const TONES = {
  brand: "border-border-strong text-brand bg-accent/40",
  info: "border-info/35 text-info bg-info/10",
  success: "border-success/35 text-success bg-success/10",
} as const;

function Action({
  icon,
  label,
  tone,
}: {
  icon: ReactNode;
  label: string;
  tone: keyof typeof TONES;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`no-tap flex items-center justify-center gap-1.5 rounded-2xl border py-2 text-sm transition-colors ${TONES[tone]}`}
    >
      {icon}
      <span className="font-display">{label}</span>
    </motion.button>
  );
}
