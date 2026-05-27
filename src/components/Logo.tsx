export function Logo({ size = 96 }: { size?: number }) {
  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-label="ورقة وقلم"
    >
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-60"
        style={{ background: "radial-gradient(circle, rgba(232,201,122,0.55), transparent 65%)" }}
      />
      <svg viewBox="0 0 64 64" width={size} height={size} className="relative">
        <defs>
          <linearGradient id="gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#F2D98C" />
            <stop offset="55%" stopColor="#E8C97A" />
            <stop offset="100%" stopColor="#8C7330" />
          </linearGradient>
          <linearGradient id="silver" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#EEF2F6" />
            <stop offset="100%" stopColor="#B0B8C1" />
          </linearGradient>
        </defs>
        {/* Open book */}
        <path
          d="M8 20 C 18 14, 28 14, 32 20 C 36 14, 46 14, 56 20 L 56 48 C 46 42, 36 42, 32 48 C 28 42, 18 42, 8 48 Z"
          fill="url(#gold)"
          opacity="0.95"
        />
        <path d="M32 20 L 32 48" stroke="#0A0A0A" strokeWidth="1.2" opacity="0.5" />
        {/* Pen */}
        <g transform="rotate(35 32 30)">
          <rect x="30.5" y="6" width="3" height="30" rx="1.2" fill="url(#silver)" />
          <polygon points="30.5,36 33.5,36 32,42" fill="url(#gold)" />
          <rect x="30.5" y="14" width="3" height="2" fill="#0A0A0A" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
