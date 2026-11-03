import { describe, expect, it } from "vitest";
import { crearItemsEnvio } from "../src/lib/carrito.js";

describe("pantalla del pedido", () => {
  it("prepara para el servidor solo ids de variante y cantidades", () => {
    const carrito = [
      {
        varianteId: 7,
        cantidad: 2,
        nombre: "Remera",
        precio: 1500,
        stock: 5,
      },
    ];

    expect(crearItemsEnvio(carrito)).toEqual([
      { varianteId: 7, cantidad: 2 },
    ]);
  });
});
