import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const RelojIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconoBase>
);
