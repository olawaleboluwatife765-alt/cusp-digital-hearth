import { useCallback, useEffect, useState, type ReactNode } from "react";
import { X } from "lucide-react";
import { CButton, Card, SectionLabel } from "./primitives";
import { cn } from "@/lib/utils";

export type TipId =
  | "wallet-created"
  | "welcome-stacks"
  | "phrase-security"
  | "connect-review"
  | "assets-empty";

const KEY = (id: TipId) => `cusp.tip.${id}`;

/** Each tip shows once per wallet; dismissal is remembered locally. */
export function useTip(id: TipId) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(window.localStorage.getItem(KEY(id)) !== "dismissed");
    } catch {
      setVisible(true);
    }
  }, [id]);

  const dismiss = useCallback(() => {
    try {
      window.localStorage.setItem(KEY(id), "dismissed");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }, [id]);

  return { visible, dismiss };
}

export function TipCard({
  id,
  label = "Cusp tip",
  title,
  body,
  action,
  onAction,
  className,
  icon,
}: {
  id: TipId;
  label?: string;
  title: string;
  body: string;
  action?: string;
  onAction?: () => void;
  className?: string;
  icon?: ReactNode;
}) {
  const { visible, dismiss } = useTip(id);
  if (!visible) return null;
  return (
    <Card ticks className={cn("animate-rise relative p-5", className)}>
      <button
        onClick={dismiss}
        aria-label="Dismiss tip"
        className="press absolute top-3.5 right-3.5 text-muted-foreground hover:text-foreground"
      >
        <X className="size-3.5" strokeWidth={1.6} />
      </button>
      <div className="flex items-center gap-2">
        {icon}
        <SectionLabel>{label}</SectionLabel>
      </div>
      <h3 className="mt-3 pr-6 text-base font-medium tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>
      {action && (
        <CButton
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            onAction?.();
            dismiss();
          }}
        >
          {action}
        </CButton>
      )}
    </Card>
  );
}

export function TipBanner({ id, children }: { id: TipId; children: ReactNode }) {
  const { visible, dismiss } = useTip(id);
  if (!visible) return null;
  return (
    <div className="animate-rise flex items-start gap-2 rounded-xl border border-gold/40 bg-gold-soft/30 px-3.5 py-2.5">
      <p className="flex-1 text-xs leading-relaxed text-foreground/75">{children}</p>
      <button
        onClick={dismiss}
        aria-label="Dismiss tip"
        className="press mt-0.5 text-muted-foreground hover:text-foreground"
      >
        <X className="size-3.5" strokeWidth={1.6} />
      </button>
    </div>
  );
}