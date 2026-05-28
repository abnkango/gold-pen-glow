import { createFileRoute } from "@tanstack/react-router";
import { useAppState, BRANCHES } from "@/lib/app-state";
import { AdminPage, StatCard } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { content } = useAppState();
  return (
    <AdminPage title="نظرة عامة" subtitle="ملخّص محتوى المنصة">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="الطلاب المسجلون" value={content.students.length} icon="🎓" />
        <StatCard label="الأساتذة" value={content.teachers.length} icon="👨‍🏫" />
        <StatCard label="إجمالي الدروس" value={content.lessons.length} icon="📖" />
        <StatCard label="الكتب PDF" value={content.books.length} icon="📕" />
      </div>

      <div className="mt-8">
        <h2 className="font-display text-lg text-silver mb-3">المحتوى لكل فرع</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BRANCHES.map((b) => {
            const subjects = content.subjects.filter((s) => s.branch === b.id);
            const unitIds = content.units.filter((u) => subjects.some((s) => s.id === u.subjectId)).map((u) => u.id);
            const lessons = content.lessons.filter((l) => unitIds.includes(l.unitId));
            return (
              <div key={b.id} className="glass-strong rounded-3xl p-5 metallic-border">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{b.icon}</span>
                  <h3 className="font-display text-gold">{b.name}</h3>
                </div>
                <div className="mt-4 grid grid-cols-3 text-center">
                  <div>
                    <div className="text-xl font-display text-silver">{subjects.length}</div>
                    <div className="text-[10px] text-silver-dim">مواد</div>
                  </div>
                  <div>
                    <div className="text-xl font-display text-silver">{unitIds.length}</div>
                    <div className="text-[10px] text-silver-dim">وحدات</div>
                  </div>
                  <div>
                    <div className="text-xl font-display text-silver">{lessons.length}</div>
                    <div className="text-[10px] text-silver-dim">دروس</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminPage>
  );
}
