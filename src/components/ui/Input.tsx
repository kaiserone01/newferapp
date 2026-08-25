import React, { useId } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  etiqueta?: string;
  ayuda?: string;
  error?: string;
  prefijo?: string;
  sufijo?: string;
}

export const Input: React.FC<InputProps> = ({
  etiqueta,
  ayuda,
  error,
  prefijo,
  sufijo,
  className = "",
  id,
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {etiqueta && (
        <label htmlFor={inputId} className="text-xs font-medium text-[var(--mist-400)] tracking-wide">
          {etiqueta}
        </label>
      )}
      <div className="relative flex items-center w-full rounded-sm border border-[var(--line)] bg-[var(--ink-800)] text-[var(--mist-100)] focus-within:border-[var(--teal-400)] transition-colors duration-150">
        {prefijo && (
          <span className="pl-3 pr-1 text-sm font-mono text-[var(--mist-600)] select-none">
            {prefijo}
          </span>
        )}
        <input
          id={inputId}
          disabled={disabled}
          className={`w-full bg-transparent py-2 px-3 text-sm font-mono text-[var(--mist-100)] placeholder-[var(--mist-600)] focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
        {sufijo && (
          <span className="pr-3 pl-1 text-sm font-mono text-[var(--mist-600)] select-none">
            {sufijo}
          </span>
        )}
      </div>
      {error ? (
        <p className="text-xs text-[var(--coral-400)] mt-0.5">{error}</p>
      ) : ayuda ? (
        <p className="text-xs text-[var(--mist-600)] mt-0.5">{ayuda}</p>
      ) : null}
    </div>
  );
};
