import React from "react";

export interface BotonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primario" | "secundario" | "fantasma" | "brass" | "teal";
  tamano?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Boton: React.FC<BotonProps> = ({
  variante = "primario",
  tamano = "md",
  className = "",
  children,
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-sm border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--ink-900)] disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const tmanosClasses = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const variantesClasses = {
    primario:
      "bg-[var(--teal-400)] text-[var(--ink-900)] border-transparent hover:bg-[#3db8ac] active:bg-[#349e93] focus:ring-[var(--teal-400)] font-semibold",
    secundario:
      "bg-[var(--ink-800)] text-[var(--mist-100)] border-[var(--line)] hover:bg-[var(--ink-700)] hover:border-[var(--mist-600)] focus:ring-[var(--mist-400)]",
    fantasma:
      "bg-transparent text-[var(--mist-400)] border-transparent hover:text-[var(--mist-100)] hover:bg-[var(--ink-800)] focus:ring-[var(--mist-400)]",
    brass:
      "bg-[var(--brass-400)] text-[var(--ink-900)] border-transparent hover:bg-[#c9a35b] focus:ring-[var(--brass-400)] font-semibold",
    teal:
      "bg-[var(--teal-400)] text-[var(--ink-900)] border-transparent hover:bg-[#3db8ac] focus:ring-[var(--teal-400)] font-semibold",
  };

  return (
    <button
      className={`${baseClasses} ${tmanosClasses[tamano]} ${variantesClasses[variante]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
