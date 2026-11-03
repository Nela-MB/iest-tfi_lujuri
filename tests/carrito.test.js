import { describe, expect, it } from "vitest";
import {
  agregarAlCarrito,
  calcularTotalOrientativo,
  cambiarCantidad,
  contarPrendas,
  quitarDelCarrito,
  validarPedidoGuardado
} from "../src/lib/carrito.js";

const crearVariante = (datos = {}) => ({
  varianteId: 1,
  productoId: 10,
  nombre: "Remera",
  categoria: "mujer",
  talle: "M",
  color: "Negro",
  precio: 1200,
  stock: 10,
  ...datos
});

const crearLinea = (datos = {}) => ({
  ...crearVariante(),
  cantidad: 2,
  ...datos
});

describe("validarPedidoGuardado", () => {
  it("acepta una lista vacia", () => {
    expect(validarPedidoGuardado([])).toBe(true);
  });

  it("acepta una lista de lineas validas", () => {
    expect(validarPedidoGuardado([crearLinea()])).toBe(true);
  });

  it.each([
    ["null", null],
    ["un objeto", {}],
    ["texto", "pedido"],
    ["una lista con elementos que no son objetos", [null]],
    ["una linea sin varianteId", [crearLinea({ varianteId: undefined })]],
    ["una linea con varianteId no numerico", [crearLinea({ varianteId: "1" })]],
    ["una linea sin cantidad", [crearLinea({ cantidad: undefined })]],
    ["una linea con cantidad no numerica", [crearLinea({ cantidad: "2" })]],
    ["una linea sin precio", [crearLinea({ precio: undefined })]],
    ["una linea con precio no numerico", [crearLinea({ precio: "1200" })]],
    ["una linea sin stock", [crearLinea({ stock: undefined })]],
    ["una linea con stock no numerico", [crearLinea({ stock: "10" })]],
    ["una linea con cantidad cero", [crearLinea({ cantidad: 0 })]],
    ["una linea con cantidad mayor a 20", [crearLinea({ cantidad: 21 })]],
    ["una linea con cantidad decimal", [crearLinea({ cantidad: 1.5 })]]
  ])("rechaza %s", (_descripcion, pedido) => {
    expect(validarPedidoGuardado(pedido)).toBe(false);
  });
});

describe("funciones del carrito", () => {
  it("agregar una variante nueva crea una linea con cantidad 1", () => {
    const carrito = [];
    const variante = crearVariante();

    const resultado = agregarAlCarrito(carrito, variante);

    expect(resultado).toEqual([{ ...variante, cantidad: 1 }]);
    expect(resultado).not.toBe(carrito);
    expect(carrito).toEqual([]);
  });

  it("agregar una variante existente suma una unidad", () => {
    const carrito = [crearLinea({ cantidad: 2 })];

    const resultado = agregarAlCarrito(carrito, crearVariante());

    expect(resultado).toEqual([crearLinea({ cantidad: 3 })]);
  });

  it("al agregar no supera las 20 unidades", () => {
    const carrito = [crearLinea({ cantidad: 20, stock: 30 })];

    const resultado = agregarAlCarrito(
      carrito,
      crearVariante({ stock: 30 })
    );

    expect(resultado[0].cantidad).toBe(20);
  });

  it("al agregar no supera el stock de la variante", () => {
    const carrito = [crearLinea({ cantidad: 2, stock: 3 })];

    const resultado = agregarAlCarrito(
      carrito,
      crearVariante({ stock: 3 })
    );

    expect(resultado[0].cantidad).toBe(3);
  });

  it("cambiar cantidad limita el minimo a 1", () => {
    const carrito = [crearLinea()];

    const resultado = cambiarCantidad(carrito, 1, 0);

    expect(resultado[0].cantidad).toBe(1);
  });

  it("cambiar cantidad no supera las 20 unidades", () => {
    const carrito = [crearLinea({ stock: 30 })];

    const resultado = cambiarCantidad(carrito, 1, 25);

    expect(resultado[0].cantidad).toBe(20);
  });

  it("cambiar cantidad no supera el stock de la variante", () => {
    const carrito = [crearLinea({ stock: 6 })];

    const resultado = cambiarCantidad(carrito, 1, 8);

    expect(resultado[0].cantidad).toBe(6);
  });

  it("cambiar cantidad conserva la cantidad si recibe NaN o undefined", () => {
    const carrito = [crearLinea({ cantidad: 4 })];

    expect(cambiarCantidad(carrito, 1, Number.NaN)[0].cantidad).toBe(4);
    expect(cambiarCantidad(carrito, 1, undefined)[0].cantidad).toBe(4);
  });

  it("cambiar cantidad redondea hacia abajo y respeta el minimo de 1", () => {
    const carrito = [crearLinea()];

    expect(cambiarCantidad(carrito, 1, 2.5)[0].cantidad).toBe(2);
    expect(cambiarCantidad(carrito, 1, 0.5)[0].cantidad).toBe(1);
  });

  it("cambiar cantidad conserva la cantidad si la linea tiene stock 0", () => {
    const carrito = [crearLinea({ cantidad: 2, stock: 0 })];

    const resultado = cambiarCantidad(carrito, 1, 1);

    expect(resultado[0].cantidad).toBe(2);
  });

  it("agregar una variante existente con stock 0 no cambia el carrito", () => {
    const carrito = [crearLinea({ cantidad: 2 })];
    const original = structuredClone(carrito);

    const resultado = agregarAlCarrito(carrito, crearVariante({ stock: 0 }));

    expect(resultado).toEqual(original);
    expect(carrito).toEqual(original);
  });

  it("quitar una linea la elimina del resultado", () => {
    const carrito = [
      crearLinea({ varianteId: 1 }),
      crearLinea({ varianteId: 2, talle: "L" })
    ];

    const resultado = quitarDelCarrito(carrito, 1);

    expect(resultado).toEqual([crearLinea({ varianteId: 2, talle: "L" })]);
    expect(resultado).not.toBe(carrito);
    expect(carrito).toHaveLength(2);
  });

  it("contar prendas suma las cantidades de todas las lineas", () => {
    const carrito = [
      crearLinea({ cantidad: 2 }),
      crearLinea({ varianteId: 2, cantidad: 3 })
    ];

    expect(contarPrendas(carrito)).toBe(5);
  });

  it("calcular el total orientativo suma precio por cantidad", () => {
    const carrito = [
      crearLinea({ precio: 1200, cantidad: 2 }),
      crearLinea({ varianteId: 2, precio: 750, cantidad: 3 })
    ];

    expect(calcularTotalOrientativo(carrito)).toBe(4650);
  });

  it("ninguna funcion modifica la lista original y las operaciones devuelven una lista nueva", () => {
    const carrito = [
      crearLinea({ cantidad: 2 }),
      crearLinea({ varianteId: 2, cantidad: 3 })
    ];
    const original = structuredClone(carrito);

    const agregado = agregarAlCarrito(carrito, crearVariante({ varianteId: 3 }));
    const cantidadCambiada = cambiarCantidad(carrito, 1, 4);
    const quitado = quitarDelCarrito(carrito, 1);
    contarPrendas(carrito);
    calcularTotalOrientativo(carrito);

    expect(carrito).toEqual(original);
    expect(agregado).not.toBe(carrito);
    expect(cantidadCambiada).not.toBe(carrito);
    expect(quitado).not.toBe(carrito);
  });
});
