import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { registrarFin } from "@/lib/visitas/registro";

const esquemaFin = z.object({
  sessionId: z.string().min(1),
  duracionSegundos: z.number().nonnegative(),
});

export async function POST(request: NextRequest) {
  let cuerpo: unknown;
  try {
    cuerpo = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const resultado = esquemaFin.safeParse(cuerpo);
  if (!resultado.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  registrarFin(resultado.data);

  return NextResponse.json({ ok: true });
}
