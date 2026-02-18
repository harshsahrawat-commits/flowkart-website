type DividerType =
  | "gradient-fade"
  | "gradient-fade-reverse"
  | "line"
  | "color-block";

interface SectionDividerProps {
  type?: DividerType;
  from?: string;
  to?: string;
  className?: string;
}

export default function SectionDivider({
  type = "gradient-fade",
  from,
  to,
  className = "",
}: SectionDividerProps) {
  if (type === "line") {
    return (
      <div className={`flex justify-center py-8 ${className}`} aria-hidden="true">
        <div className="h-px w-full max-w-4xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    );
  }

  if (type === "color-block") {
    return (
      <div
        className={`h-24 ${className}`}
        style={{
          background: `linear-gradient(to bottom, ${from || "var(--color-void)"}, ${to || "var(--color-void-subtle)"})`,
        }}
        aria-hidden="true"
      />
    );
  }

  if (type === "gradient-fade-reverse") {
    return (
      <div
        className={`h-24 ${className}`}
        style={{
          background: `linear-gradient(to bottom, ${from || "var(--color-void-subtle)"}, ${to || "var(--color-void)"})`,
        }}
        aria-hidden="true"
      />
    );
  }

  // gradient-fade (default)
  return (
    <div
      className={`h-24 ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${from || "var(--color-void)"}, ${to || "var(--color-void-subtle)"})`,
      }}
      aria-hidden="true"
    />
  );
}
