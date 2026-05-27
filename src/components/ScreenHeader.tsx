export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="text-center mb-6">
      <h1 className="font-display text-3xl text-gold leading-tight">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-silver-dim">{subtitle}</p>}
    </div>
  );
}
