import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState, BRANCHES } from "@/lib/app-state";
import { AdminPage, AdminInput, StatCard } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/students")({
  component: Students,
});

function Students() {
  const { content } = useAppState();
  const [q, setQ] = useState("");
  const filtered = content.students.filter((s) =>
    s.name.toLowerCase().includes(q.toLowerCase()) || s.phone.includes(q),
  );

  return (
    <AdminPage title="الطلاب" subtitle="قائمة جميع الحسابات المسجلة">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="إجمالي الحسابات" value={content.students.length} icon="🎓" />
        {BRANCHES.map((b) => (
          <StatCard
            key={b.id}
            label={b.name}
            value={content.students.filter((s) => s.branch === b.id).length}
            icon={b.icon}
          />
        ))}
      </div>

      <div className="mb-4 max-w-sm">
        <AdminInput value={q} onChange={setQ} placeholder="🔍 ابحث بالاسم أو رقم الهاتف..." />
      </div>

      <div className="glass-strong rounded-3xl overflow-hidden metallic-border">
        <table className="w-full text-sm">
          <thead className="bg-black/40">
            <tr className="text-right text-silver-dim text-xs">
              <th className="px-4 py-3 font-display">الاسم</th>
              <th className="px-4 py-3 font-display">الهاتف</th>
              <th className="px-4 py-3 font-display">الفرع</th>
              <th className="px-4 py-3 font-display">تاريخ التسجيل</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={4} className="text-center text-silver-dim py-10">لا يوجد طلاب مسجلون بعد</td></tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="border-t border-[rgba(232,201,122,0.1)] text-silver">
                <td className="px-4 py-3 font-display">{s.name}</td>
                <td className="px-4 py-3" dir="ltr">+963{s.phone}</td>
                <td className="px-4 py-3">{BRANCHES.find((b) => b.id === s.branch)?.name}</td>
                <td className="px-4 py-3 text-silver-dim text-xs">{new Date(s.joinedAt).toLocaleDateString("ar")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminPage>
  );
}
