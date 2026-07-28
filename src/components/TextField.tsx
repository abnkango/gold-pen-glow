import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type ComponentType, type InputHTMLAttributes } from "react";
import { FieldError } from "@/components/auth/FieldError";
import { cn } from "@/lib/utils";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label: string;
  value: string;
  onValueChange: (v: string) => void;
  icon?: ComponentType<{ className?: string }>;
  error?: string;
  prefix?: string;
}

export function TextField({
  label,
  value,
  onValueChange,
  icon: Icon,
  error,
  prefix,
  type = "text",
  className,
  ...rest
}: Props) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && revealed ? "text" : type;

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block px-1 text-xs text-muted-foreground">
        {label}
      </label>
      <div
        className={cn(
          "bg-input flex items-stretch gap-2 rounded-2xl border transition-all duration-300",
          "focus-within:border-border-strong focus-within:shadow-brand",
          error ? "border-destructive/60" : "border-border",
        )}
      >
        {Icon && (
          <span className="grid w-10 shrink-0 place-items-center text-muted-foreground">
            <Icon className="h-4 w-4" />
          </span>
        )}
        {prefix && (
          <span
            dir="ltr"
            className="border-border text-brand flex items-center border-l px-3 font-display text-sm"
          >
            {prefix}
          </span>
        )}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          aria-invalid={!!error}
          className={cn(
            "min-w-0 flex-1 bg-transparent py-3 text-foreground outline-none placeholder:text-muted-foreground/60",
            !Icon && !prefix && "px-4",
            className,
          )}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
            className="no-tap grid w-11 shrink-0 place-items-center text-muted-foreground transition-colors hover:text-brand"
          >
            {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      <FieldError message={error} />
    </div>
  );
}
