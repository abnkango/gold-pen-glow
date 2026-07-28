export function Logo({ size = 96, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="ورقة وقلم"
      role="img"
    >
      {glow && (
        <div
          className="absolute inset-[-18%] rounded-full blur-2xl opacity-70"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.17 48 / 0.45), oklch(0.79 0.145 68 / 0.18) 45%, transparent 70%)",
          }}
        />
      )}
      <svg viewBox="0 0 64 64" width={size} height={size} className="relative drop-shadow-sm">
        <defs>
          <linearGradient id="wq-brand" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.83 0.14 72)" />
            <stop offset="55%" stopColor="oklch(0.68 0.19 46)" />
            <stop offset="100%" stopColor="oklch(0.54 0.16 36)" />
          </linearGradient>
          <linearGradient id="wq-page" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(1 0 0 / 0.96)" />
            <stop offset="100%" stopColor="oklch(0.95 0.02 78 / 0.9)" />
          </linearGradient>
          <linearGradient id="wq-pen" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.98 0.01 80)" />
            <stop offset="100%" stopColor="oklch(0.75 0.02 70)" />
          </linearGradient>
        </defs>

        {/* الغلاف */}
        <path
          d="M6 18.5C15.5 12.5 26.5 12.5 32 18.5C37.5 12.5 48.5 12.5 58 18.5L58 49C48.5 43 37.5 43 32 49C26.5 43 15.5 43 6 49Z"
          fill="url(#wq-brand)"
        />
        {/* الصفحات */}
        <path
          d="M10.5 21.5C18 17.4 26 17.4 30 21.8L30 45.4C26 41.4 18 41.4 10.5 45.2Z"
          fill="url(#wq-page)"
        />
        <path
          d="M53.5 21.5C46 17.4 38 17.4 34 21.8L34 45.4C38 41.4 46 41.4 53.5 45.2Z"
          fill="url(#wq-page)"
        />
        {/* أسطر */}
        <g stroke="oklch(0.68 0.19 46 / 0.32)" strokeWidth="1.1" strokeLinecap="round">
          <path d="M14 26H26" />
          <path d="M14 31H26" />
          <path d="M38 26H50" />
          <path d="M38 31H50" />
        </g>
        <path d="M32 18.6V49" stroke="oklch(0.42 0.1 40 / 0.35)" strokeWidth="1.3" />

        {/* القلم */}
        <g transform="rotate(32 40 28)">
          <rect x="38.4" y="6" width="3.4" height="24" rx="1.6" fill="url(#wq-pen)" />
          <rect x="38.4" y="13" width="3.4" height="2.4" fill="oklch(0.68 0.19 46)" />
          <polygon points="38.4,30 41.8,30 40.1,36" fill="url(#wq-brand)" />
          <circle cx="40.1" cy="34.4" r="0.9" fill="oklch(0.32 0.06 45)" />
        </g>
      </svg>
    </div>
  );
}
