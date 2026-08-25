import React from "react";
import { IconoBase, IconoProps } from "./IconoBase";

export const PorcentajeIcono: React.FC<IconoProps> = (props) => (
  <IconoBase {...props}>
    <line x1="19" y1="5" x2="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </IconoBase>
);
