import { describe, expect, it } from "vitest";
import { validarBusqueda, validarCategoria } from "../src/lib/validaciones.js";

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
