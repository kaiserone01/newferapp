import React from "react";

export interface SeparadorProps {
  orientacion?: "horizontal" | "vertical";
  className?: string;
}

export const Separador: React.FC<SeparadorProps> = ({
  orientacion = "horizontal",
  className = "",
}) => {
  if (orientacion === "vertical") {
    return <div className={`w-[1px] bg-[var(--line)] self-stretch ${className}`} />;
  }
  return <div className={`h-[1px] w-full bg-[var(--line)] my-4 ${className}`} />;
};
