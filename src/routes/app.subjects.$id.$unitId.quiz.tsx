import { createFileRoute } from "@tanstack/react-router";
import { ScreenTransition } from "@/components/ScreenTransition";
import { ScreenHeader } from "@/components/ScreenHeader";
import { GoldButton } from "@/components/GoldButton";

export const Route = createFileRoute("/app/subjects/$id/$unitId/quiz")({
  component: Quiz,
});

function Quiz() {
  return (
    <ScreenTransition>
      <div className="px-5 pt-10 max-w-md mx-auto">
        <ScreenHeader title="اختبار الوحدة" subtitle="جاهز للتحدي؟" />
        <div className="glass-strong metallic-border rounded-3xl p-6 text-center space-y-4">
          <div className="text-6xl">📝</div>
          <p className="font-display text-silver">20 سؤالًا — 30 دقيقة</p>
          <p className="text-silver-dim text-sm">ستظهر نتيجتك فور انتهاء الاختبار</p>
          <GoldButton>بدء الاختبار</GoldButton>
        </div>
      </div>
    </ScreenTransition>
  );
}
