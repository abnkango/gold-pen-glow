import type { ReactNode } from "react";

export function AdminPage({
  title, subtitle, action, children,
}: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="px-8 py-8">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl text-gold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-silver-dim">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

export function StatCard({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="glass-strong rounded-3xl p-5 metallic-border">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-3xl font-display text-gold">{value}</span>
      </div>
      <div className="mt-2 text-xs text-silver-dim">{label}</div>
    </div>
  );
}

export function AdminButton({
  children, onClick, variant = "primary", type = "button",
}: { children: ReactNode; onClick?: () => void; variant?: "primary" | "ghost" | "danger"; type?: "button" | "submit" }) {
  const cls =
    variant === "primary"
      ? "bg-gold text-primary-foreground shadow-gold hover:shadow-gold-strong"
      : variant === "danger"
        ? "bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25"
        : "bg-white/[0.04] text-silver-dim border border-[rgba(232,201,122,0.18)] hover:text-silver hover:border-[rgba(232,201,122,0.4)]";
  return (
    <button type={type} onClick={onClick} className={`px-4 py-2 rounded-2xl text-sm font-display transition ${cls}`}>
      {children}
    </button>
  );
}

export function AdminInput({
  value, onChange, placeholder, type = "text",
}: { value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl bg-black/40 border border-[rgba(232,201,122,0.22)] px-4 py-2.5 outline-none text-silver placeholder:text-silver-dim/60 focus:border-[rgba(232,201,122,0.6)] focus:shadow-gold transition text-sm"
    />
  );
}
