import { describe, expect, it } from "vitest";
import { normalizarTexto } from "../src/lib/normalizar.js";

describe("normalizarTexto", () => {
  it("quita tildes y convierte el texto a minusculas", () => {
    expect(normalizarTexto("Pantalón")).toBe("pantalon");
  });
});