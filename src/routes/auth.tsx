import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { GoldButton } from "@/components/GoldButton";
import { ScreenTransition } from "@/components/ScreenTransition";
import { FieldError } from "@/components/auth/FieldError";
import { useAppState } from "@/lib/app-state";

type Mode = "register" | "login";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode: Mode } => ({
    mode: s.mode === "login" ? "login" : "register",
  }),
  component: Auth,
});

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
      <div className="min-h-screen flex flex-col items-center px-6 py-10">
        <div className="flex flex-col items-center">
          <Logo size={64} />
          <h2 className="mt-3 font-display text-2xl text-gold">ورقة وقلم</h2>
        </div>

        <form
          onSubmit={submit}
          className="mt-8 w-full max-w-sm glass-strong rounded-3xl p-6 space-y-5 metallic-border"
        >
          <div className="text-center">
            <h1 className="font-display text-xl text-silver">
              {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
            </h1>
            <p className="text-[11px] text-silver-dim mt-1">
              {isLogin ? "أدخل رقمك وكلمة المرور" : "نحتاج بعض المعلومات للبدء"}
            </p>
          </div>

          {!isLogin && (
            <div>
              <Field label="الاسم" value={name} onChange={setName} placeholder="اكتب اسمك" hasError={!!errors.name} />
              <FieldError message={errors.name} />
            </div>
          )}

          <div>
            <label className="block text-xs text-silver-dim mb-1.5">رقم الهاتف</label>
            <div
              className={`flex items-stretch gap-2 rounded-2xl bg-black/40 border transition focus-within:shadow-gold ${
                errors.phone
                  ? "border-[rgba(232,201,122,0.7)]"
                  : "border-[rgba(232,201,122,0.25)] focus-within:border-[rgba(232,201,122,0.7)]"
              }`}
            >
              <span className="px-3 flex items-center font-display text-gold border-l border-[rgba(232,201,122,0.25)]">+963</span>
              <input
                value={phoneLocal}
                onChange={(e) => setPhoneLocal(e.target.value)}
                inputMode="numeric"
                placeholder="9XX XXX XXX"
                className="flex-1 bg-transparent py-3 pr-3 outline-none text-silver placeholder:text-silver-dim/60 text-right"
                dir="ltr"
              />
            </div>
            <FieldError message={errors.phone} />
          </div>

          <div>
            <Field label="كلمة المرور" value={pwd} onChange={setPwd} placeholder="••••••••" type="password" hasError={!!errors.pwd} />
            <FieldError message={errors.pwd} />
          </div>

          <GoldButton type="submit">{isLogin ? "دخول" : "متابعة"}</GoldButton>

          <div className="text-center pt-1">
            {isLogin ? (
              <Link to="/auth" search={{ mode: "register" }} className="text-[12px] text-silver-dim hover:text-gold transition">
                ليس لديك حساب؟ <span className="text-gold font-display">إنشاء حساب</span>
              </Link>
            ) : (
              <Link to="/auth" search={{ mode: "login" }} className="text-[12px] text-silver-dim hover:text-gold transition">
                لديك حساب؟ <span className="text-gold font-display">تسجيل الدخول</span>
              </Link>
            )}
          </div>
        </form>
      </div>
    </ScreenTransition>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text", hasError,
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string; hasError?: boolean }) {
  return (
    <div>
      <label className="block text-xs text-silver-dim mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-2xl bg-black/40 border px-4 py-3 outline-none text-silver placeholder:text-silver-dim/60 focus:shadow-gold transition ${
          hasError
            ? "border-[rgba(232,201,122,0.7)]"
            : "border-[rgba(232,201,122,0.25)] focus:border-[rgba(232,201,122,0.7)]"
        }`}
      />
    </div>
  );
}
