import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const BalanzaIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <path d="M12 3v18" />
    <path d="M5 7h14" />
    <path d="M5 7l-3 6a3 3 0 0 0 6 0z" />
    <path d="M19 7l-3 6a3 3 0 0 0 6 0z" />
    <path d="M8 21h8" />
  </IconoBase>
);
