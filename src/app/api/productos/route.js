// API /api/productos (R12, R13): lista de prendas con filtros y validación.
import { NextResponse } from "next/server";
import { listarProductos } from "../../../lib/productos.js";
import { filtrarProductos } from "../../../lib/filtros.js";
import { calcularEstadoStock } from "../../../lib/stock.js";
import { validarBusqueda, validarCategoria } from "../../../lib/validaciones.js";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const categoria = searchParams.get("categoria") ?? "";
  const busqueda = searchParams.get("q") ?? "";

  if (categoria !== "" && !validarCategoria(categoria)) {
    return NextResponse.json({ error: "La categoría no es válida." }, { status: 400 });
  }
  if (!validarBusqueda(busqueda)) {
    return NextResponse.json({ error: "La búsqueda es demasiado larga." }, { status: 400 });
  }

  try {
    const prendas = await listarProductos();
    const resultado = filtrarProductos(prendas, { categoria, busqueda }).map((prenda) => ({
      ...prenda,
      estado: calcularEstadoStock(prenda.variantes),
    }));
    return NextResponse.json(resultado);
  } catch {
    return NextResponse.json(
      { error: "No pudimos cargar el catálogo, probá de nuevo en un rato." },
      { status: 500 }
    );
  }
}
