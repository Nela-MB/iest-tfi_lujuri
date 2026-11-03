import { NextResponse } from "next/server";
import { buscarVariantes, guardarPedido } from "../../../lib/pedidos.js";
import { calcularTotalPedido, revisarStock } from "../../../lib/totales.js";
import { validarItemsPedido } from "../../../lib/validaciones.js";
import {
  armarEnlaceWhatsApp,
  armarMensajeWhatsApp,
} from "../../../lib/whatsapp.js";

export const dynamic = "force-dynamic";

const MENSAJE_ERROR_WHATSAPP =
  "No pudimos enviar tu pedido, probá de nuevo en un rato";
const MENSAJE_ERROR_GUARDADO =
  "No pudimos guardar tu pedido, probá de nuevo en un rato";

function obtenerItems(cuerpo) {
  const items = Array.isArray(cuerpo) ? cuerpo : cuerpo?.items;

  if (!Array.isArray(items)) {
    return items;
  }

  return items.map((item) => {
    if (item === null || typeof item !== "object") {
      return item;
    }

    return {
      varianteId: item.varianteId,
      cantidad: item.cantidad,
    };
  });
}

export async function POST(request) {
  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return NextResponse.json(
      { error: "El pedido no tiene un formato válido." },
      { status: 400 }
    );
  }

  const items = obtenerItems(cuerpo);
  const validacion = validarItemsPedido(items);
  if (!validacion.valido) {
    return NextResponse.json(
      { error: validacion.mensaje },
      { status: 400 }
    );
  }

  const numeroWhatsApp = process.env.WHATSAPP_NUMERO;
  if (!numeroWhatsApp) {
    return NextResponse.json(
      { error: MENSAJE_ERROR_WHATSAPP },
      { status: 500 }
    );
  }

  let variantes;
  try {
    variantes = await buscarVariantes(items.map((item) => item.varianteId));
  } catch {
    return NextResponse.json(
      { error: MENSAJE_ERROR_GUARDADO },
      { status: 500 }
    );
  }

  const variantesPorId = new Map(
    variantes.map((variante) => [variante.varianteId, variante])
  );
  const lineas = [];

  for (const item of items) {
    const variante = variantesPorId.get(item.varianteId);
    if (!variante) {
      return NextResponse.json(
        {
          error:
            "Una de las prendas de tu pedido ya no está disponible. Revisá tu pedido e intentá de nuevo.",
        },
        { status: 400 }
      );
    }

    lineas.push({ ...variante, cantidad: item.cantidad });
  }

  const lineasSinStock = revisarStock(lineas);
  if (lineasSinStock.length > 0) {
    return NextResponse.json(
      {
        error: `No hay stock suficiente de ${lineasSinStock[0].nombre}.`,
      },
      { status: 400 }
    );
  }

  const total = calcularTotalPedido(lineas);
  let enlace;
  try {
    const mensaje = armarMensajeWhatsApp(lineas, total);
    enlace = armarEnlaceWhatsApp(numeroWhatsApp, mensaje);
  } catch {
    return NextResponse.json(
      { error: MENSAJE_ERROR_WHATSAPP },
      { status: 500 }
    );
  }

  let pedidoId;
  try {
    pedidoId = await guardarPedido(lineas, total);
  } catch {
    return NextResponse.json(
      { error: MENSAJE_ERROR_GUARDADO },
      { status: 500 }
    );
  }

  return NextResponse.json({ enlace, total, pedidoId });
}
