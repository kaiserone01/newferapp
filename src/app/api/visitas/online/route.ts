import { NextResponse } from "next/server";
import { contarEnLinea } from "@/lib/visitas/estadisticas";

export async function GET() {
  return NextResponse.json({ enLinea: contarEnLinea() });
}
