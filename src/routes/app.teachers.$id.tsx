import { createFileRoute, useParams } from "@tanstack/react-router";
import { ScreenTransition } from "@/components/ScreenTransition";
import { TEACHERS } from "./app.teachers.index";
import { useState } from "react";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

export const Route = createFileRoute("/app/teachers/$id")({
  component: Chat,
});

interface Msg { from: "teacher" | "me"; text: string }

function Chat() {
  const { id } = useParams({ from: "/app/teachers/$id" });
  const teacher = TEACHERS.find((t) => t.id === id);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "teacher", text: "مرحبًا، كيف يمكنني مساعدتك اليوم؟" },
    { from: "me", text: "لدي سؤال حول الدرس الأخير" },
  ]);
  const [text, setText] = useState("");

  function send() {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setText("");
    setTimeout(() => setMsgs((m) => [...m, { from: "teacher", text: "تم استلام سؤالك، سأرد قريبًا." }]), 800);
  }

  return (
    <ScreenTransition>
      <div className="flex flex-col h-[calc(100vh-7rem)] max-w-md mx-auto">
        <div className="px-5 pt-10 pb-4 text-center border-b border-[rgba(232,201,122,0.15)]">
          <p className="font-display text-gold text-lg">{teacher?.name}</p>
          <p className="text-silver-dim text-xs">{teacher?.subject}</p>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.from === "me" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "bg-[linear-gradient(135deg,rgba(232,201,122,0.25),rgba(201,168,76,0.1))] border border-[rgba(232,201,122,0.4)] text-gold"
                    : "bg-white/5 border border-white/10 text-silver"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="px-3 pb-3 pt-2 flex items-center gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="اكتب رسالتك..."
            className="flex-1 rounded-2xl bg-black/50 border border-[rgba(232,201,122,0.25)] px-4 py-3 outline-none text-silver placeholder:text-silver-dim/60 focus:border-[rgba(232,201,122,0.7)] focus:shadow-gold transition"
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={send}
            className="w-12 h-12 rounded-2xl bg-gold flex items-center justify-center shadow-gold"
          >
            <Send className="w-5 h-5 text-primary-foreground rotate-180" />
          </motion.button>
        </div>
      </div>
    </ScreenTransition>
  );
}
