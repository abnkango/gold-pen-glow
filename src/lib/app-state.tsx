import { createContext, useContext, useState, type ReactNode } from "react";

type Branch = "scientific" | "literary" | "ninth" | null;

interface AppState {
  username: string;
  phone: string;
  branch: Branch;
  setUsername: (v: string) => void;
  setPhone: (v: string) => void;
  setBranch: (b: Branch) => void;
}

const Ctx = createContext<AppState | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState("الطالب");
  const [phone, setPhone] = useState("");
  const [branch, setBranch] = useState<Branch>(null);
  return (
    <Ctx.Provider value={{ username, phone, branch, setUsername, setPhone, setBranch }}>
      {children}
    </Ctx.Provider>
  );
}

export function useAppState() {
  const v = useContext(Ctx);
  if (!v) throw new Error("AppStateProvider missing");
  return v;
}

export const BRANCHES: { id: Exclude<Branch, null>; name: string; icon: string }[] = [
  { id: "scientific", name: "بكلوريا علمي", icon: "🔬" },
  { id: "literary", name: "بكلوريا أدبي", icon: "📜" },
  { id: "ninth", name: "التاسع", icon: "🎓" },
];
