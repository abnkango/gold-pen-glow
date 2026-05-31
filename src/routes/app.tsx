import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence } from "framer-motion";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen pb-28">
      <AnimatePresence mode="wait" initial={false}>
        <div key={pathname} className="contents">
          <Outlet />
        </div>
      </AnimatePresence>
      <BottomNav />
    </div>
  );
}
