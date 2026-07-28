import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Aurora } from "@/components/Aurora";
import { GoldButton } from "@/components/GoldButton";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/verify")({
  component: Verify,
});

const LEN = 6;
const RESEND_SECONDS = 45;

function Verify() {
  const nav = useNavigate();
  const { phone, setBranch } = useAppState();
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown === 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

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
    // تسجيل جديد: نمسح أي فرع قديم محفوظ ونوجه لاختيار الفرع
    setBranch(null);
    nav({ to: "/branches" });
  }

  return (
    <ScreenTransition>
      <div className="relative flex min-h-svh flex-col items-center overflow-hidden px-6 py-12">
        <Aurora />

        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="bg-gradient-brand shadow-brand animate-pulse-ring relative z-10 grid h-16 w-16 place-items-center rounded-3xl"
        >
          <ShieldCheck className="h-7 w-7 text-primary-foreground" />
        </motion.div>

        <h1 className="text-gradient-brand relative z-10 mt-5 font-display text-3xl">
          تأكيد الرقم
        </h1>
        <p className="relative z-10 mt-2 text-sm text-muted-foreground">
          أدخل رمز التحقق المرسل إلى
        </p>
        <p className="relative z-10 mt-1 font-display tracking-wider text-foreground" dir="ltr">
          +963 {phone || "9XX XXX XXX"}
        </p>

        <div className="relative z-10 mt-10 flex gap-2.5 sm:gap-3" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={d}
              onChange={(e) => update(i, e.target.value)}
              onKeyDown={(e) => onKeyDown(i, e)}
              inputMode="numeric"
              aria-label={`الخانة ${i + 1}`}
              maxLength={LEN}
              className={`bg-input text-brand h-14 w-11 rounded-2xl border text-center font-display text-xl outline-none transition-all duration-300 focus:shadow-brand sm:h-16 sm:w-12 sm:text-2xl ${
                d ? "border-border-strong shadow-soft" : "border-border"
              }`}
            />
          ))}
        </div>

        <div className="relative z-10 mt-10 w-full max-w-sm">
          <GoldButton onClick={confirm} disabled={!complete}>
            تأكيد
          </GoldButton>
        </div>

        <button
          type="button"
          disabled={countdown > 0}
          onClick={() => setCountdown(RESEND_SECONDS)}
          className="text-brand relative z-10 mt-6 font-display text-sm transition-opacity disabled:opacity-45"
        >
          {countdown > 0 ? `إعادة إرسال الرمز خلال ${countdown} ثانية` : "إعادة إرسال الرمز"}
        </button>
      </div>
    </ScreenTransition>
  );
}
