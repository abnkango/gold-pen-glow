import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarCheck, Flame, PlayCircle, Target } from "lucide-react";
import { ScreenTransition } from "@/components/ScreenTransition";
import { BRANCHES, useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/app/home")({
  component: Home,
});

const STREAK_DAYS = 12;
const WEAK = { name: "الرياضيات", pct: 62 };
const GRADES = [
  { name: "الفيزياء", grade: 88 },
  { name: "الكيمياء", grade: 81 },
  { name: "اللغة العربية", grade: 92 },
  { name: "اللغة الإنجليزية", grade: 74 },
];
const WEEK = ["س", "ح", "ن", "ث", "ر", "خ", "ج"];
const DONE = [true, true, true, true, false, true, false];

function Ring({ pct }: { pct: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="h-28 w-28" role="img" aria-label={`${pct}%`}>
      <defs>
        <linearGradient id="ringGrad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.83 0.14 72)" />
          <stop offset="100%" stopColor="oklch(0.66 0.19 45)" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={r} stroke="var(--muted)" strokeWidth="9" fill="none" />
      <motion.circle
        cx="50"
        cy="50"
        r={r}
        stroke="url(#ringGrad)"
        strokeWidth="9"
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: c - (pct / 100) * c }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        transform="rotate(-90 50 50)"
      />
      <text
        x="50"
        y="56"
        textAnchor="middle"
        className="fill-[var(--brand)] font-display"
        fontSize="20"
      >
        {pct}%
      </text>
    </svg>
  );
}

function Home() {
  const { username, branch } = useAppState();
  const branchLabel = BRANCHES.find((b) => b.id === branch)?.name;

  return (
    <ScreenTransition>
      <div className="mx-auto max-w-md px-5 pt-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-3"
        >
          <div>
            <p className="text-xs text-muted-foreground">مرحبًا بعودتك</p>
            <p className="font-display text-2xl text-foreground">{username}</p>
          </div>
          {branchLabel && (
            <span className="surface hairline rounded-full px-3 py-1.5 font-display text-xs text-muted-foreground">
              {branchLabel}
            </span>
          )}
        </motion.div>

        {/* بطاقة الإنجاز اليومي */}
        <motion.section
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-brand shadow-brand sheen relative mt-5 overflow-hidden rounded-[28px] p-5 text-primary-foreground"
        >
          <div className="relative z-[2] flex items-center justify-between gap-4">
            <div>
              <p className="text-xs opacity-85">دافع اليوم</p>
              <p className="mt-1 font-display text-2xl leading-tight">
                {STREAK_DAYS} يوم دراسة متواصلة
              </p>
              <p className="mt-2 text-xs opacity-85">أنت ضمن أفضل 8% من طلاب فرعك</p>
            </div>
            <Flame className="h-11 w-11 shrink-0 opacity-90" />
          </div>

          <div className="relative z-[2] mt-4 flex items-center justify-between gap-1.5">
            {WEEK.map((d, i) => (
              <span key={d} className="flex flex-col items-center gap-1">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-xl text-[11px] font-display transition ${
                    DONE[i]
                      ? "bg-[oklch(1_0_0/0.9)] text-[var(--brand)]"
                      : "bg-[oklch(1_0_0/0.18)] text-primary-foreground/80"
                  }`}
                >
                  {DONE[i] ? <CalendarCheck className="h-4 w-4" /> : d}
                </span>
              </span>
            ))}
          </div>
        </motion.section>

        {/* متابعة الدراسة */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
          className="mt-4"
        >
          <Link to="/app/subjects">
            <div className="surface hairline lift flex items-center gap-4 rounded-[26px] p-4">
              <span className="bg-gradient-brand shadow-brand grid h-12 w-12 shrink-0 place-items-center rounded-2xl">
                <PlayCircle className="h-6 w-6 text-primary-foreground" />
              </span>
              <span className="flex-1">
                <span className="block font-display text-foreground">تابع من حيث توقفت</span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {WEAK.name} — الفصل الأول
                </span>
              </span>
              <ArrowLeft className="text-brand h-5 w-5" />
            </div>
          </Link>
        </motion.div>

        {/* الإحصاءات */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14, duration: 0.5 }}
            className="surface hairline flex flex-col items-center rounded-[26px] p-4 text-center"
          >
            <Ring pct={WEAK.pct} />
            <p className="text-brand mt-3 flex items-center gap-1.5 font-display text-sm">
              <Target className="h-4 w-4" />
              أضعف مادة
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">{WEAK.name}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="surface hairline rounded-[26px] p-4"
          >
            <p className="mb-3 text-center font-display text-sm text-foreground">آخر الدرجات</p>
            <ul className="space-y-2.5">
              {GRADES.map((g) => (
                <li key={g.name}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">{g.name}</span>
                    <span className="font-display text-xs text-foreground">{g.grade}</span>
                  </div>
                  <div className="bg-muted mt-1 h-1.5 overflow-hidden rounded-full">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${g.grade}%` }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-gradient-brand h-full rounded-full"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </ScreenTransition>
  );
}
