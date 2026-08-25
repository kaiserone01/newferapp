import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const EjeIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="14" y1="6" x2="14" y2="18" />
    <circle cx="14" cy="12" r="3" />
  </IconoBase>
);
