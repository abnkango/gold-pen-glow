import { createFileRoute, Link, Outlet, useChildMatches, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, HelpCircle, Layers, PlayCircle } from "lucide-react";
import { GoldButton } from "@/components/GoldButton";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";
import { useAppState } from "@/lib/app-state";

export const Route = createFileRoute("/app/subjects/$id")({
  component: Units,
});

function Units() {
  const { id } = useParams({ from: "/app/subjects/$id" });
  const { content } = useAppState();
  // شاشات الدروس والاختبار مسارات فرعية لهذا المسار
  const hasChildRoute = useChildMatches().length > 0;
  const subject = content.subjects.find((s) => s.id === id);
  const units = content.units
    .filter((u) => u.subjectId === id)
    .sort((a, b) => a.order - b.order)
    .map((u) => ({
      id: u.id,
      title: u.name,
      lessons: content.lessons.filter((l) => l.unitId === u.id && l.visible).length,
    }));

  if (hasChildRoute) return <Outlet />;

  return (
    <ScreenTransition>
      <div className="mx-auto max-w-md px-5 pt-6">
        <ScreenHeader
          align="start"
          title={subject?.name ?? "المادة"}
          subtitle="اختر وحدة للبدء"
          action={
            <Link
              to="/app/subjects"
              aria-label="رجوع إلى المواد"
              className="surface hairline grid h-10 w-10 place-items-center rounded-2xl"
            >
              <ArrowRight className="text-brand h-4 w-4" />
            </Link>
          }
        />

        {units.length === 0 ? (
          <div className="surface hairline mt-4 flex flex-col items-center rounded-[26px] p-10 text-center">
            <Layers className="mb-3 h-12 w-12 text-muted-foreground" strokeWidth={1.2} />
            <p className="font-display text-foreground">لا توجد وحدات بعد</p>
            <p className="mt-1 text-xs text-muted-foreground">سيتم إضافتها قريبًا لهذه المادة.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {units.map((u, i) => (
              <motion.article
                key={u.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="surface hairline rounded-[26px] p-5"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-gradient-brand shadow-brand grid h-10 w-10 shrink-0 place-items-center rounded-2xl font-display text-primary-foreground">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-display text-lg text-foreground">{u.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {u.lessons > 0 ? `${u.lessons} درس` : "لا دروس بعد"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link to="/app/subjects/$id/$unitId/lessons" params={{ id, unitId: u.id }}>
                    <GoldButton variant="outline" size="sm">
                      <PlayCircle className="h-4 w-4" />
                      الدروس
                    </GoldButton>
                  </Link>
                  <Link to="/app/subjects/$id/$unitId/quiz" params={{ id, unitId: u.id }}>
                    <GoldButton variant="success" size="sm">
                      <HelpCircle className="h-4 w-4" />
                      اختبار الوحدة
                    </GoldButton>
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </ScreenTransition>
  );
}
