import { formatearPrecio } from "./formato.js";

const NOMBRES_CATEGORIAS = {
  mujer: "Mujer",
  hombre: "Hombre",
  ninos: "Niños"
};

export function armarMensajeWhatsApp(lineas, total) {
  const detalle = lineas.map((linea, indice) => {
    const categoria = NOMBRES_CATEGORIAS[linea.categoria] ?? linea.categoria;

    return `${indice + 1}. ${linea.nombre} (${categoria}) - Talle ${linea.talle} - Color ${linea.color} - x${linea.cantidad} - ${formatearPrecio(linea.precio)}`;
  });

  return [
    "Hola LujUri Boutique, quiero hacer este pedido:",
    "",
    ...detalle,
    "",
    `Total: ${formatearPrecio(total)}`,
    "¿Me confirman disponibilidad y entrega a domicilio?"
  ].join("\n");
}

export function armarEnlaceWhatsApp(numero, mensaje) {
  const numeroNormalizado = String(numero ?? "").replace(/\D/g, "");

  if (!numeroNormalizado) {
    throw new Error("Falta el número de WhatsApp");
  }

  return `https://wa.me/${numeroNormalizado}?text=${encodeURIComponent(mensaje)}`;
}
