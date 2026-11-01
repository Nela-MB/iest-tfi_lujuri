// Filtra la lista de prendas por categoría y por texto de búsqueda (R4, R5, R6, R7).
import { normalizarTexto } from "./normalizar.js";

export function filtrarProductos(productos, { categoria, busqueda } = {}) {
  const texto = normalizarTexto((busqueda ?? "").trim());

  return productos.filter((producto) => {
    const coincideCategoria = !categoria || producto.categoria === categoria;
    const coincideTexto = !texto || normalizarTexto(producto.nombre).includes(texto);
    return coincideCategoria && coincideTexto;
  });
}
