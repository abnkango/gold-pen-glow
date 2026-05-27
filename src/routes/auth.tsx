import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { GoldButton } from "@/components/GoldButton";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/auth")({
  component: Auth,
});

function Auth() {
  const navigate = useNavigate();
  const { setUsername, setPhone } = useAppState();
  const [name, setName] = useState("");
  const [phoneLocal, setPhoneLocal] = useState("");
  const [pwd, setPwd] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name) setUsername(name);
    setPhone(phoneLocal || "9XX XXX XXX");
    navigate({ to: "/verify" });
  }

  return (
    <ScreenTransition>
      <div className="min-h-screen flex flex-col items-center px-6 py-10">
        <div className="flex flex-col items-center">
          <Logo size={64} />
          <h2 className="mt-3 font-display text-2xl text-gold">ورقة وقلم</h2>
        </div>

        <form onSubmit={submit} className="mt-8 w-full max-w-sm glass-strong rounded-3xl p-6 space-y-4 metallic-border">
          <h1 className="font-display text-xl text-silver text-center">مرحبًا بك</h1>

          <Field label="الاسم" value={name} onChange={setName} placeholder="اكتب اسمك" />

          <div>
            <label className="block text-xs text-silver-dim mb-1.5">رقم الهاتف</label>
            <div className="flex items-stretch gap-2 rounded-2xl bg-black/40 border border-[rgba(232,201,122,0.25)] focus-within:border-[rgba(232,201,122,0.7)] focus-within:shadow-gold transition">
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
          </div>

          <Field label="كلمة المرور" value={pwd} onChange={setPwd} placeholder="••••••••" type="password" />

          <GoldButton type="submit">متابعة</GoldButton>
        </form>
      </div>
    </ScreenTransition>
  );
}

function Field({
  label, value, onChange, placeholder, type = "text",
}: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs text-silver-dim mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-black/40 border border-[rgba(232,201,122,0.25)] px-4 py-3 outline-none text-silver placeholder:text-silver-dim/60 focus:border-[rgba(232,201,122,0.7)] focus:shadow-gold transition"
      />
    </div>
  );
}
