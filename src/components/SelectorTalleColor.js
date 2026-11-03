"use client";

import { useState } from "react";
import Link from "next/link";
import { usarPedido } from "../context/PedidoContext.js";
import {
  buscarVarianteDisponible,
  obtenerOpcionesVariante
} from "../lib/selector-variantes.js";
import estilos from "./SelectorTalleColor.module.css";

function OpcionesVariante({ campo, opciones, seleccionado, alCambiar }) {
  const etiqueta = campo === "talle" ? "Talle" : "Color";

  return (
    <fieldset className={estilos.grupo}>
      <legend>{etiqueta}</legend>
      <div className={estilos.opciones}>
        {opciones.map((opcion) => {
          return (
            <label
              key={opcion.valor}
              className={opcion.disponible ? estilos.opcion : estilos.agotada}
            >
              <input
                type="radio"
                name={campo}
                value={opcion.valor}
                checked={seleccionado === opcion.valor}
                disabled={!opcion.disponible}
                onChange={() => alCambiar(opcion.valor)}
                aria-label={
                  opcion.disponible
                    ? `${etiqueta} ${opcion.valor}`
                    : `${etiqueta} ${opcion.valor}, Sin stock`
                }
              />
              <span>{opcion.valor}</span>
              {!opcion.disponible ? <span>Sin stock</span> : null}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export default function SelectorTalleColor({ prenda }) {
  const [talleSeleccionado, setTalleSeleccionado] = useState("");
  const [colorSeleccionado, setColorSeleccionado] = useState("");
  const [agregado, setAgregado] = useState(false);
  const { agregarAlPedido } = usarPedido();
  const variantes = prenda.variantes;
  const opcionesTalle = obtenerOpcionesVariante(
    variantes,
    "talle",
    colorSeleccionado
  );
  const opcionesColor = obtenerOpcionesVariante(
    variantes,
    "color",
    talleSeleccionado
  );
  const varianteSeleccionada = buscarVarianteDisponible(
    variantes,
    talleSeleccionado,
    colorSeleccionado
  );

  function agregarPrenda() {
    if (!varianteSeleccionada) {
      return;
    }

    agregarAlPedido({
      varianteId: varianteSeleccionada.id,
      productoId: prenda.id,
      nombre: prenda.nombre,
      categoria: prenda.categoria,
      talle: varianteSeleccionada.talle,
      color: varianteSeleccionada.color,
      precio: prenda.precio,
      stock: varianteSeleccionada.stock
    });
    setAgregado(true);
  }

  return (
    <section className={estilos.selector} aria-label="Elegí talle y color">
      <OpcionesVariante
        campo="talle"
        opciones={opcionesTalle}
        seleccionado={talleSeleccionado}
        alCambiar={(valor) => {
          setTalleSeleccionado(valor);
          setAgregado(false);
        }}
      />
      <OpcionesVariante
        campo="color"
        opciones={opcionesColor}
        seleccionado={colorSeleccionado}
        alCambiar={(valor) => {
          setColorSeleccionado(valor);
          setAgregado(false);
        }}
      />
      <button
        type="button"
        className={estilos.boton}
        disabled={!varianteSeleccionada}
        onClick={agregarPrenda}
        aria-describedby={!varianteSeleccionada ? "ayuda-selector" : undefined}
      >
        Agregar a mi pedido
      </button>
      {!varianteSeleccionada ? (
        <p className={estilos.ayuda} id="ayuda-selector">
          Elegí talle y color
        </p>
      ) : null}
      {agregado ? (
        <p className={estilos.estado} role="status">
          Agregaste la prenda a tu pedido. <Link href="/pedido">Ver mi pedido</Link>
        </p>
      ) : null}
    </section>
  );
}
