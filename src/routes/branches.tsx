import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { GoldButton } from "@/components/GoldButton";
import { ScreenTransition } from "@/components/ScreenTransition";
import { BRANCHES, useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/branches")({
  component: Branches,
});

function Branches() {
  const nav = useNavigate();
  const { branch, setBranch } = useAppState();
  const selected = BRANCHES.find((b) => b.id === branch);

  return (
    <ScreenTransition>
      <div className="min-h-screen px-6 pt-12 pb-40">
        <h1 className="font-display text-3xl text-gold text-center">اختر فرعك</h1>
        <p className="mt-2 text-center text-silver-dim text-sm">سنخصص المحتوى بناءً على اختيارك</p>

        <div className="mt-10 space-y-4 max-w-md mx-auto">
          {BRANCHES.map((b) => {
            const active = branch === b.id;
            return (
              <motion.button
                key={b.id}
                onClick={() => setBranch(b.id)}
                whileTap={{ scale: 0.98 }}
                whileHover={{ scale: 1.01 }}
                transition={{ type: "spring", stiffness: 380, damping: 26 }}
                className={`no-tap w-full flex items-center justify-between rounded-3xl p-5 metallic-border transition-all ${
                  active
                    ? "bg-[linear-gradient(135deg,rgba(232,201,122,0.18),rgba(201,168,76,0.06))] shadow-gold-strong"
                    : "glass"
                }`}
              >
                <span className={`font-display text-xl ${active ? "text-gold" : "text-silver"}`}>
                  {b.name}
                </span>
                <span className="text-3xl">{b.icon}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed bottom-0 inset-x-0 px-4 pb-[max(env(safe-area-inset-bottom),16px)] pt-4"
          >
            <div className="mx-auto max-w-md glass-strong rounded-3xl p-4 shadow-gold-strong">
              <p className="text-silver-dim text-xs text-center mb-1">الفرع المختار</p>
              <p className="font-display text-gold text-lg text-center mb-3">{selected.name}</p>
              <GoldButton onClick={() => nav({ to: "/app/home" })}>تأكيد</GoldButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenTransition>
  );
}
