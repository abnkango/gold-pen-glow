import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ChevronLeft, User, BookOpen, Smartphone, Bell, Lock, Languages, LogOut } from "lucide-react";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/app/settings")({
  component: SettingsScreen,
});

type Row = {
  icon: typeof User;
  label: string;
  desc: string;
  action?: "toggle";
};
const SECTIONS: { title: string; rows: Row[] }[] = [
  {
    title: "الحساب",
    rows: [
      { icon: User, label: "الملف الشخصي", desc: "اسمك، صورتك، معلوماتك" },
      { icon: Lock, label: "كلمة المرور", desc: "تغيير كلمة المرور" },
    ],
  },
  {
    title: "المواد الدراسية",
    rows: [
      { icon: BookOpen, label: "المواد غير الملزمة", desc: "إدارة المواد الاختيارية", action: "toggle" },
    ],
  },
  {
    title: "التطبيق",
    rows: [
      { icon: Bell, label: "الإشعارات", desc: "تنبيهات الدراسة والاختبارات" },
      { icon: Languages, label: "اللغة", desc: "العربية" },
      { icon: Smartphone, label: "حول التطبيق", desc: "الإصدار 1.0.0" },
    ],
  },
];

function SettingsScreen() {
  const [modal, setModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [opts, setOpts] = useState({ art: true, sport: false, music: true });
  const { logout } = useAppState();
  const navigate = useNavigate();

  function confirmLogout() {
    logout();
    setLogoutModal(false);
    navigate({ to: "/" });
  }

  return (
    <ScreenTransition>
      <div className="px-5 pt-10 max-w-md mx-auto">
        <ScreenHeader title="الإعدادات" />

        <div className="space-y-6">
          {SECTIONS.map((sec) => (
            <div key={sec.title}>
              <p className="font-display text-gold text-sm mb-2 px-1">{sec.title}</p>
              <div className="glass metallic-border rounded-3xl divide-y divide-[rgba(232,201,122,0.12)] overflow-hidden">
                {sec.rows.map((r) => {
                  const Icon = r.icon;
                  return (
                    <motion.button
                      key={r.label}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => r.action === "toggle" && setModal(true)}
                      className="w-full flex items-center gap-3 p-4 text-right"
                    >
                      <div className="w-9 h-9 rounded-xl bg-[rgba(232,201,122,0.1)] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-gold" />
                      </div>
                      <div className="flex-1">
                        <p className="font-display text-silver text-sm">{r.label}</p>
                        <p className="text-silver-dim text-xs">{r.desc}</p>
                      </div>
                      <ChevronLeft className="w-4 h-4 text-silver-dim" />
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setModal(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md glass-strong metallic-border rounded-3xl p-6"
            >
              <p className="font-display text-gold text-lg text-center mb-4">المواد غير الملزمة</p>
              {([
                ["art", "التربية الفنية"],
                ["sport", "التربية الرياضية"],
                ["music", "التربية الموسيقية"],
              ] as const).map(([k, label]) => (
                <div key={k} className="flex items-center justify-between py-3 border-b border-[rgba(232,201,122,0.1)] last:border-0">
                  <span className="font-display text-silver">{label}</span>
                  <button
                    onClick={() => setOpts((o) => ({ ...o, [k]: !o[k] }))}
                    className={`w-12 h-7 rounded-full p-0.5 transition ${
                      opts[k] ? "bg-gold shadow-gold" : "bg-white/10"
                    }`}
                  >
                    <motion.span
                      animate={{ x: opts[k] ? -20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="block w-6 h-6 rounded-full bg-white"
                    />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setModal(false)}
                className="mt-5 w-full rounded-2xl bg-gold py-2.5 font-display text-primary-foreground shadow-gold"
              >
                تم
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ScreenTransition>
  );
}
