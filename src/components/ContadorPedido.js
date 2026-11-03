"use client";

import Link from "next/link";
import { usarPedido } from "../context/PedidoContext.js";
import estilos from "./ContadorPedido.module.css";

export default function ContadorPedido() {
  const { cantidadPrendas, cargado } = usarPedido();

  if (!cargado) {
    return null;
  }

  return (
    <Link href="/pedido" className={estilos.enlace} aria-live="polite">
      Mi pedido ({cantidadPrendas})
    </Link>
  );
}
