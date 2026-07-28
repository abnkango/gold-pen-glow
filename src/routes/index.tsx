import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { GraduationCap, MessagesSquare, PlayCircle } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { GoldButton } from "@/components/GoldButton";
import { Logo } from "@/components/Logo";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ورقة وقلم — منصتك التعليمية" },
      { name: "description", content: "منصة تعليمية فاخرة للطلاب في سوريا" },
    ],
  }),
  component: Splash,
});

const HIGHLIGHTS = [
  { Icon: PlayCircle, label: "دروس مصوّرة" },
  { Icon: MessagesSquare, label: "أساتذة متاحون" },
  { Icon: GraduationCap, label: "اختبارات ذكية" },
];

function Splash() {
  return (
    <ScreenTransition>
      <div className="relative flex min-h-svh flex-col items-center justify-between overflow-hidden px-6 pt-6 pb-12">
        <Aurora />

        <div className="relative z-10 flex w-full max-w-sm justify-end">
          <ThemeToggle />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 flex flex-col items-center text-center"
        >
          <div className="animate-float">
            <Logo size={128} />
          </div>
          <h1 className="text-gradient-brand mt-7 font-display text-[54px] leading-none">
            ورقة وقلم
          </h1>
          <p className="mt-3 text-base text-muted-foreground">منصتك التعليمية الأولى في سوريا</p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {HIGHLIGHTS.map(({ Icon, label }, i) => (
              <motion.span
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="surface hairline flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs text-muted-foreground"
              >
                <Icon className="text-brand h-3.5 w-3.5" />
                {label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="relative z-10 flex w-full max-w-sm flex-col gap-4"
        >
          <Link to="/auth" search={{ mode: "register" } as never}>
            <GoldButton variant="primary">إنشاء حساب</GoldButton>
          </Link>
          <div className="flex items-center gap-3 px-2">
            <span className="bg-border h-px flex-1" />
            <span className="font-display text-[11px] text-muted-foreground">أو</span>
            <span className="bg-border h-px flex-1" />
          </div>
          <Link to="/auth" search={{ mode: "login" } as never}>
            <GoldButton variant="outline">تسجيل الدخول</GoldButton>
          </Link>
        </motion.div>
      </div>
    </ScreenTransition>
  );
}
