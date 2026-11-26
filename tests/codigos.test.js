import { describe, expect, it } from "vitest";
import { generarCodigoProducto } from "../src/lib/codigos.js";

describe("generarCodigoProducto", () => {
  it("genera el siguiente codigo de la categoria", () => {
    expect(generarCodigoProducto("mujer", ["MUJ-008"])).toBe("MUJ-009");
  });

  it("empieza en 001 si no hay codigos existentes", () => {
    expect(generarCodigoProducto("mujer", [])).toBe("MUJ-001");
  });

  it.each([
    ["MUJ", "mujer"],
    ["HOM", "hombre"],
    ["NIN", "ninos"],
  ])("usa el prefijo %s para la categoria %s", (prefijo, categoria) => {
    expect(generarCodigoProducto(categoria, [])).toBe(`${prefijo}-001`);
  });

  it("ignora codigos de otras categorias", () => {
    expect(
      generarCodigoProducto("mujer", ["HOM-015", "NIN-020", "MUJ-002"])
    ).toBe("MUJ-003");
  });

  it("ignora codigos vacios, nulos o mal formados", () => {
    expect(
      generarCodigoProducto("mujer", [
        "",
        null,
        undefined,
        "MUJ",
        "MUJ-",
        "MUJ-abc",
        "MUJ-12-extra",
      ])
    ).toBe("MUJ-001");
  });

  it("toma el numero mas alto y no la cantidad de codigos", () => {
    expect(generarCodigoProducto("mujer", ["MUJ-001", "MUJ-007"])).toBe(
      "MUJ-008"
    );
  });

  it("mantiene tres digitos al superar el nueve", () => {
    expect(generarCodigoProducto("mujer", ["MUJ-009"])).toBe("MUJ-010");
  });

  it.each(["", "MUJ", "infantil", null, undefined])(
    "lanza un error si la categoria no es valida: %s",
    (categoria) => {
      expect(() => generarCodigoProducto(categoria, [])).toThrow();
    }
  );

  it("permite que el codigo crezca a cuatro digitos", () => {
    expect(generarCodigoProducto("mujer", ["MUJ-999"])).toBe("MUJ-1000");
  });

  it.each(["niños", "Mujer"])(
    "rechaza la categoria con un formato no valido: %s",
    (categoria) => {
      expect(() => generarCodigoProducto(categoria, [])).toThrow();
    }
  );

  it.each([null, undefined])(
    "empieza en 001 si la lista de codigos es %s",
    (codigosExistentes) => {
      expect(() =>
        generarCodigoProducto("mujer", codigosExistentes)
      ).not.toThrow();
      expect(generarCodigoProducto("mujer", codigosExistentes)).toBe("MUJ-001");
    }
  );

  it("toma el numero mayor de una lista desordenada", () => {
    expect(generarCodigoProducto("mujer", ["MUJ-007", "MUJ-002"])).toBe(
      "MUJ-008"
    );
  });

  it("interpreta correctamente codigos con ceros iniciales", () => {
    expect(generarCodigoProducto("mujer", ["MUJ-0007"])).toBe("MUJ-008");
  });

  it("ignora codigos con numeros fuera del rango seguro", () => {
    expect(
      generarCodigoProducto("mujer", ["MUJ-99999999999999999999"])
    ).toBe("MUJ-001");
  });
});
