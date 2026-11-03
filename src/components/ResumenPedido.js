"use client";

import Link from "next/link";
import { usarPedido } from "../context/PedidoContext.js";
import { calcularTotalOrientativo } from "../lib/carrito.js";
import { formatearPrecio } from "../lib/formato.js";
import estilos from "./ResumenPedido.module.css";

export default function ResumenPedido() {
  const { carrito, cargado, cambiarCantidadPedido, quitarDelPedido } =
    usarPedido();

  if (!cargado) {
    return null;
  }

  if (carrito.length === 0) {
    return (
      <p className={estilos.vacio} role="status">
        Todavía no agregaste prendas. <Link href="/catalogo">Ver catálogo</Link>
      </p>
    );
  }

  const total = calcularTotalOrientativo(carrito);

  return (
    <section className={estilos.resumen} aria-label="Resumen del pedido">
      <ul className={estilos.lista}>
        {carrito.map((linea) => (
          <li className={estilos.linea} key={linea.varianteId}>
            <article>
              <h2 className={estilos.nombre}>{linea.nombre}</h2>
              <dl className={estilos.detalles}>
                <div>
                  <dt>Categoría</dt>
                  <dd>{linea.categoria}</dd>
                </div>
                <div>
                  <dt>Talle</dt>
                  <dd>{linea.talle}</dd>
                </div>
                <div>
                  <dt>Color</dt>
                  <dd>{linea.color}</dd>
                </div>
                <div>
                  <dt>Precio unitario</dt>
                  <dd>{formatearPrecio(linea.precio)}</dd>
                </div>
                <div>
                  <dt>Subtotal</dt>
                  <dd>{formatearPrecio(linea.precio * linea.cantidad)}</dd>
                </div>
              </dl>
              <div className={estilos.acciones}>
                <label className={estilos.etiquetaCantidad}>
                  Cantidad
                  <input
                    type="number"
                    min="1"
                    max={Math.min(20, linea.stock)}
                    step="1"
                    value={linea.cantidad}
                    disabled={linea.stock < 1}
                    aria-label={`Cantidad de ${linea.nombre}`}
                    onChange={(evento) =>
                      cambiarCantidadPedido(
                        linea.varianteId,
                        Number(evento.target.value)
                      )
                    }
                  />
                </label>
                <button
                  className={estilos.quitar}
                  type="button"
                  onClick={() => quitarDelPedido(linea.varianteId)}
                >
                  Quitar
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className={estilos.total} aria-live="polite">
        Total: <strong>{formatearPrecio(total)}</strong>
      </p>
    </section>
  );
}
