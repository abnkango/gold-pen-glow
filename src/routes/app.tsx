import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { BottomNav } from "@/components/BottomNav";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-svh pb-28">
      <header className="bg-background/70 sticky top-0 z-40 px-4 pt-3 pb-2 backdrop-blur-xl">
        <div className="mx-auto flex max-w-md items-center justify-between">
          <Link to="/app/home" className="flex items-center gap-2">
            <Logo size={34} glow={false} />
            <span className="text-gradient-brand font-display text-lg">ورقة وقلم</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <div key={pathname}>
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}
