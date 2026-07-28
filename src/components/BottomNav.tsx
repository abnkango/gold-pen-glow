import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Home, Library, Settings } from "lucide-react";

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
    <nav
      aria-label="التنقل الرئيسي"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pt-2 pb-[max(env(safe-area-inset-bottom),12px)]"
    >
      <div className="surface-strong hairline pointer-events-auto mx-auto flex max-w-md items-center justify-between gap-1 rounded-[26px] p-1.5">
        {TABS.map(({ to, label, Icon }) => {
          const active = pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-current={active ? "page" : undefined}
              className="no-tap min-w-0 flex-1"
            >
              <div className="relative flex h-14 flex-col items-center justify-center gap-1 rounded-[20px] px-1">
                {active && (
                  <motion.span
                    layoutId="navIndicator"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="bg-gradient-brand shadow-brand absolute inset-0 rounded-[20px]"
                  />
                )}
                <Icon
                  className={`relative z-[1] h-[19px] w-[19px] shrink-0 transition-colors duration-200 ${
                    active ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                  strokeWidth={active ? 2.3 : 1.8}
                />
                <span
                  className={`relative z-[1] truncate font-display text-[10.5px] leading-none transition-colors duration-200 ${
                    active ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
