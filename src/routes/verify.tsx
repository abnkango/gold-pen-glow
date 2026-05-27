import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { GoldButton } from "@/components/GoldButton";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/verify")({
  component: Verify,
});

function Verify() {
  const nav = useNavigate();
  const { phone } = useAppState();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  function update(i: number, v: string) {
    const ch = v.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    if (ch && i < 3) refs.current[i + 1]?.focus();
  }

  return (
    <ScreenTransition>
      <div className="min-h-screen flex flex-col items-center px-6 py-12">
        <h1 className="font-display text-3xl text-gold">تأكيد الرقم</h1>
        <p className="mt-2 text-silver-dim text-sm">أدخل رمز التحقق المرسل إلى</p>
        <p className="mt-1 font-display text-silver tracking-wider" dir="ltr">+963 {phone || "9XX XXX XXX"}</p>

        <div className="mt-10 flex gap-3" dir="ltr">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              value={d}
              onChange={(e) => update(i, e.target.value)}
              inputMode="numeric"
              maxLength={1}
              className="w-14 h-16 text-center font-display text-2xl text-gold bg-black/50 rounded-2xl border border-[rgba(232,201,122,0.3)] focus:border-[rgba(232,201,122,0.8)] focus:shadow-gold-strong outline-none transition"
            />
          ))}
        </div>

        <div className="mt-12 w-full max-w-sm">
          <GoldButton onClick={() => nav({ to: "/branches" })}>تأكيد</GoldButton>
        </div>

        <button className="mt-6 text-silver-dim text-sm hover:text-gold transition">
          إعادة إرسال الرمز
        </button>
      </div>
    </ScreenTransition>
  );
}
