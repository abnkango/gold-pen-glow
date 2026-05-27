import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/app/home")({
  component: Home,
});

const WEAK = { name: "الرياضيات", pct: 62 };
const GRADES = [
  { name: "الفيزياء", grade: 88 },
  { name: "الكيمياء", grade: 81 },
  { name: "اللغة العربية", grade: 92 },
  { name: "اللغة الإنجليزية", grade: 74 },
];

function Ring({ pct }: { pct: number }) {
  const r = 38;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg viewBox="0 0 100 100" className="w-28 h-28">
      <defs>
        <linearGradient id="ring" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F2D98C" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={r} stroke="rgba(232,201,122,0.15)" strokeWidth="8" fill="none" />
      <circle
        cx="50" cy="50" r={r} stroke="url(#ring)" strokeWidth="8" fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
        transform="rotate(-90 50 50)"
      />
      <text x="50" y="56" textAnchor="middle" className="fill-[#E8C97A] font-display" fontSize="20">
        {pct}%
      </text>
    </svg>
  );
}

function Home() {
  const { username } = useAppState();
  return (
    <ScreenTransition>
      <div className="px-5 pt-10">
        <div className="flex items-center justify-between">
          <div className="text-right">
            <p className="text-silver-dim text-xs">مرحبًا</p>
            <p className="font-display text-silver text-base">{username}</p>
          </div>
          <h2 className="font-display text-xl text-gold">ورقة وقلم</h2>
          <div className="flex items-center gap-1.5 glass rounded-full px-3 py-1.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="font-display text-sm text-orange-300">12</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-3xl p-5 metallic-border"
          style={{
            background: "linear-gradient(135deg, rgba(251,146,60,0.18), rgba(251,146,60,0.04))",
            boxShadow: "0 0 24px rgba(251,146,60,0.18)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-200/80 text-xs">دافع اليوم</p>
              <p className="font-display text-2xl text-orange-200 mt-1">12 يوم دراسة متواصلة</p>
            </div>
            <Flame className="w-10 h-10 text-orange-400" />
          </div>
        </motion.div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="glass metallic-border rounded-3xl p-4 flex flex-col items-center text-center">
            <Ring pct={WEAK.pct} />
            <p className="mt-3 font-display text-gold text-sm">🥇 الذهبية — أضعف مادة</p>
            <p className="text-silver-dim text-xs mt-0.5">{WEAK.name}</p>
          </div>
          <div className="glass metallic-border rounded-3xl p-4">
            <p className="font-display text-silver text-sm mb-2 text-center">الدرجات</p>
            <ul className="divide-y divide-[rgba(232,201,122,0.12)]">
              {GRADES.map((g) => (
                <li key={g.name} className="py-2 flex items-center justify-between">
                  <span className="text-xs text-silver-dim">{g.name}</span>
                  <span className="font-display text-silver text-sm">{g.grade}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ScreenTransition>
  );
}
