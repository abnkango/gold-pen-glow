import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState, BRANCHES, type Branch } from "@/lib/app-state";
import { AdminPage, AdminButton, AdminInput } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/teachers")({
  component: Teachers,
});

function Teachers() {
  const { content, addTeacher, deleteTeacher, updateTeacher } = useAppState();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [branch, setBranch] = useState<Branch>("scientific");

  return (
    <AdminPage title="الأساتذة" subtitle="إدارة قائمة الأساتذة وحالة التواصل">
      <div className="glass-strong rounded-3xl p-5 mb-6 metallic-border">
        <h3 className="font-display text-gold mb-4">إضافة أستاذ جديد</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <AdminInput value={name} onChange={setName} placeholder="اسم الأستاذ" />
          <AdminInput value={bio} onChange={setBio} placeholder="نبذة قصيرة" />
          <select
            value={branch}
            onChange={(e) => setBranch(e.target.value as Branch)}
            className="rounded-2xl bg-black/40 border border-[rgba(232,201,122,0.22)] px-4 py-2.5 text-silver text-sm outline-none focus:border-[rgba(232,201,122,0.6)]"
          >
            {BRANCHES.map((b) => <option key={b.id} value={b.id} className="bg-black">{b.name}</option>)}
          </select>
          <AdminButton onClick={() => {
            if (!name.trim()) return;
            addTeacher({ name: name.trim(), bio, branch, subjectIds: [], online: true });
            setName(""); setBio("");
          }}>
            + إضافة
          </AdminButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.teachers.length === 0 && (
          <div className="col-span-full text-center text-silver-dim py-12">لا يوجد أساتذة بعد</div>
        )}
        {content.teachers.map((t) => (
          <div key={t.id} className="glass-strong rounded-3xl p-5 metallic-border">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gold-soft flex items-center justify-center font-display text-gold text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="font-display text-silver">{t.name}</div>
                  <div className="text-xs text-silver-dim">{BRANCHES.find((b) => b.id === t.branch)?.name}</div>
                </div>
              </div>
              <button
                onClick={() => updateTeacher(t.id, { online: !t.online })}
                className={`text-[10px] px-2 py-1 rounded-full font-display ${
                  t.online ? "bg-emerald-500/20 text-emerald-300" : "bg-white/5 text-silver-dim"
                }`}
              >
                {t.online ? "متاح" : "غير متاح"}
              </button>
            </div>
            {t.bio && <p className="mt-3 text-xs text-silver-dim">{t.bio}</p>}
            <div className="mt-4 flex justify-end">
              <button onClick={() => deleteTeacher(t.id)} className="text-xs text-red-300/80 hover:text-red-300">حذف</button>
            </div>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
