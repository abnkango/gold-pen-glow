import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useAppState, BRANCHES, type Branch } from "@/lib/app-state";
import { AdminPage, AdminButton, AdminInput } from "@/components/admin/AdminPage";

export const Route = createFileRoute("/admin/books")({
  component: Books,
});

function Books() {
  const { content, addBook, deleteBook } = useAppState();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState<Branch>("scientific");
  const [subjectId, setSubjectId] = useState<string>("");

  const branchSubjects = content.subjects.filter((s) => s.branch === branch);

  return (
    <AdminPage title="الكتب (PDF)" subtitle="ارفع كتب المنهج لكل فرع ومادة">
      <div className="glass-strong rounded-3xl p-5 mb-6 metallic-border">
        <h3 className="font-display text-gold mb-4">إضافة كتاب جديد</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <AdminInput value={name} onChange={setName} placeholder="اسم الكتاب الظاهر" />
          <select
            value={branch}
            onChange={(e) => { setBranch(e.target.value as Branch); setSubjectId(""); }}
            className="rounded-2xl bg-black/40 border border-[rgba(232,201,122,0.22)] px-4 py-2.5 text-silver text-sm outline-none"
          >
            {BRANCHES.map((b) => <option key={b.id} value={b.id} className="bg-black">{b.name}</option>)}
          </select>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="rounded-2xl bg-black/40 border border-[rgba(232,201,122,0.22)] px-4 py-2.5 text-silver text-sm outline-none"
          >
            <option value="" className="bg-black">كل المواد</option>
            {branchSubjects.map((s) => <option key={s.id} value={s.id} className="bg-black">{s.name}</option>)}
          </select>
          <AdminButton onClick={() => {
            if (!name.trim()) return;
            // placeholder key — to be replaced by R2 upload result
            addBook({ name: name.trim(), branch, subjectId: subjectId || undefined, key: `placeholder/${Date.now()}.pdf` });
            setName("");
          }}>
            + إضافة
          </AdminButton>
        </div>
        <p className="mt-3 text-[10px] text-silver-dim">
          ملاحظة: الرفع الفعلي لـ Cloudflare R2 يتم تفعيله بعد إضافة بيانات الاعتماد.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.books.length === 0 && (
          <div className="col-span-full text-center text-silver-dim py-12">لا يوجد كتب بعد</div>
        )}
        {content.books.map((b) => (
          <div key={b.id} className="glass-strong rounded-3xl p-5 metallic-border flex items-center gap-3">
            <span className="text-3xl">📕</span>
            <div className="flex-1 min-w-0">
              <div className="font-display text-silver truncate">{b.name}</div>
              <div className="text-[10px] text-silver-dim mt-1">
                {BRANCHES.find((x) => x.id === b.branch)?.name}
                {b.subjectId && ` · ${content.subjects.find((s) => s.id === b.subjectId)?.name ?? ""}`}
              </div>
            </div>
            <button onClick={() => deleteBook(b.id)} className="text-xs text-red-300/80 hover:text-red-300">حذف</button>
          </div>
        ))}
      </div>
    </AdminPage>
  );
}
