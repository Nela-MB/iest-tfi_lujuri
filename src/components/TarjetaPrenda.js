import Link from "next/link";
import EtiquetaStock from "./EtiquetaStock.js";
import { formatearPrecio } from "../lib/formato.js";
import estilos from "./TarjetaPrenda.module.css";

export function rutaImagen(prenda) {
  if (!prenda.imagen) {
    return "/marca/isotipo-lujuri.png";
  }
  return prenda.imagen.startsWith("/") ? prenda.imagen : `/media/prendas/${prenda.imagen}`;
}

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
      </div>
      <h2 className={estilos.nombre}>{prenda.nombre}</h2>
      <p className={estilos.precio}>{formatearPrecio(prenda.precio)}</p>
      <Link href={`/catalogo/${prenda.id}`} className={estilos.boton}>
        Ver prenda
      </Link>
    </article>
  );
}
