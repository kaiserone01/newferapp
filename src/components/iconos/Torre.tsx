import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const TorreIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18" />
    <path d="M6 18h12" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M2 22h20" />
  </IconoBase>
);
