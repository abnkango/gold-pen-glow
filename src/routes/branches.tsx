import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { GoldButton } from "@/components/GoldButton";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";
import { BRANCHES, useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/branches")({
  component: Branches,
});

const HINTS: Record<string, string> = {
  scientific: "رياضيات، فيزياء، كيمياء وعلوم",
  literary: "لغة عربية، تاريخ، جغرافيا وفلسفة",
  ninth: "منهاج الصف التاسع كاملًا",
};

function Branches() {
  const nav = useNavigate();
  const { branch, setBranch } = useAppState();
  const selected = BRANCHES.find((b) => b.id === branch);

  return (
    <ScreenTransition>
      <div className="relative min-h-svh overflow-hidden px-6 pt-12 pb-44">
        <Aurora />

        <div className="relative z-10 mx-auto max-w-md">
          <ScreenHeader title="اختر فرعك" subtitle="سنخصص المحتوى بناءً على اختيارك" />

          <div className="mt-8 space-y-4">
            {BRANCHES.map((b, i) => {
              const active = branch === b.id;
              return (
                <motion.button
                  key={b.id}
                  onClick={() => setBranch(b.id)}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileTap={{ scale: 0.985 }}
                  whileHover={{ y: -3 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 380, damping: 26 }}
                  aria-pressed={active}
                  className={`no-tap hairline relative flex w-full items-center gap-4 rounded-[28px] p-5 text-right transition-shadow duration-300 ${
                    active ? "bg-gradient-brand-soft shadow-brand" : "surface hover:shadow-elevated"
                  }`}
                >
                  <span
                    className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl transition-colors ${
                      active ? "bg-gradient-brand" : "bg-muted"
                    }`}
                  >
                    {b.icon}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-xl ${active ? "text-brand" : "text-foreground"}`}
                    >
                      {b.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {HINTS[b.id]}
                    </span>
                  </span>
                  <span
                    className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all ${
                      active
                        ? "bg-gradient-brand border-transparent"
                        : "border-border bg-transparent"
                    }`}
                  >
                    {active && <Check className="h-4 w-4 text-primary-foreground" />}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-40 px-4 pt-4 pb-[max(env(safe-area-inset-bottom),16px)]"
          >
            <div className="surface-strong hairline mx-auto max-w-md rounded-[28px] p-4">
              <p className="mb-1 text-center text-xs text-muted-foreground">الفرع المختار</p>
              <p className="text-brand mb-3 text-center font-display text-lg">{selected.name}</p>
              <GoldButton onClick={() => nav({ to: "/app/home" })}>تأكيد ومتابعة</GoldButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenTransition>
  );
}
