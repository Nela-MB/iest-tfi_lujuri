// Página /catalogo (R1, R4 a R7, R14, R15).
import Buscador from "../../components/Buscador.js";
import FiltroCategorias from "../../components/FiltroCategorias.js";
import TarjetaPrenda from "../../components/TarjetaPrenda.js";
import { listarProductos } from "../../lib/productos.js";
import { filtrarProductos } from "../../lib/filtros.js";
import { calcularEstadoStock } from "../../lib/stock.js";
import { validarBusqueda, validarCategoria } from "../../lib/validaciones.js";
import estilos from "./catalogo.module.css";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Catálogo · LujUri Boutique",
  description: "Ropa para mujer, hombre y niños. Buscá por nombre, elegí tu categoría y mirá qué talles hay.",
};

function valorUnico(valor) {
  return Array.isArray(valor) ? valor[0] : valor;
}

export default async function Catalogo({ searchParams }) {
  const parametros = await searchParams;
  const categoriaPedida = valorUnico(parametros?.categoria) ?? "";
  const busquedaPedida = valorUnico(parametros?.q) ?? "";

  const categoriaValida = categoriaPedida === "" || validarCategoria(categoriaPedida);
  const busquedaValida = validarBusqueda(busquedaPedida);
  const categoria = categoriaValida ? categoriaPedida : "";
  const busqueda = busquedaValida ? busquedaPedida : "";

  let prendas = [];
  let huboError = false;
  try {
    const todas = await listarProductos();
    prendas = filtrarProductos(todas, { categoria, busqueda }).map((prenda) => ({
      ...prenda,
      estado: calcularEstadoStock(prenda.variantes),
    }));
  } catch {
    huboError = true;
  }

  return (
    <main className="contenido">
      <h1>Catálogo</h1>
      <Buscador busqueda={busqueda} categoria={categoria} />
      <FiltroCategorias categoriaActual={categoria} busqueda={busqueda} />

      {!categoriaValida || !busquedaValida ? (
        <p className={estilos.aviso} role="status">
          Alguno de los filtros no es válido, así que lo ignoramos. Probá de nuevo con otra búsqueda.
        </p>
      ) : null}

      {huboError ? (
        <p className={estilos.aviso} role="alert">
          No pudimos cargar el catálogo, probá de nuevo en un rato.
        </p>
      ) : prendas.length === 0 ? (
        <p className={estilos.aviso} role="status">
          No encontramos prendas con esa búsqueda.
        </p>
      ) : (
        <section className={estilos.grilla} aria-label="Prendas">
          {prendas.map((prenda) => (
            <TarjetaPrenda key={prenda.id} prenda={prenda} />
          ))}
        </section>
      )}
    </main>
  );
}
