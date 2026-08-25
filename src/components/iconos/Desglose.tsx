import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const DesgloseIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <line x1="4" y1="6" x2="20" y2="6" />
    <line x1="4" y1="12" x2="14" y2="12" />
    <line x1="4" y1="18" x2="18" y2="18" />
  </IconoBase>
);
