// Página /catalogo/[id] (R10, R11).
import Link from "next/link";
import { notFound } from "next/navigation";
import EtiquetaStock from "../../../components/EtiquetaStock.js";
import { rutaImagen } from "../../../components/TarjetaPrenda.js";
import { obtenerProducto } from "../../../lib/productos.js";
import { calcularEstadoStock } from "../../../lib/stock.js";
import { formatearPrecio } from "../../../lib/formato.js";
import estilos from "./detalle.module.css";

export const dynamic = "force-dynamic";

function leerId(texto) {
  return /^\d+$/.test(texto) ? Number(texto) : null;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const numero = leerId(id);
  try {
    const prenda = numero ? await obtenerProducto(numero) : null;
    if (prenda) {
      return {
        title: `${prenda.nombre} · LujUri Boutique`,
        description: prenda.descripcion ?? "Prenda de LujUri Boutique.",
      };
    }
  } catch {
    // si la base falla, se usa el título general
  }
  return { title: "Prenda · LujUri Boutique" };
}

export default async function DetallePrenda({ params }) {
  const { id } = await params;
  const numero = leerId(id);
  if (numero === null) {
    notFound();
  }

  let prenda = null;
  try {
    prenda = await obtenerProducto(numero);
  } catch {
    return (
      <main className="contenido">
        <p className={estilos.aviso} role="alert">
          No pudimos cargar la prenda, probá de nuevo en un rato.
        </p>
        <Link href="/catalogo" className={estilos.volver}>Volver al catálogo</Link>
      </main>
    );
  }

  if (!prenda) {
    notFound();
  }

  const estado = calcularEstadoStock(prenda.variantes);
  const sinFoto = !prenda.imagen;

  return (
    <main className="contenido">
      <Link href="/catalogo" className={estilos.volver}>← Volver al catálogo</Link>

      <article className={estilos.detalle}>
        <div className={estilos.foto}>
          <img
            src={rutaImagen(prenda)}
            alt={sinFoto ? "Isotipo de LujUri: una percha con un corazón" : `Foto de ${prenda.nombre}`}
            className={sinFoto ? estilos.reemplazo : estilos.imagen}
          />
          {prenda.imagenIa ? <span className={estilos.leyenda}>Imagen generada con IA</span> : null}
        </div>

        <div className={estilos.info}>
          <h1>{prenda.nombre}</h1>
          <EtiquetaStock estado={estado} />
          <p className={estilos.precio}>{formatearPrecio(prenda.precio)}</p>
          {prenda.descripcion ? <p>{prenda.descripcion}</p> : null}

          <h2>Talles y colores</h2>
          {prenda.variantes.length === 0 ? (
            <p>Todavía no cargamos talles para esta prenda.</p>
          ) : (
            <ul className={estilos.lista}>
              {prenda.variantes.map((variante) => (
                <li key={variante.id} className={estilos.variante}>
                  <span>Talle {variante.talle} · {variante.color}</span>
                  <span className={variante.stock > 0 ? estilos.hay : estilos.nohay}>
                    {variante.stock > 0 ? "Disponible" : "Sin stock"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </article>
    </main>
  );
}
