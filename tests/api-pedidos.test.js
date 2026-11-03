import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { buscarVariantes, guardarPedido } = vi.hoisted(() => ({
  buscarVariantes: vi.fn(),
  guardarPedido: vi.fn(),
}));

vi.mock("../src/lib/pedidos.js", () => ({
  buscarVariantes,
  guardarPedido,
}));

import { POST } from "../src/app/api/pedidos/route.js";

const VARIANTE = {
  varianteId: 7,
  productoId: 3,
  nombre: "Remera lisa",
  categoria: "mujer",
  talle: "M",
  color: "Rosa",
  stock: 5,
  precio: 1500.5,
};

function crearRequest(cuerpo) {
  return {
    json: vi.fn().mockResolvedValue(cuerpo),
  };
}

describe("POST /api/pedidos", () => {
  beforeEach(() => {
    vi.stubEnv("WHATSAPP_NUMERO", "+54 9 11 5555-0000");
    buscarVariantes.mockResolvedValue([VARIANTE]);
    guardarPedido.mockResolvedValue(81);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("guarda con datos de la base e ignora precios enviados por el navegador", async () => {
    const request = crearRequest({
      items: [{ varianteId: 7, cantidad: 2, precio: 0.01, total: 0.02 }],
      precio: 0.01,
    });

    const response = await POST(request);
    const respuesta = await response.json();

    expect(response.status).toBe(200);
    expect(respuesta).toEqual({
      enlace: expect.stringContaining("https://wa.me/5491155550000?text="),
      total: 3001,
      pedidoId: 81,
    });
    expect(guardarPedido).toHaveBeenCalledWith(
      [{ ...VARIANTE, cantidad: 2 }],
      3001
    );
    expect(buscarVariantes).toHaveBeenCalledWith([7]);
  });

  it("acepta una lista JSON directa y solo conserva varianteId y cantidad", async () => {
    const request = crearRequest([
      { varianteId: 7, cantidad: 1, precio: 1, nombre: "Inventada" },
    ]);

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(guardarPedido).toHaveBeenCalledWith(
      [{ ...VARIANTE, cantidad: 1 }],
      1500.5
    );
  });

  it("responde 400 si el cuerpo no es JSON valido", async () => {
    const request = { json: vi.fn().mockRejectedValue(new SyntaxError()) };

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toHaveProperty("error");
    expect(buscarVariantes).not.toHaveBeenCalled();
  });

  it("responde 400 con un mensaje amable si la cantidad es cero", async () => {
    const response = await POST(
      crearRequest({ items: [{ varianteId: 7, cantidad: 0 }] })
    );

    expect(response.status).toBe(400);
    expect((await response.json()).error).toMatch(/pedido/i);
    expect(buscarVariantes).not.toHaveBeenCalled();
  });

  it("no guarda si falta WHATSAPP_NUMERO", async () => {
    vi.stubEnv("WHATSAPP_NUMERO", "");

    const response = await POST(
      crearRequest({ items: [{ varianteId: 7, cantidad: 1 }] })
    );

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      error: "No pudimos enviar tu pedido, probá de nuevo en un rato",
    });
    expect(buscarVariantes).not.toHaveBeenCalled();
    expect(guardarPedido).not.toHaveBeenCalled();
  });

  it("indica la prenda si no hay stock suficiente y no guarda", async () => {
    buscarVariantes.mockResolvedValue([{ ...VARIANTE, stock: 1 }]);

    const response = await POST(
      crearRequest({ items: [{ varianteId: 7, cantidad: 2 }] })
    );

    expect(response.status).toBe(400);
    expect((await response.json()).error).toContain("Remera lisa");
    expect(guardarPedido).not.toHaveBeenCalled();
  });

  it("responde 400 si una variante no existe o no esta activa", async () => {
    buscarVariantes.mockResolvedValue([]);

    const response = await POST(
      crearRequest({ items: [{ varianteId: 999, cantidad: 1 }] })
    );

    expect(response.status).toBe(400);
    const datos = await response.json();
    expect(datos.error).toBe(
      "Una de las prendas de tu pedido ya no está disponible. Revisá tu pedido e intentá de nuevo."
    );
    expect(datos.error).not.toContain("999");
    expect(guardarPedido).not.toHaveBeenCalled();
  });

  it.each(["buscar", "guardar"])(
    "responde un error generico si falla la base al %s",
    async (operacion) => {
      if (operacion === "buscar") {
        buscarVariantes.mockRejectedValue(new Error("detalle interno"));
      } else {
        guardarPedido.mockRejectedValue(new Error("detalle interno"));
      }

      const response = await POST(
        crearRequest({ items: [{ varianteId: 7, cantidad: 1 }] })
      );
      const datos = await response.json();

      expect(response.status).toBe(500);
      expect(datos).toEqual({
        error: "No pudimos guardar tu pedido, probá de nuevo en un rato",
      });
      expect(JSON.stringify(datos)).not.toContain("detalle interno");
    }
  );
});
