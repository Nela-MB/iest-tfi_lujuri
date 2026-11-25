import { describe, expect, it } from "vitest";
import {
  validarBusqueda,
  validarCategoria,
  validarItemsPedido,
  validarFoto,
  validarProductoAdmin,
  validarVarianteAdmin,
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
});

function esperarErrorPorCampo(resultado, campo) {
  expect(resultado).toMatchObject({ valido: false });
  expect(resultado.errores[campo]).toEqual(expect.any(String));
  expect(resultado.errores[campo]).toMatch(
    /\b(revisá|ingresá|elegí|completá|poné|usá|probá|escribí)/i
  );
}

describe("validarProductoAdmin", () => {
  const datosValidos = {
    nombre: "Prenda",
    descripcion: "",
    categoria: "mujer",
    precio: 10,
  };

  it("recorta textos y convierte precios con coma o punto decimal", () => {
    const datos = {
      nombre: "  Remera básica  ",
      descripcion: "  Una prenda cómoda.  ",
      categoria: "  mujer  ",
    };

    expect(validarProductoAdmin({ ...datos, precio: "15000,50" })).toEqual({
      valido: true,
      datos: {
        nombre: "Remera básica",
        descripcion: "Una prenda cómoda.",
        categoria: "mujer",
        precio: 15000.5,
      },
    });
    expect(
      validarProductoAdmin({ ...datos, precio: "15000.50" }).datos.precio
    ).toBe(15000.5);
  });

  it.each([
    ["15000,50", 15000.5],
    ["15000.50", 15000.5],
    ["15000", 15000],
    [" 15000 ", 15000],
    ["9999999,99", 9999999.99],
  ])("acepta el precio %s y lo convierte a número", (precio, esperado) => {
    expect(
      validarProductoAdmin({ ...datosValidos, precio }).datos.precio
    ).toBe(esperado);
  });

  it("acepta los límites de longitud y precio, y una descripción vacía", () => {
    expect(
      validarProductoAdmin({
        nombre: "N".repeat(120),
        descripcion: "",
        categoria: "ninos",
        precio: "9999999.99",
      })
    ).toMatchObject({
      valido: true,
      datos: {
        nombre: "N".repeat(120),
        descripcion: "",
        categoria: "ninos",
        precio: 9999999.99,
      },
    });
    expect(
      validarProductoAdmin({
        ...datosValidos,
        descripcion: "D".repeat(500),
        precio: 0,
      }).valido
    ).toBe(true);
  });

  it.each(["15.000", "15.000,50"])(
    "rechaza el precio %s y explica que no use puntos de miles",
    (precio) => {
      const resultado = validarProductoAdmin({ ...datosValidos, precio });

      esperarErrorPorCampo(resultado, "precio");
      expect(resultado.errores.precio).toContain("sin puntos de miles");
    }
  );

  it.each([
    ["nombre ausente", { nombre: undefined }, "nombre"],
    ["nombre vacío", { nombre: "   " }, "nombre"],
    ["nombre demasiado largo", { nombre: "N".repeat(121) }, "nombre"],
    ["descripción demasiado larga", { descripcion: "D".repeat(501) }, "descripcion"],
    ["categoría inválida", { categoria: "niños" }, "categoria"],
    ["precio negativo", { precio: "-5" }, "precio"],
    ["precio superior al máximo", { precio: "10000000" }, "precio"],
    ["precio de texto", { precio: "mucho" }, "precio"],
    ["precio con tres decimales", { precio: "15000,505" }, "precio"],
    ["precio con notación exponencial", { precio: "1e3" }, "precio"],
    ["precio hexadecimal", { precio: "0x10" }, "precio"],
    ["precio vacío", { precio: "" }, "precio"],
    ["precio vacío", { precio: "   " }, "precio"],
    ["precio NaN", { precio: Number.NaN }, "precio"],
    ["precio infinito", { precio: Number.POSITIVE_INFINITY }, "precio"],
  ])("informa qué campo corregir: %s", (_, cambios, campo) => {
    esperarErrorPorCampo(
      validarProductoAdmin({ ...datosValidos, ...cambios }),
      campo
    );
  });
});

describe("validarVarianteAdmin", () => {
  const datosValidos = { talle: "M", color: "Negro", stock: 1 };

  it("recorta talle y color, y convierte el stock entero", () => {
    expect(
      validarVarianteAdmin({
        talle: "  M  ",
        color: "  Azul marino  ",
        stock: "12",
      })
    ).toEqual({
      valido: true,
      datos: { talle: "M", color: "Azul marino", stock: 12 },
    });
  });

  it("acepta el stock entero enviado como texto", () => {
    expect(
      validarVarianteAdmin({ ...datosValidos, stock: "5" })
    ).toEqual({
      valido: true,
      datos: { talle: "M", color: "Negro", stock: 5 },
    });
  });

  it("acepta el stock entero enviado como texto", () => {
    expect(
      validarVarianteAdmin({ ...datosValidos, stock: "5" })
    ).toEqual({
      valido: true,
      datos: { talle: "M", color: "Negro", stock: 5 },
    });
  });

  it("acepta los límites de longitud y stock", () => {
    expect(
      validarVarianteAdmin({
        talle: "T".repeat(10),
        color: "C".repeat(30),
        stock: 9999,
      }).valido
    ).toBe(true);
    expect(
      validarVarianteAdmin({ ...datosValidos, stock: 0 }).valido
    ).toBe(true);
  });

  it.each([
    ["talle vacío", { talle: "   " }, "talle"],
    ["talle demasiado largo", { talle: "T".repeat(11) }, "talle"],
    ["color vacío", { color: "   " }, "color"],
    ["color demasiado largo", { color: "C".repeat(31) }, "color"],
    ["stock decimal", { stock: 1.5 }, "stock"],
    ["stock negativo", { stock: -1 }, "stock"],
    ["stock superior al máximo", { stock: 10000 }, "stock"],
    ["stock de texto", { stock: "mucho" }, "stock"],
    ["stock vacío", { stock: "" }, "stock"],
    ["stock decimal como texto", { stock: "5.5" }, "stock"],
    ["stock de solo espacios", { stock: " " }, "stock"],
  ])("informa qué campo corregir: %s", (_, cambios, campo) => {
    esperarErrorPorCampo(
      validarVarianteAdmin({ ...datosValidos, ...cambios }),
      campo
    );
  });
});

describe("validarFoto", () => {
  it.each(["image/jpeg", "image/png", "image/webp"])(
    "acepta %s hasta 4 MB inclusive",
    (tipo) => {
      expect(validarFoto({ tipo, tamano: 4 * 1024 * 1024 })).toEqual({
        valido: true,
        datos: { tipo, tamano: 4 * 1024 * 1024 },
      });
    }
  );

  it.each([
    "image/svg+xml",
    "image/gif",
    "IMAGE/JPEG",
    "IMAGE/PNG",
    "IMAGE/WEBP",
  ])("rechaza el tipo de foto %s", (tipo) => {
    esperarErrorPorCampo(validarFoto({ tipo, tamano: 100 }), "tipo");
  });

  it.each([
    ["tipo no permitido", { tipo: "image/gif", tamano: 100 }, "tipo"],
    ["tipo vacío", { tipo: "", tamano: 100 }, "tipo"],
    ["tamaño vacío", { tipo: "image/jpeg", tamano: "" }, "tamano"],
    ["tamaño de cero bytes", { tipo: "image/jpeg", tamano: 0 }, "tamano"],
    ["más de 4 MB", { tipo: "image/jpeg", tamano: 4 * 1024 * 1024 + 1 }, "tamano"],
    ["tamaño NaN", { tipo: "image/jpeg", tamano: Number.NaN }, "tamano"],
    ["tamaño negativo", { tipo: "image/jpeg", tamano: -1 }, "tamano"],
    ["tamaño decimal", { tipo: "image/jpeg", tamano: 1.5 }, "tamano"],
    ["tamaño de texto", { tipo: "image/jpeg", tamano: "mucho" }, "tamano"],
  ])("rechaza %s con un mensaje amable", (_, datos, campo) => {
    esperarErrorPorCampo(validarFoto(datos), campo);
  });
});

describe("validarItemsPedido", () => {
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
