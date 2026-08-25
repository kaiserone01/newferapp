import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const CasaIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <path d="M3 10l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </IconoBase>
);
