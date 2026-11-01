import { describe, expect, it } from "vitest";
import { filtrarProductos } from "../src/lib/filtros.js";

const prendas = [
  { id: 1, nombre: "Remera lisa", categoria: "mujer" },
  { id: 2, nombre: "Remera básica", categoria: "hombre" },
  { id: 3, nombre: "Pantalón de abrigo", categoria: "ninos" },
];

describe("filtrarProductos", () => {
  it("devuelve todas las prendas si no hay filtros", () => {
    expect(filtrarProductos(prendas, {})).toHaveLength(3);
  });

  it("filtra por categoria", () => {
    const resultado = filtrarProductos(prendas, { categoria: "mujer" });
    expect(resultado.map((p) => p.id)).toEqual([1]);
  });

  it("busca sin distinguir mayusculas ni tildes", () => {
    expect(filtrarProductos(prendas, { busqueda: "pantalon" }).map((p) => p.id)).toEqual([3]);
    expect(filtrarProductos(prendas, { busqueda: "BASICA" }).map((p) => p.id)).toEqual([2]);
  });

  it("ignora espacios al inicio y al final de la busqueda", () => {
    expect(filtrarProductos(prendas, { busqueda: "  remera  " })).toHaveLength(2);
  });

  it("combina categoria y busqueda", () => {
    const resultado = filtrarProductos(prendas, { categoria: "hombre", busqueda: "remera" });
    expect(resultado.map((p) => p.id)).toEqual([2]);
  });

  it("devuelve una lista vacia si nada coincide", () => {
    expect(filtrarProductos(prendas, { busqueda: "zapatillas" })).toEqual([]);
  });
});
