"use client";

import { useEffect, useState } from "react";
import { usarPedido } from "../context/PedidoContext.js";
import { crearItemsEnvio } from "../lib/carrito.js";
import estilos from "./BotonWhatsApp.module.css";

const MENSAJE_ERROR =
  "No pudimos guardar tu pedido, probá de nuevo en un rato";

export default function BotonWhatsApp() {
  const { carrito, cargado, vaciarPedido } = usarPedido();
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [enlace, setEnlace] = useState("");
  const [exito, setExito] = useState(false);

  useEffect(() => {
    if (carrito.length > 0) {
      setExito(false);
      setEnlace("");
    }
  }, [carrito]);

  async function enviarPedido() {
    if (enviando || carrito.length === 0) {
      return;
    }

    setEnviando(true);
    setError("");
    setExito(false);
    setEnlace("");

    try {
      const respuesta = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crearItemsEnvio(carrito)),
      });
      const datos = await respuesta.json();

      if (!respuesta.ok || typeof datos?.enlace !== "string" || !datos.enlace) {
        setError(
          typeof datos?.error === "string" && datos.error
            ? datos.error
            : MENSAJE_ERROR
        );
        return;
      }

      setEnlace(datos.enlace);
      setExito(true);
      vaciarPedido();
      window.open(datos.enlace, "_blank", "noopener,noreferrer");
    } catch {
      setError(MENSAJE_ERROR);
    } finally {
      setEnviando(false);
    }
  }

  if (!cargado || (carrito.length === 0 && !exito)) {
    return null;
  }

  if (exito) {
    return (
      <p className={estilos.exito} role="status">
        ¡Gracias! Te abrimos WhatsApp.{" "}
        <a href={enlace} target="_blank" rel="noreferrer">
          Abrir WhatsApp
        </a>
      </p>
    );
  }

  return (
    <div className={estilos.contenedor}>
      {error ? (
        <p className={estilos.error} role="alert">
          {error}
        </p>
      ) : null}
      <button
        className={estilos.boton}
        type="button"
        disabled={enviando}
        onClick={enviarPedido}
      >
        {enviando ? "Enviando pedido..." : "Enviar pedido por WhatsApp"}
      </button>
    </div>
  );
}
