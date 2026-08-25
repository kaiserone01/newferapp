import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { registrarPing } from "@/lib/visitas/registro";

const esquemaPing = z.object({
  sessionId: z.string().min(1),
});

export async function POST(request: NextRequest) {
  let cuerpo: unknown;
  try {
    cuerpo = JSON.parse(await request.text());
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido" }, { status: 400 });
  }

  const resultado = esquemaPing.safeParse(cuerpo);
  if (!resultado.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  registrarPing(resultado.data);

  return NextResponse.json({ ok: true });
}
