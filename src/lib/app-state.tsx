import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Branch = "scientific" | "literary" | "ninth";

export const ADMIN_PHONE = "952191009"; // 00963952191009 بدون مفتاح الدولة

export interface Subject {
  id: string;
  branch: Branch;
  name: string;
  icon: string;
  order: number;
  visible: boolean;
}
export interface Unit {
  id: string;
  subjectId: string;
  name: string;
  order: number;
}
export interface Lesson {
  id: string;
  unitId: string;
  name: string;
  order: number;
  videoUid?: string; // Cloudflare Stream UID
  pdfs: { id: string; name: string; key: string }[];
  quiz?: { id: string; question: string; choices: string[]; answer: number }[];
  visible: boolean;
}
export interface Teacher {
  id: string;
  name: string;
  branch: Branch;
  subjectIds: string[];
  bio: string;
  avatar?: string;
  online: boolean;
}
export interface Book {
  id: string;
  branch: Branch;
  subjectId?: string;
  name: string;
  key: string; // R2 key (placeholder)
}
export interface Student {
  id: string;
  name: string;
  phone: string;
  branch: Branch;
  joinedAt: number;
}

interface ContentStore {
  subjects: Subject[];
  units: Unit[];
  lessons: Lesson[];
  teachers: Teacher[];
  books: Book[];
  students: Student[];
}

interface AppState {
  username: string;
  phone: string;
  branch: Branch | null;
  isAdmin: boolean;
  setUsername: (v: string) => void;
  setPhone: (v: string) => void;
  setBranch: (b: Branch | null) => void;
  content: ContentStore;
  // CRUD
  addSubject: (s: Omit<Subject, "id">) => void;
  updateSubject: (id: string, patch: Partial<Subject>) => void;
  deleteSubject: (id: string) => void;
  addUnit: (u: Omit<Unit, "id">) => void;
  updateUnit: (id: string, patch: Partial<Unit>) => void;
  deleteUnit: (id: string) => void;
  addLesson: (l: Omit<Lesson, "id" | "pdfs">) => void;
  updateLesson: (id: string, patch: Partial<Lesson>) => void;
  deleteLesson: (id: string) => void;
  addTeacher: (t: Omit<Teacher, "id">) => void;
  updateTeacher: (id: string, patch: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  addBook: (b: Omit<Book, "id">) => void;
  deleteBook: (id: string) => void;
}

const Ctx = createContext<AppState | null>(null);
const STORAGE_KEY = "waraqa_content_v1";
const uid = () => Math.random().toString(36).slice(2, 10);

const seed: ContentStore = {
  subjects: [
    { id: "s_math", branch: "scientific", name: "الرياضيات", icon: "📐", order: 1, visible: true },
    { id: "s_phys", branch: "scientific", name: "الفيزياء", icon: "⚛️", order: 2, visible: true },
    { id: "s_ar", branch: "literary", name: "اللغة العربية", icon: "📖", order: 1, visible: true },
  ],
  units: [
    { id: "u_1", subjectId: "s_math", name: "الفصل الأول", order: 1 },
  ],
  lessons: [
    { id: "l_1", unitId: "u_1", name: "مقدمة في التفاضل", order: 1, pdfs: [], visible: true },
  ],
  teachers: [
    { id: "t_1", name: "أ. محمد العلي", branch: "scientific", subjectIds: ["s_math"], bio: "خبرة 15 سنة", online: true },
  ],
  books: [],
  students: [],
};

function loadContent(): ContentStore {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seed;
}

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState("الطالب");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState<Branch | null>(null);
  const [content, setContent] = useState<ContentStore>(seed);

  useEffect(() => { setContent(loadContent()); }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(content)); } catch {}
    }
  }, [content]);

  const isAdmin = phone.replace(/\D/g, "") === ADMIN_PHONE;

  const value: AppState = {
    username, phone, branch, isAdmin,
    setUsername, setPhone, setBranch,
    content,
    addSubject: (s) => setContent((c) => ({ ...c, subjects: [...c.subjects, { ...s, id: uid() }] })),
    updateSubject: (id, patch) => setContent((c) => ({ ...c, subjects: c.subjects.map((x) => x.id === id ? { ...x, ...patch } : x) })),
    deleteSubject: (id) => setContent((c) => ({
      ...c,
      subjects: c.subjects.filter((x) => x.id !== id),
      units: c.units.filter((u) => u.subjectId !== id),
      lessons: c.lessons.filter((l) => !c.units.some((u) => u.subjectId === id && u.id === l.unitId)),
    })),
    addUnit: (u) => setContent((c) => ({ ...c, units: [...c.units, { ...u, id: uid() }] })),
    updateUnit: (id, patch) => setContent((c) => ({ ...c, units: c.units.map((x) => x.id === id ? { ...x, ...patch } : x) })),
    deleteUnit: (id) => setContent((c) => ({
      ...c,
      units: c.units.filter((x) => x.id !== id),
      lessons: c.lessons.filter((l) => l.unitId !== id),
    })),
    addLesson: (l) => setContent((c) => ({ ...c, lessons: [...c.lessons, { ...l, id: uid(), pdfs: [] }] })),
    updateLesson: (id, patch) => setContent((c) => ({ ...c, lessons: c.lessons.map((x) => x.id === id ? { ...x, ...patch } : x) })),
    deleteLesson: (id) => setContent((c) => ({ ...c, lessons: c.lessons.filter((x) => x.id !== id) })),
    addTeacher: (t) => setContent((c) => ({ ...c, teachers: [...c.teachers, { ...t, id: uid() }] })),
    updateTeacher: (id, patch) => setContent((c) => ({ ...c, teachers: c.teachers.map((x) => x.id === id ? { ...x, ...patch } : x) })),
    deleteTeacher: (id) => setContent((c) => ({ ...c, teachers: c.teachers.filter((x) => x.id !== id) })),
    addBook: (b) => setContent((c) => ({ ...c, books: [...c.books, { ...b, id: uid() }] })),
    deleteBook: (id) => setContent((c) => ({ ...c, books: c.books.filter((x) => x.id !== id) })),
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("AppStateProvider missing");
  return v;
}

export const BRANCHES: { id: Branch; name: string; icon: string }[] = [
  { id: "scientific", name: "بكلوريا علمي", icon: "🔬" },
  { id: "literary", name: "بكلوريا أدبي", icon: "📜" },
  { id: "ninth", name: "التاسع", icon: "🎓" },
];
