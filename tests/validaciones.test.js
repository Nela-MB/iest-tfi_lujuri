import { describe, expect, it } from "vitest";
import {
  validarBusqueda,
  validarCategoria,
  validarItemsPedido,
} from "../src/lib/validaciones.js";

const MENSAJE_ERROR_PEDIDO =
  "Revisá los productos de tu pedido e intentá de nuevo.";

describe("validarCategoria", () => {
  it.each(["mujer", "hombre", "ninos"])("acepta la categoria %s", (categoria) => {
    expect(validarCategoria(categoria)).toBe(true);
  });

  it.each(["todas", "niños", "Mujer", "", null, undefined])(
    "rechaza la categoria %s",
    (categoria) => {
      expect(validarCategoria(categoria)).toBe(false);
    }
  );
});

describe("validarBusqueda", () => {
  it("acepta una busqueda de hasta 60 caracteres", () => {
    expect(validarBusqueda("a".repeat(60))).toBe(true);
  });

  it("rechaza una busqueda de mas de 60 caracteres", () => {
    expect(validarBusqueda("a".repeat(61))).toBe(false);
  });

  it("acepta una busqueda vacia y rechaza valores que no son texto", () => {
    expect(validarBusqueda("")).toBe(true);
    expect(validarBusqueda(null)).toBe(false);
  });
});

describe("validarItemsPedido", () => {
  it("acepta pedidos de 1 y 20 lineas validas", () => {
    const unaLinea = [{ varianteId: 1, cantidad: 1 }];
    const veinteLineas = Array.from({ length: 20 }, (_, indice) => ({
      varianteId: indice + 1,
      cantidad: 20,
    }));

    expect(validarItemsPedido(unaLinea)).toEqual({ valido: true });
    expect(validarItemsPedido(veinteLineas)).toEqual({ valido: true });
  });

  it.each([
    ["una lista vacia", []],
    ["un valor que no es lista", null],
    ["un objeto", { varianteId: 1, cantidad: 1 }],
    ["mas de 20 lineas", Array.from({ length: 21 }, (_, indice) => ({
      varianteId: indice + 1,
      cantidad: 1,
    }))],
  ])("rechaza %s", (_, items) => {
    expect(validarItemsPedido(items)).toEqual({
      valido: false,
      mensaje: MENSAJE_ERROR_PEDIDO,
    });
  });

  it.each([
    ["negativo", -1],
    ["cero", 0],
    ["decimal", 1.5],
    ["texto", "1"],
    ["ausente", undefined],
  ])("rechaza un varianteId %s", (_, varianteId) => {
    const item =
      varianteId === undefined
        ? { cantidad: 1 }
        : { varianteId, cantidad: 1 };

    expect(validarItemsPedido([item])).toEqual({
      valido: false,
      mensaje: MENSAJE_ERROR_PEDIDO,
    });
  });

  it.each([
    ["cero", 0],
    ["21", 21],
    ["decimal", 1.5],
    ["texto", "1"],
    ["ausente", undefined],
  ])("rechaza una cantidad %s", (_, cantidad) => {
    const item =
      cantidad === undefined
        ? { varianteId: 1 }
        : { varianteId: 1, cantidad };

    expect(validarItemsPedido([item])).toEqual({
      valido: false,
      mensaje: MENSAJE_ERROR_PEDIDO,
    });
  });

  it("rechaza variantes repetidas", () => {
    expect(
      validarItemsPedido([
        { varianteId: 1, cantidad: 1 },
        { varianteId: 1, cantidad: 2 },
      ])
    ).toEqual({
      valido: false,
      mensaje: MENSAJE_ERROR_PEDIDO,
    });
  });

  it("rechaza items que no son objetos y valores NaN sin lanzar error", () => {
    const itemsInvalidos = [
      [null],
      ["texto"],
      [5],
      [undefined],
      [{ varianteId: Number.NaN, cantidad: 1 }],
      [{ varianteId: 1, cantidad: Number.NaN }],
    ];

    for (const items of itemsInvalidos) {
      expect(() => validarItemsPedido(items)).not.toThrow();
      expect(validarItemsPedido(items)).toEqual({
        valido: false,
        mensaje: MENSAJE_ERROR_PEDIDO,
      });
    }
  });
});
