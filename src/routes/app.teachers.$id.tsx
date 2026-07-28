import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ScreenTransition } from "@/components/ScreenTransition";
import { TEACHERS } from "./app.teachers.index";

export const Route = createFileRoute("/app/teachers/$id")({
  component: Chat,
});

interface Msg {
  from: "teacher" | "me";
  text: string;
}

function Chat() {
  const { id } = useParams({ from: "/app/teachers/$id" });
  const teacher = TEACHERS.find((t) => t.id === id);
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "teacher", text: "مرحبًا، كيف يمكنني مساعدتك اليوم؟" },
    { from: "me", text: "لدي سؤال حول الدرس الأخير" },
  ]);
  const [text, setText] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [msgs]);

  function send() {
    if (!text.trim()) return;
    setMsgs((m) => [...m, { from: "me", text }]);
    setText("");
    setTimeout(
      () => setMsgs((m) => [...m, { from: "teacher", text: "تم استلام سؤالك، سأرد قريبًا." }]),
      800,
    );
  }

  return (
    <ScreenTransition>
      <div className="mx-auto flex min-h-[calc(100svh-11rem)] max-w-md flex-col px-4 pt-2">
        <header className="surface hairline mb-3 flex items-center gap-3 rounded-[24px] p-3">
          <Link
            to="/app/teachers"
            aria-label="رجوع إلى الأساتذة"
            className="bg-muted/70 grid h-9 w-9 shrink-0 place-items-center rounded-xl"
          >
            <ArrowRight className="text-brand h-4 w-4" />
          </Link>
          <div className="relative">
            <div className="bg-gradient-brand grid h-10 w-10 place-items-center rounded-xl font-display text-primary-foreground">
              {teacher?.name.split(" ")[1]?.[0] ?? "أ"}
            </div>
            {teacher?.online && (
              <span className="border-background bg-success absolute -bottom-0.5 -left-0.5 h-3 w-3 rounded-full border-2" />
            )}
          </div>
          <div className="flex-1 text-right">
            <p className="font-display text-foreground">{teacher?.name ?? "أستاذ"}</p>
            <p className="text-[11px] text-muted-foreground">
              {teacher?.subject}
              {teacher?.online ? " — متاح الآن" : ""}
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col justify-end space-y-3 px-1 py-2">
          {msgs.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className={`flex ${m.from === "me" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[78%] px-4 py-2.5 text-sm ${
                  m.from === "me"
                    ? "bg-gradient-brand shadow-brand rounded-[20px] rounded-br-md text-primary-foreground"
                    : "surface hairline rounded-[20px] rounded-bl-md text-foreground"
                }`}
              >
                {m.text}
              </div>
            </motion.div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="surface-strong hairline mt-2 flex items-center gap-2 rounded-[24px] p-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="اكتب رسالتك..."
            aria-label="نص الرسالة"
            className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={send}
            aria-label="إرسال"
            className="bg-gradient-brand shadow-brand grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
          >
            <Send className="h-5 w-5 rotate-180 text-primary-foreground" />
          </motion.button>
        </div>
      </div>
    </ScreenTransition>
  );
}
