import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Home, BookOpen, GraduationCap, Library, Settings } from "lucide-react";

const TABS = [
  { to: "/app/home", label: "الرئيسية", Icon: Home },
  { to: "/app/subjects", label: "المواد", Icon: BookOpen },
  { to: "/app/teachers", label: "الأساتذة", Icon: GraduationCap },
  { to: "/app/library", label: "المكتبة", Icon: Library },
  { to: "/app/settings", label: "الإعدادات", Icon: Settings },
] as const;

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 pb-[max(env(safe-area-inset-bottom),12px)] pt-2 px-3 pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-md glass-strong rounded-3xl px-2 py-2 flex items-center justify-between gap-1 shadow-gold">
        {TABS.map(({ to, label, Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link key={to} to={to} className="flex-1 no-tap">
              <motion.div
                layout
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className={`relative flex items-center justify-center gap-2 h-11 rounded-2xl px-3 ${
                  active ? "bg-gold text-primary-foreground shadow-gold" : "text-silver-dim"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={active ? 2.4 : 1.8} />
                {active && (
                  <motion.span
                    layoutId="navLabel"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="font-display text-sm whitespace-nowrap"
                  >
                    {label}
                  </motion.span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
