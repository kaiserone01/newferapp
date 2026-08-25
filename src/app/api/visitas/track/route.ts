import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { extraerDatosDeSolicitud, registrarInicio } from "@/lib/visitas/registro";

const esquemaInicio = z.object({
  sessionId: z.string().min(1),
  path: z.string().min(1),
});

export async function POST(request: NextRequest) {
  let cuerpo: unknown;
  try {
    cuerpo = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const resultado = esquemaInicio.safeParse(cuerpo);
  if (!resultado.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  const datosSolicitud = extraerDatosDeSolicitud(request);
  registrarInicio({ ...resultado.data, ...datosSolicitud });

  return NextResponse.json({ ok: true });
}
