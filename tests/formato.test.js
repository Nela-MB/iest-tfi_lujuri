import { describe, expect, it } from "vitest";
import { formatearPrecio } from "../src/lib/formato.js";

describe("formatearPrecio", () => {
  it("muestra el cero como marcador", () => {
    expect(formatearPrecio(0)).toBe("$ 0,00");
  });

  it("usa punto para los miles y coma para los decimales", () => {
    expect(formatearPrecio(1500)).toBe("$ 1.500,00");
    expect(formatearPrecio("2499.5")).toBe("$ 2.499,50");
  });

  it("trata un valor invalido como cero", () => {
    expect(formatearPrecio(undefined)).toBe("$ 0,00");
  });
});
