// Única conexión a la base de datos (PostgreSQL en Neon).
// Uso: const filas = await sql`SELECT * FROM productos WHERE categoria = ${cat}`;
import { neon } from "@neondatabase/serverless";

let cliente;

export function sql(textos, ...valores) {
  if (!cliente) {
    if (!process.env.DATABASE_URL) {
      throw new Error("Falta la variable de entorno DATABASE_URL");
    }
    cliente = neon(process.env.DATABASE_URL);
  }
  return cliente(textos, ...valores);
}
