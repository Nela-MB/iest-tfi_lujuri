import { describe, expect, it } from "vitest";
import { calcularEstadoStock } from "../src/lib/stock.js";

describe("calcularEstadoStock", () => {
  it("devuelve sin stock cuando no hay variantes", () => {
    expect(calcularEstadoStock([])).toBe("sin stock");
  });

  it("devuelve sin stock cuando las variantes tienen stock 0", () => {
    expect(calcularEstadoStock([{ stock: 0 }, { stock: 0 }])).toBe(
      "sin stock"
    );
  });

  it("devuelve quedan pocas para un total de 1 a 3 unidades", () => {
    expect(calcularEstadoStock([{ stock: 1 }])).toBe("quedan pocas");
    expect(calcularEstadoStock([{ stock: 1 }, { stock: 2 }])).toBe(
      "quedan pocas"
    );
  });

  it("devuelve disponible para un total de 4 o más unidades", () => {
    expect(calcularEstadoStock([{ stock: 4 }])).toBe("disponible");
    expect(calcularEstadoStock([{ stock: 2 }, { stock: 3 }])).toBe(
      "disponible"
    );
  });
});
