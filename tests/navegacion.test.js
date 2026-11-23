import { describe, expect, it } from "vitest";
import { esEnlaceActivo } from "../src/lib/navegacion.js";

describe("esEnlaceActivo", () => {
  it("activa Inicio solo en la ruta exacta", () => {
    expect(esEnlaceActivo("/", "/")).toBe(true);
    expect(esEnlaceActivo("/catalogo", "/")).toBe(false);
  });

  it("activa Catalogo en la ruta y sus subrutas", () => {
    expect(esEnlaceActivo("/catalogo", "/catalogo")).toBe(true);
    expect(esEnlaceActivo("/catalogo/4", "/catalogo")).toBe(true);
    expect(esEnlaceActivo("/catalogofalso", "/catalogo")).toBe(false);
  });

  it("activa Quienes somos solo en la ruta exacta", () => {
    expect(esEnlaceActivo("/quienes-somos", "/quienes-somos")).toBe(true);
    expect(esEnlaceActivo("/quienes-somos/otra", "/quienes-somos")).toBe(false);
  });

  it.each(["", null, undefined])("no activa enlaces si la ruta es %s", (rutaActual) => {
    expect(esEnlaceActivo(rutaActual, "/")).toBe(false);
    expect(esEnlaceActivo(rutaActual, "/catalogo")).toBe(false);
    expect(esEnlaceActivo(rutaActual, "/quienes-somos")).toBe(false);
  });
});
