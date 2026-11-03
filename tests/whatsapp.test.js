import { describe, expect, it } from "vitest";
import {
  armarEnlaceWhatsApp,
  armarMensajeWhatsApp
} from "../src/lib/whatsapp.js";

describe("armarMensajeWhatsApp", () => {
  it("arma el mensaje con una linea por prenda, categorias legibles y precios formateados", () => {
    const lineas = [
      {
        nombre: "Remera lisa",
        categoria: "mujer",
        talle: "M",
        color: "Rosa",
        cantidad: 2,
        precio: 1500.5
      },
      {
        nombre: "Pantalón de abrigo",
        categoria: "ninos",
        talle: "8",
        color: "Celeste",
        cantidad: 1,
        precio: 0
      }
    ];

    expect(armarMensajeWhatsApp(lineas, 3001)).toBe(
      [
        "Hola LujUri Boutique, quiero hacer este pedido:",
        "",
        "1. Remera lisa (Mujer) - Talle M - Color Rosa - x2 - $ 1.500,50",
        "2. Pantalón de abrigo (Niños) - Talle 8 - Color Celeste - x1 - $ 0,00",
        "",
        "Total: $ 3.001,00",
        "¿Me confirman disponibilidad y entrega a domicilio?"
      ].join("\n")
    );
  });
});

describe("armarEnlaceWhatsApp", () => {
  it("normaliza el numero y codifica el mensaje para el enlace", () => {
    const numero = "+54 9 11 5555-0000";
    const mensaje = "Hola: algodón & sol #1\nListo";

    expect(armarEnlaceWhatsApp(numero, mensaje)).toBe(
      "https://wa.me/5491155550000?text=Hola%3A%20algod%C3%B3n%20%26%20sol%20%231%0AListo"
    );
  });

  it("lanza un error claro cuando falta el numero", () => {
    expect(() => armarEnlaceWhatsApp("", "Hola")).toThrow(
      "Falta el número de WhatsApp"
    );
  });

  it("lanza un error claro si el numero no contiene digitos", () => {
    expect(() => armarEnlaceWhatsApp("+ --", "Hola")).toThrow(
      "Falta el número de WhatsApp"
    );
  });
});
