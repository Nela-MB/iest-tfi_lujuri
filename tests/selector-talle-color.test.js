import { describe, expect, it } from "vitest";
import {
  buscarVarianteDisponible,
  obtenerOpcionesVariante
} from "../src/lib/selector-variantes.js";

const variantes = [
  { id: 1, talle: "M", color: "Negro", stock: 3 },
  { id: 2, talle: "M", color: "Rojo", stock: 0 },
  { id: 3, talle: "L", color: "Rojo", stock: 2 }
];

describe("opciones del selector de talle y color", () => {
  it("incluye opciones agotadas e indica si cada una tiene stock", () => {
    expect(obtenerOpcionesVariante(variantes, "talle")).toEqual([
      { valor: "M", disponible: true },
      { valor: "L", disponible: true }
    ]);
    expect(obtenerOpcionesVariante(variantes, "color")).toEqual([
      { valor: "Negro", disponible: true },
      { valor: "Rojo", disponible: true }
    ]);
  });

  it("deshabilita una opcion cuando no hay stock para la otra seleccion", () => {
    expect(obtenerOpcionesVariante(variantes, "color", "M")).toEqual([
      { valor: "Negro", disponible: true },
      { valor: "Rojo", disponible: false }
    ]);
  });

  it("devuelve solo una variante con stock que coincide con talle y color", () => {
    expect(buscarVarianteDisponible(variantes, "M", "Negro")).toBe(variantes[0]);
    expect(buscarVarianteDisponible(variantes, "M", "Rojo")).toBeNull();
    expect(buscarVarianteDisponible(variantes, "", "Negro")).toBeNull();
  });

  it("no ofrece ninguna opcion como disponible si todas las variantes estan agotadas", () => {
    const agotadas = [{ id: 4, talle: "S", color: "Azul", stock: 0 }];

    expect(obtenerOpcionesVariante(agotadas, "talle")).toEqual([
      { valor: "S", disponible: false }
    ]);
    expect(buscarVarianteDisponible(agotadas, "S", "Azul")).toBeNull();
  });
});
