import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState, BRANCHES, type Branch } from "@/lib/app-state";
import { AdminPage, AdminButton, AdminInput } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/content")({
  component: ContentManager,
});

function ContentManager() {
  const [branch, setBranch] = useState<Branch>("scientific");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const {
    content, addSubject, deleteSubject, addUnit, deleteUnit, addLesson, deleteLesson, updateLesson,
  } = useAppState();

  const subjects = content.subjects.filter((s) => s.branch === branch).sort((a, b) => a.order - b.order);
  const units = selectedSubject ? content.units.filter((u) => u.subjectId === selectedSubject).sort((a, b) => a.order - b.order) : [];
  const lessons = selectedUnit ? content.lessons.filter((l) => l.unitId === selectedUnit).sort((a, b) => a.order - b.order) : [];

  return (
    <AdminPage title="المحتوى التعليمي" subtitle="إدارة المواد والوحدات والدروس لكل فرع">
      {/* Branch tabs */}
      <div className="flex gap-2 mb-6">
        {BRANCHES.map((b) => (
          <button
            key={b.id}
            onClick={() => { setBranch(b.id); setSelectedSubject(null); setSelectedUnit(null); }}
            className={`px-5 py-2.5 rounded-2xl text-sm font-display transition ${
              branch === b.id
                ? "bg-gold-soft text-gold border border-[rgba(232,201,122,0.4)] shadow-gold"
                : "bg-white/[0.03] text-silver-dim border border-transparent hover:text-silver"
            }`}
          >
            <span className="ml-2">{b.icon}</span>{b.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Subjects */}
        <Panel
          title="المواد"
          onAdd={(name) => addSubject({ branch, name, icon: "📘", order: subjects.length + 1, visible: true })}
        >
          {subjects.length === 0 && <Empty msg="لا يوجد مواد" />}
          {subjects.map((s) => (
            <Row
              key={s.id}
              active={selectedSubject === s.id}
              onClick={() => { setSelectedSubject(s.id); setSelectedUnit(null); }}
              onDelete={() => { deleteSubject(s.id); if (selectedSubject === s.id) setSelectedSubject(null); }}
            >
              <span className="text-lg">{s.icon}</span>
              <span className="flex-1">{s.name}</span>
            </Row>
          ))}
        </Panel>

        {/* Units */}
        <Panel
          title="الوحدات"
          disabled={!selectedSubject}
          onAdd={(name) => selectedSubject && addUnit({ subjectId: selectedSubject, name, order: units.length + 1 })}
        >
          {!selectedSubject && <Empty msg="اختر مادة" />}
          {selectedSubject && units.length === 0 && <Empty msg="لا يوجد وحدات" />}
          {units.map((u) => (
            <Row
              key={u.id}
              active={selectedUnit === u.id}
              onClick={() => setSelectedUnit(u.id)}
              onDelete={() => { deleteUnit(u.id); if (selectedUnit === u.id) setSelectedUnit(null); }}
            >
              <span className="flex-1">{u.name}</span>
            </Row>
          ))}
        </Panel>

        {/* Lessons */}
        <Panel
          title="الدروس"
          disabled={!selectedUnit}
          onAdd={(name) => selectedUnit && addLesson({ unitId: selectedUnit, name, order: lessons.length + 1, visible: true })}
        >
          {!selectedUnit && <Empty msg="اختر وحدة" />}
          {selectedUnit && lessons.length === 0 && <Empty msg="لا يوجد دروس" />}
          {lessons.map((l) => (
            <div key={l.id} className="glass rounded-2xl p-3">
              <div className="flex items-center gap-2">
                <span className="flex-1 text-sm text-silver font-display">{l.name}</span>
                <button onClick={() => deleteLesson(l.id)} className="text-xs text-red-300/80 hover:text-red-300">حذف</button>
              </div>
              <div className="mt-3 space-y-2">
                <div>
                  <label className="text-[10px] text-silver-dim block mb-1">Cloudflare Stream UID</label>
                  <AdminInput
                    value={l.videoUid ?? ""}
                    onChange={(v) => updateLesson(l.id, { videoUid: v })}
                    placeholder="مثال: abc123xyz..."
                  />
                </div>
                <div className="text-[10px] text-silver-dim">
                  📎 {l.pdfs.length} ملفات PDF · {l.quiz?.length ?? 0} سؤال
                </div>
              </div>
            </div>
          ))}
        </Panel>
      </div>
    </AdminPage>
  );
}

function Panel({
  title, children, onAdd, disabled,
}: { title: string; children: React.ReactNode; onAdd?: (name: string) => void; disabled?: boolean }) {
  const [name, setName] = useState("");
  return (
    <div className="glass-strong rounded-3xl p-4 metallic-border flex flex-col min-h-[400px]">
      <h3 className="font-display text-gold mb-3 px-1">{title}</h3>
      {onAdd && (
        <div className="flex gap-2 mb-3">
          <AdminInput value={name} onChange={setName} placeholder={`اسم ${title.slice(0, -1)}...`} />
          <AdminButton
            onClick={() => { if (!disabled && name.trim()) { onAdd(name.trim()); setName(""); } }}
          >
            +
          </AdminButton>
        </div>
      )}
      <div className="flex-1 space-y-2 overflow-y-auto">{children}</div>
    </div>
  );
}

function Row({
  children, active, onClick, onDelete,
}: { children: React.ReactNode; active?: boolean; onClick?: () => void; onDelete?: () => void }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2.5 rounded-2xl cursor-pointer transition text-sm text-silver ${
        active ? "bg-gold-soft border border-[rgba(232,201,122,0.4)]" : "bg-white/[0.03] hover:bg-white/[0.06]"
      }`}
      onClick={onClick}
    >
      {children}
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-xs text-red-300/80 hover:text-red-300"
        >
          حذف
        </button>
      )}
    </div>
  );
}

function Empty({ msg }: { msg: string }) {
  return <div className="text-center text-xs text-silver-dim py-10">{msg}</div>;
}
