import Link from "next/link";
import EtiquetaStock from "./EtiquetaStock.js";
import { formatearPrecio } from "../lib/formato.js";
import { rutaImagen } from "../lib/imagen.js";
import estilos from "./TarjetaPrenda.module.css";

export default function TarjetaPrenda({ prenda }) {
  const sinFoto = !prenda.imagen;
  return (
    <article className={estilos.tarjeta}>
      <div className={estilos.foto}>
        <img
          src={rutaImagen(prenda)}
          alt={sinFoto ? "Isotipo de LujUri: una percha con un corazón" : `Foto de ${prenda.nombre}`}
          className={sinFoto ? estilos.reemplazo : estilos.imagen}
        />
        <div className={estilos.etiqueta}>
          <EtiquetaStock estado={prenda.estado} />
        </div>
        {prenda.imagenIa ? <span className={estilos.leyenda}>Imagen generada con IA</span> : null}
      </div>
      <h2 className={estilos.nombre}>{prenda.nombre}</h2>
      <p className={estilos.precio}>{formatearPrecio(prenda.precio)}</p>
      <Link href={`/catalogo/${prenda.id}`} className={estilos.boton}>
        Ver prenda
      </Link>
    </article>
  );
}
