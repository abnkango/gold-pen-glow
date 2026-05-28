import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAppState } from "@/lib/app-state";
import { Logo } from "@/components/Logo";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

const NAV: { to: string; label: string; icon: string; exact?: boolean }[] = [
  { to: "/admin", label: "الرئيسية", icon: "🏠", exact: true },
  { to: "/admin/content", label: "المحتوى التعليمي", icon: "📚" },
  { to: "/admin/teachers", label: "الأساتذة", icon: "👨‍🏫" },
  { to: "/admin/books", label: "الكتب (PDF)", icon: "📕" },
  { to: "/admin/students", label: "الطلاب", icon: "🎓" },
];

function AdminLayout() {
  const { isAdmin, username } = useAppState();
  const nav = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!isAdmin) nav({ to: "/auth", replace: true });
  }, [isAdmin, nav]);

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen flex" dir="rtl">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-l border-[rgba(232,201,122,0.18)] bg-black/50 backdrop-blur-xl flex flex-col">
        <div className="px-5 py-6 border-b border-[rgba(232,201,122,0.15)] flex items-center gap-3">
          <Logo size={36} />
          <div>
            <div className="font-display text-gold text-sm leading-tight">ورقة وقلم</div>
            <div className="text-[10px] text-silver-dim">لوحة التحكم</div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.to : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to as "/admin"}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-display transition no-tap ${
                  active
                    ? "bg-gold-soft text-gold shadow-gold border border-[rgba(232,201,122,0.35)]"
                    : "text-silver-dim hover:text-silver hover:bg-white/[0.03]"
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[rgba(232,201,122,0.15)] text-xs text-silver-dim">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span>متصل كآدمن</span>
          </div>
          <div className="mt-1 text-silver font-display truncate">{username}</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
