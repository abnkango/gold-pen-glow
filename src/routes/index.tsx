import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { GoldButton } from "@/components/GoldButton";
import { ScreenTransition } from "@/components/ScreenTransition";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ورقة وقلم — منصتك التعليمية" },
      { name: "description", content: "منصة تعليمية فاخرة للطلاب في سوريا" },
    ],
  }),
  component: Splash,
});

function Splash() {
  return (
    <ScreenTransition>
      <div className="relative min-h-screen flex flex-col items-center justify-between px-6 py-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

        <div className="flex-1" />

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center text-center"
        >
          <Logo size={120} />
          <h1 className="mt-8 font-display text-5xl text-gold leading-none">ورقة وقلم</h1>
          <p className="mt-4 text-silver-dim text-base">منصتك التعليمية الأولى في سوريا</p>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="w-full max-w-sm flex flex-col gap-5"
        >
          <Link to="/auth" search={{ mode: "register" } as never}>
            <GoldButton variant="primary">إنشاء حساب</GoldButton>
          </Link>
          <div className="flex items-center gap-3 px-2 opacity-60">
            <span className="h-px flex-1 bg-[rgba(232,201,122,0.25)]" />
            <span className="text-[11px] text-silver-dim font-display">أو</span>
            <span className="h-px flex-1 bg-[rgba(232,201,122,0.25)]" />
          </div>
          <Link to="/auth" search={{ mode: "login" } as never}>
            <GoldButton variant="outline">تسجيل الدخول</GoldButton>
          </Link>
        </motion.div>
      </div>
    </ScreenTransition>
  );
}
