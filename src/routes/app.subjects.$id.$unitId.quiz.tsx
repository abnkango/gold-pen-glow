import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowRight, ListChecks, Timer, Trophy } from "lucide-react";
import { GoldButton } from "@/components/GoldButton";
import { ScreenHeader } from "@/components/ScreenHeader";
import { ScreenTransition } from "@/components/ScreenTransition";

export const Route = createFileRoute("/app/subjects/$id/$unitId/quiz")({
  component: Quiz,
});

const STATS = [
  { Icon: ListChecks, value: "20", label: "سؤالًا" },
  { Icon: Timer, value: "30", label: "دقيقة" },
  { Icon: Trophy, value: "60%", label: "حد النجاح" },
];

function Quiz() {
  const { id } = useParams({ from: "/app/subjects/$id/$unitId/quiz" });

  return (
    <ScreenTransition>
      <div className="mx-auto max-w-md px-5 pt-6">
        <ScreenHeader
          align="start"
          title="اختبار الوحدة"
          subtitle="جاهز للتحدي؟"
          action={
            <Link
              to="/app/subjects/$id"
              params={{ id }}
              aria-label="رجوع إلى الوحدات"
              className="surface hairline grid h-10 w-10 place-items-center rounded-2xl"
            >
              <ArrowRight className="text-brand h-4 w-4" />
            </Link>
          }
        />

        <div className="surface-strong hairline space-y-5 rounded-[28px] p-6 text-center">
          <div className="bg-gradient-brand shadow-brand mx-auto grid h-20 w-20 place-items-center rounded-[26px]">
            <Trophy className="h-9 w-9 text-primary-foreground" />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {STATS.map(({ Icon, value, label }) => (
              <div key={label} className="bg-muted/60 rounded-2xl px-2 py-3">
                <Icon className="text-brand mx-auto h-4 w-4" />
                <p className="mt-1.5 font-display text-base text-foreground">{value}</p>
                <p className="text-[11px] text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">ستظهر نتيجتك فور انتهاء الاختبار</p>
          <GoldButton>بدء الاختبار</GoldButton>
        </div>
      </div>
    </ScreenTransition>
  );
}
