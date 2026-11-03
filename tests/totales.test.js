import { describe, expect, it } from "vitest";
import {
  calcularTotalPedido,
  revisarStock
} from "../src/lib/totales.js";

const crearLinea = (datos = {}) => ({
  varianteId: 1,
  nombre: "Remera",
  talle: "M",
  color: "Negro",
  precio: 1200,
  stock: 10,
  cantidad: 2,
  ...datos
});

describe("calcularTotalPedido", () => {
  it("suma precio por cantidad y redondea el resultado a dos decimales", () => {
    const lineas = [
      crearLinea({ precio: 1999.99, cantidad: 3 }),
      crearLinea({ varianteId: 2, precio: 0.1, cantidad: 3 }),
      crearLinea({ varianteId: 3, precio: 0.2, cantidad: 3 })
    ];

    expect(calcularTotalPedido(lineas)).toBe(6000.87);
  });

  it("devuelve cero cuando no hay lineas", () => {
    expect(calcularTotalPedido([])).toBe(0);
  });
});

describe("revisarStock", () => {
  it("devuelve solo las lineas cuyo stock no alcanza", () => {
    const lineaSinStockSuficiente = crearLinea({
      varianteId: 2,
      nombre: "Pantalon",
      stock: 2,
      cantidad: 3
    });
    const lineas = [
      crearLinea({ stock: 5, cantidad: 5 }),
      lineaSinStockSuficiente,
      crearLinea({ varianteId: 3, stock: 0, cantidad: 1 })
    ];

    expect(revisarStock(lineas)).toEqual([
      lineaSinStockSuficiente,
      lineas[2]
    ]);
  });

  it("devuelve una lista vacia si el stock alcanza para todas las lineas", () => {
    const lineas = [
      crearLinea({ stock: 2, cantidad: 2 }),
      crearLinea({ varianteId: 2, stock: 5, cantidad: 1 })
    ];

    expect(revisarStock(lineas)).toEqual([]);
  });

  it("devuelve una lista vacia si no hay lineas", () => {
    expect(revisarStock([])).toEqual([]);
  });
});
