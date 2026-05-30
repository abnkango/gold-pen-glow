import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { GoldButton } from "@/components/GoldButton";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/verify")({
  component: Verify,
});

const LEN = 6;

function Verify() {
  const nav = useNavigate();
  const { phone, isAdmin, setBranch } = useAppState();
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  function update(i: number, v: string) {
    // دعم اللصق (paste): 6 أرقام دفعة واحدة
    const clean = v.replace(/\D/g, "");
    if (clean.length > 1) {
      const next = Array(LEN).fill("");
      for (let k = 0; k < Math.min(clean.length, LEN); k++) next[k] = clean[k];
      setDigits(next);
      refs.current[Math.min(clean.length, LEN) - 1]?.focus();
      return;
    }
    const ch = clean.slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    if (ch && i < LEN - 1) refs.current[i + 1]?.focus();
  }

  function onKeyDown(i: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  }

  const complete = digits.every((d) => d !== "");

  function confirm() {
    // TODO: استبدل بـ Firebase verifyOTP لاحقاً.
    if (!complete) return;
    if (isAdmin) { nav({ to: "/admin" }); return; }
    nav({ to: branch ? "/app/home" : "/branches" });
  }

  return (
    <ScreenTransition>
      <div className="min-h-screen flex flex-col items-center px-6 py-12">
        <h1 className="font-display text-3xl text-gold">تأكيد الرقم</h1>
        <p className="mt-2 text-silver-dim text-sm">أدخل رمز التحقق المرسل إلى</p>
        <p className="mt-1 font-display text-silver tracking-wider" dir="ltr">+963 {phone || "9XX XXX XXX"}</p>

        <div className="mt-10 flex gap-2.5 sm:gap-3" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              maxLength={LEN}
              className="w-11 h-14 sm:w-12 sm:h-16 text-center font-display text-xl sm:text-2xl text-gold bg-black/50 rounded-2xl border border-[rgba(232,201,122,0.3)] focus:border-[rgba(232,201,122,0.8)] focus:shadow-gold-strong outline-none transition"
            />
          ))}
        </div>

        <div className="mt-12 w-full max-w-sm">
          <GoldButton onClick={confirm} disabled={!complete}>
            {isAdmin ? "دخول لوحة التحكم" : "تأكيد"}
          </GoldButton>
        </div>
        {isAdmin && (
          <p className="mt-4 text-xs text-gold/80 font-display">تم التعرّف على حساب الآدمن</p>
        )}

        <button className="mt-6 text-silver-dim text-sm hover:text-gold transition">
          إعادة إرسال الرمز
        </button>
      </div>
    </ScreenTransition>
  );
}
