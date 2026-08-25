import React from "react";

export interface InsigniaProps {
  variante?: "base" | "positivo" | "negativo" | "advertencia" | "brass" | "teal";
  children: React.ReactNode;
  className?: string;
}

export const Insignia: React.FC<InsigniaProps> = ({
  variante = "base",
  children,
  className = "",
}) => {
  const varianteClasses = {
    base: "bg-[var(--ink-700)] text-[var(--mist-400)] border-[var(--line)]",
    positivo: "bg-[var(--teal-600)]/20 text-[var(--teal-400)] border-[var(--teal-600)]/40",
    negativo: "bg-[var(--coral-400)]/20 text-[var(--coral-400)] border-[var(--coral-400)]/40",
    advertencia: "bg-[var(--amber-400)]/20 text-[var(--amber-400)] border-[var(--amber-400)]/40",
    brass: "bg-[var(--brass-600)]/20 text-[var(--brass-400)] border-[var(--brass-600)]/40",
    teal: "bg-[var(--teal-600)]/20 text-[var(--teal-400)] border-[var(--teal-600)]/40",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${varianteClasses[variante]} ${className}`}
    >
      {children}
    </span>
  );
};
