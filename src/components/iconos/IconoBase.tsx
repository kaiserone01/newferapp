import React from "react";

export interface IconoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
  title?: string;
}

export const IconoBase: React.FC<IconoProps> = ({
  size = 24,
  className = "",
  title,
  children,
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block shrink-0 ${className}`}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
      {...props}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
};
