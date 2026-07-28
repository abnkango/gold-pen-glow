import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Lock, Phone, User } from "lucide-react";
import { useState } from "react";
import { Aurora } from "@/components/Aurora";
import { GoldButton } from "@/components/GoldButton";
import { Logo } from "@/components/Logo";
import { ScreenTransition } from "@/components/ScreenTransition";
import { TextField } from "@/components/TextField";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAppState } from "@/lib/app-state";

type Mode = "register" | "login";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode: Mode } => ({
    mode: s.mode === "login" ? "login" : "register",
  }),
  component: Auth,
});

const MODES: { id: Mode; label: string }[] = [
  { id: "register", label: "إنشاء حساب" },
  { id: "login", label: "تسجيل الدخول" },
];

function Auth() {
  const navigate = useNavigate();
  const { mode } = Route.useSearch();
  const { setUsername, setPhone, branch } = useAppState();

  const [name, setName] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [pwd, setPwd] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; pwd?: string }>({});

  const isLogin = mode === "login";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!isLogin && name.trim().length < 2) errs.name = "اكتب اسمك الكامل";
    if (phoneLocal.replace(/\D/g, "").length < 6) errs.phone = "رقم الهاتف غير مكتمل";
    if (pwd.length < 4) errs.pwd = "كلمة المرور قصيرة";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (!isLogin && name) setUsername(name.trim());
    setPhone(phoneLocal);

    if (isLogin) {
      // مستخدم عائد: إن سبق وحدد فرعه يدخل مباشرة، وإلا يختار الفرع
      navigate({ to: branch ? "/app/home" : "/branches" });
    } else {
      // تسجيل جديد: شاشة OTP
      navigate({ to: "/verify" });
    }
  }

  return (
    <ScreenTransition>
      <div className="relative flex min-h-svh flex-col items-center overflow-hidden px-6 pt-6 pb-12">
        <Aurora />

        <div className="relative z-10 flex w-full max-w-sm items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo size={40} glow={false} />
            <span className="text-gradient-brand font-display text-lg">ورقة وقلم</span>
          </Link>
          <ThemeToggle />
        </div>

        <form
          onSubmit={submit}
          className="surface-strong hairline relative z-10 mt-8 w-full max-w-sm space-y-5 rounded-[32px] p-6"
        >
          <div className="bg-muted/70 relative flex rounded-2xl p-1">
            {MODES.map((m) => (
              <Link
                key={m.id}
                to="/auth"
                search={{ mode: m.id }}
                replace
                className="no-tap relative flex-1 py-2 text-center"
              >
                {mode === m.id && (
                  <motion.span
                    layoutId="authTab"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="bg-gradient-brand shadow-brand absolute inset-0 rounded-xl"
                  />
                )}
                <span
                  className={`relative font-display text-sm ${
                    mode === m.id ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {m.label}
                </span>
              </Link>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground">
            {isLogin ? "أدخل رقمك وكلمة المرور للمتابعة" : "نحتاج بعض المعلومات للبدء"}
          </p>

          {!isLogin && (
            <TextField
              label="الاسم"
              value={name}
              onValueChange={setName}
              placeholder="اكتب اسمك"
              icon={User}
              error={errors.name}
              autoComplete="name"
            />
          )}

          <TextField
            label="رقم الهاتف"
            value={phoneLocal}
            onValueChange={setPhoneLocal}
            placeholder="9XX XXX XXX"
            prefix="+963"
            icon={Phone}
            error={errors.phone}
            inputMode="numeric"
            autoComplete="tel"
            dir="ltr"
            className="pl-3 text-left"
          />

          <TextField
            label="كلمة المرور"
            value={pwd}
            onValueChange={setPwd}
            placeholder="••••••••"
            type="password"
            icon={Lock}
            error={errors.pwd}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />

          <GoldButton type="submit">{isLogin ? "دخول" : "متابعة"}</GoldButton>

          <p className="pt-1 text-center text-[12px] text-muted-foreground">
            {isLogin ? (
              <Link to="/auth" search={{ mode: "register" }} replace className="transition-colors">
                ليس لديك حساب؟ <span className="text-brand font-display">إنشاء حساب</span>
              </Link>
            ) : (
              <Link to="/auth" search={{ mode: "login" }} replace className="transition-colors">
                لديك حساب؟ <span className="text-brand font-display">تسجيل الدخول</span>
              </Link>
            )}
          </p>
        </form>
      </div>
    </ScreenTransition>
  );
}
