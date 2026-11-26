import { describe, expect, it } from "vitest";
import { rutaImagen } from "../src/lib/imagen.js";

describe("rutaImagen", () => {
  it("devuelve una direccion https tal cual", () => {
    const imagen = "https://imagenes.example/prendas/vestido.jpg";

    expect(rutaImagen({ imagen })).toBe(imagen);
  });

  it("arma la ruta de public/media/prendas para un nombre de archivo", () => {
    expect(rutaImagen({ imagen: "vestido.jpg" })).toBe(
      "/media/prendas/vestido.jpg"
    );
  });

  it("respeta una ruta que empieza con una barra", () => {
    expect(rutaImagen({ imagen: "/media/prendas/vestido.jpg" })).toBe(
      "/media/prendas/vestido.jpg"
    );
  });

  it.each([undefined, null, ""])(
    "usa el isotipo cuando no hay imagen: %s",
    (imagen) => {
      expect(rutaImagen({ imagen })).toBe("/marca/isotipo-lujuri.png");
    }
  );

  it.each([
    "javascript:alert(1)",
    "data:image/svg+xml,<svg></svg>"
  ])("usa el isotipo para una direccion insegura: %s", (imagen) => {
    expect(rutaImagen({ imagen })).toBe("/marca/isotipo-lujuri.png");
  });

  it("usa el isotipo para una direccion http", () => {
    expect(rutaImagen({ imagen: "http://sitio.example/foto.jpg" })).toBe(
      "/marca/isotipo-lujuri.png"
    );
  });

  it.each([
    "JavaScript:alert(1)",
    "  javascript:alert(1)",
    "JAVASCRIPT:alert(1)",
    "blob:https://sitio.example/abc",
    "file:///etc/hosts"
  ])("usa el isotipo para el esquema o formato inseguro: %s", (imagen) => {
    expect(rutaImagen({ imagen })).toBe("/marca/isotipo-lujuri.png");
  });

  it("usa el isotipo para una direccion relativa a protocolo externa", () => {
    expect(rutaImagen({ imagen: "//sitio-ajeno.example/foto.jpg" })).toBe(
      "/marca/isotipo-lujuri.png"
    );
  });

  it.each(["/media/../secreto.jpg", "../foto.jpg"])(
    "usa el isotipo para una ruta con traversal: %s",
    (imagen) => {
      expect(rutaImagen({ imagen })).toBe("/marca/isotipo-lujuri.png");
    }
  );

  it.each([
    "/media/%2e%2e/secreto.jpg",
    "/media/%252e%252e/secreto.jpg",
    "..%2ffoto.jpg",
    "..%5cfoto.jpg",
    "/media\\..\\secreto.jpg",
    "..\\foto.jpg"
  ])("usa el isotipo para traversal codificado o con barras inversas: %s", (imagen) => {
    expect(rutaImagen({ imagen })).toBe("/marca/isotipo-lujuri.png");
  });

  it.each([
    "DATA:text/html,<script>alert(1)</script>",
    " data:image/svg+xml,<svg></svg>",
    "JaVaScRiPt:alert(1)"
  ])("usa el isotipo para esquemas peligrosos con otro formato: %s", (imagen) => {
    expect(rutaImagen({ imagen })).toBe("/marca/isotipo-lujuri.png");
  });

  it.each([123, {}, []])(
    "usa el isotipo para un valor de imagen que no es texto: %s",
    (imagen) => {
      expect(() => rutaImagen({ imagen })).not.toThrow();
      expect(rutaImagen({ imagen })).toBe("/marca/isotipo-lujuri.png");
    }
  );

  it.each([null, undefined])(
    "usa el isotipo si la prenda es %s sin lanzar error",
    (prenda) => {
      expect(() => rutaImagen(prenda)).not.toThrow();
      expect(rutaImagen(prenda)).toBe("/marca/isotipo-lujuri.png");
    }
  );

  // Se codifican los espacios para conservar nombres validos dentro de la ruta de prendas.
  it("codifica los espacios en el nombre del archivo", () => {
    expect(rutaImagen({ imagen: "vestido azul.jpg" })).toBe(
      "/media/prendas/vestido%20azul.jpg"
    );
  });
});
