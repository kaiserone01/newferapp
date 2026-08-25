import React from "react";

export interface TarjetaProps extends React.HTMLAttributes<HTMLDivElement> {
  superficie?: "base" | "elevada";
  bordeColor?: "defecto" | "brass" | "teal" | "coral";
  children: React.ReactNode;
}

export const Tarjeta: React.FC<TarjetaProps> = ({
  superficie = "base",
  bordeColor = "defecto",
  className = "",
  children,
  ...props
}) => {
  const superficieClass =
    superficie === "elevada" ? "bg-[var(--ink-700)]" : "bg-[var(--ink-800)]";

  const bordeClasses = {
    defecto: "border-[var(--line)]",
    brass: "border-[var(--brass-400)]/40",
    teal: "border-[var(--teal-400)]/40",
    coral: "border-[var(--coral-400)]/40",
  };

  return (
    <div
      className={`rounded-[10px] border p-4 sm:p-6 ${superficieClass} ${bordeClasses[bordeColor]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
