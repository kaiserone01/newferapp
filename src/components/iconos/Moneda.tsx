import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const MonedaIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 6v12" />
    <path d="M15 9.5a2.5 2.5 0 0 0-5 0c0 3 5 2 5 5a2.5 2.5 0 0 1-5 0" />
  </IconoBase>
);
