import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  BookOpen,
  ChevronLeft,
  Languages,
  Lock,
  LogOut,
  Moon,
  Smartphone,
  Sun,
  User,
} from "lucide-react";
import { useState } from "react";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useAppState } from "@/lib/app-state";
import { useTheme, type Theme } from "@/lib/theme";

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
      {
        icon: BookOpen,
        label: "المواد غير الملزمة",
        desc: "إدارة المواد الاختيارية",
        action: "toggle",
      },
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

const THEMES: { id: Theme; label: string; Icon: typeof Sun }[] = [
  { id: "light", label: "فاتح", Icon: Sun },
  { id: "dark", label: "داكن", Icon: Moon },
];

function SettingsScreen() {
  const [modal, setModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [opts, setOpts] = useState({ art: true, sport: false, music: true });
  const { logout } = useAppState();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  function confirmLogout() {
    logout();
    setLogoutModal(false);
    navigate({ to: "/" });
  }

  return (
    <ScreenTransition>
      <div className="mx-auto max-w-md px-5 pt-6">
        <ScreenHeader title="الإعدادات" subtitle="خصّص تجربتك داخل التطبيق" />

        <div className="space-y-6">
          {/* المظهر */}
          <section>
            <p className="text-brand mb-2 px-1 font-display text-sm">المظهر</p>
            <div className="surface hairline rounded-[26px] p-4">
              <div className="bg-muted/70 flex gap-1 rounded-2xl p-1">
                {THEMES.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => setTheme(id)}
                    aria-pressed={theme === id}
                    className="no-tap relative flex-1 py-2.5"
                  >
                    {theme === id && (
                      <motion.span
                        layoutId="themeTab"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="bg-gradient-brand shadow-brand absolute inset-0 rounded-xl"
                      />
                    )}
                    <span
                      className={`relative flex items-center justify-center gap-2 font-display text-sm ${
                        theme === id ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>

          {SECTIONS.map((sec) => (
            <section key={sec.title}>
              <p className="text-brand mb-2 px-1 font-display text-sm">{sec.title}</p>
              <div className="surface hairline divide-border divide-y overflow-hidden rounded-[26px]">
                {sec.rows.map((r) => {
                  const Icon = r.icon;
                  return (
                    <motion.button
                      key={r.label}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => r.action === "toggle" && setModal(true)}
                      className="flex w-full items-center gap-3 p-4 text-right transition-colors hover:bg-accent/30"
                    >
                      <span className="bg-gradient-brand-soft grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                        <Icon className="text-brand h-4 w-4" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-sm text-foreground">
                          {r.label}
                        </span>
                        <span className="block text-xs text-muted-foreground">{r.desc}</span>
                      </span>
                      <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </motion.button>
                  );
                })}
              </div>
            </section>
          ))}

          <motion.button
            whileTap={{ scale: 0.99 }}
            onClick={() => setLogoutModal(true)}
            className="surface hairline flex w-full items-center gap-3 rounded-[26px] p-4 text-right transition-colors hover:bg-destructive/10"
          >
            <span className="bg-destructive/12 grid h-9 w-9 shrink-0 place-items-center rounded-xl">
              <LogOut className="text-destructive h-4 w-4" />
            </span>
            <span className="flex-1">
              <span className="text-destructive block font-display text-sm">تسجيل الخروج</span>
              <span className="block text-xs text-muted-foreground">العودة إلى شاشة البداية</span>
            </span>
            <ChevronLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {logoutModal && (
          <Overlay onClose={() => setLogoutModal(false)}>
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="surface-strong hairline w-full max-w-xs rounded-[28px] p-6 text-center"
            >
              <div className="bg-destructive/12 mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl">
                <LogOut className="text-destructive h-5 w-5" />
              </div>
              <p className="font-display text-lg text-foreground">هل أنت متأكد؟</p>
              <p className="mt-1.5 text-xs text-muted-foreground">
                سيتم تسجيل خروجك والعودة إلى شاشة البداية
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  onClick={confirmLogout}
                  className="bg-destructive w-full rounded-2xl py-2.5 font-display text-destructive-foreground"
                >
                  نعم، تسجيل الخروج
                </button>
                <button
                  onClick={() => setLogoutModal(false)}
                  className="border-border w-full rounded-2xl border py-2.5 font-display text-foreground transition-colors hover:bg-accent/40"
                >
                  إلغاء
                </button>
              </div>
            </motion.div>
          </Overlay>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modal && (
          <Overlay onClose={() => setModal(false)} align="end">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="surface-strong hairline w-full max-w-md rounded-[28px] p-6"
            >
              <p className="text-brand mb-4 text-center font-display text-lg">المواد غير الملزمة</p>
              {(
                [
                  ["art", "التربية الفنية"],
                  ["sport", "التربية الرياضية"],
                  ["music", "التربية الموسيقية"],
                ] as const
              ).map(([k, label]) => (
                <div
                  key={k}
                  className="border-border flex items-center justify-between border-b py-3 last:border-0"
                >
                  <span className="font-display text-foreground">{label}</span>
                  <button
                    onClick={() => setOpts((o) => ({ ...o, [k]: !o[k] }))}
                    role="switch"
                    aria-checked={opts[k]}
                    aria-label={label}
                    className={`h-7 w-12 rounded-full p-0.5 transition ${
                      opts[k] ? "bg-gradient-brand shadow-brand" : "bg-muted"
                    }`}
                  >
                    <motion.span
                      animate={{ x: opts[k] ? -20 : 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="block h-6 w-6 rounded-full bg-white shadow-soft"
                    />
                  </button>
                </div>
              ))}
              <button
                onClick={() => setModal(false)}
                className="bg-gradient-brand shadow-brand mt-5 w-full rounded-2xl py-2.5 font-display text-primary-foreground"
              >
                تم
              </button>
            </motion.div>
          </Overlay>
        )}
      </AnimatePresence>
    </ScreenTransition>
  );
}

function Overlay({
  children,
  onClose,
  align = "center",
}: {
  children: React.ReactNode;
  onClose: () => void;
  align?: "center" | "end";
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 z-50 flex justify-center bg-[oklch(0.2_0.02_55/0.45)] p-4 backdrop-blur-md ${
        align === "end" ? "items-end sm:items-center" : "items-center"
      }`}
    >
      {children}
    </motion.div>
  );
}
