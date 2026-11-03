import { describe, expect, it } from "vitest";
import { validarPedidoGuardado } from "../src/lib/carrito.js";

const crearLinea = (datos = {}) => ({
  varianteId: 1,
  productoId: 10,
  nombre: "Remera",
  categoria: "mujer",
  talle: "M",
  color: "Negro",
  precio: 1200,
  stock: 5,
  cantidad: 2,
  ...datos
});

describe("validarPedidoGuardado", () => {
  it("acepta un pedido con lineas completas y validas", () => {
    expect(validarPedidoGuardado([crearLinea()])).toBe(true);
  });

  it("acepta un pedido vacio", () => {
    expect(validarPedidoGuardado([])).toBe(true);
  });

  it.each([
    null,
    {},
    [null],
    ["linea"],
    [crearLinea({ varianteId: 0 })],
    [crearLinea({ productoId: 1.5 })],
    [crearLinea({ nombre: 10 })],
    [crearLinea({ precio: Number.NaN })],
    [crearLinea({ stock: -1 })],
    [crearLinea({ cantidad: 0 })],
    [crearLinea({ cantidad: 21 })],
    [{ ...crearLinea(), propiedadExtra: true }]
  ])("rechaza datos con forma invalida: %j", (pedido) => {
    expect(validarPedidoGuardado(pedido)).toBe(false);
  });
});
