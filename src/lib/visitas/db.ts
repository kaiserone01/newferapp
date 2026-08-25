import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const DATA_DIR = process.env.VISITAS_DATA_DIR ?? path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "visitas.db");

function crearConexion(): Database.Database {
  fs.mkdirSync(DATA_DIR, { recursive: true });

  const conexion = new Database(DB_PATH);
  conexion.pragma("journal_mode = WAL");

  conexion.exec(`
    CREATE TABLE IF NOT EXISTS visitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT NOT NULL,
      visitor_hash TEXT NOT NULL,
      path TEXT NOT NULL,
      pais TEXT,
      ciudad TEXT,
      dispositivo TEXT,
      navegador TEXT,
      sistema_operativo TEXT,
      iniciado_en TEXT NOT NULL,
      finalizado_en TEXT,
      duracion_segundos INTEGER,
      ultimo_ping TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_visitas_iniciado_en ON visitas(iniciado_en);
    CREATE INDEX IF NOT EXISTS idx_visitas_session_id ON visitas(session_id);
    CREATE INDEX IF NOT EXISTS idx_visitas_en_linea ON visitas(finalizado_en, ultimo_ping);
  `);

  return conexion;
}

declare global {
  var __visitasDb: Database.Database | undefined;
}

const db = globalThis.__visitasDb ?? crearConexion();

if (process.env.NODE_ENV !== "production") {
  globalThis.__visitasDb = db;
}

export default db;
