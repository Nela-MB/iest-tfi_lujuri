const CATEGORIAS_VALIDAS = ["mujer", "hombre", "ninos"];
const MAX_CARACTERES_BUSQUEDA = 60;
const MENSAJE_ERROR_PEDIDO =
  "Revisá los productos de tu pedido e intentá de nuevo.";

export function validarCategoria(categoria) {
  return (
    typeof categoria === "string" && CATEGORIAS_VALIDAS.includes(categoria)
  );
}

export function validarBusqueda(busqueda) {
  return (
    typeof busqueda === "string" &&
    busqueda.length <= MAX_CARACTERES_BUSQUEDA
  );
}

export function validarItemsPedido(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 20) {
    return { valido: false, mensaje: MENSAJE_ERROR_PEDIDO };
  }

  const variantesVistas = new Set();

  for (const item of items) {
    if (item === null || typeof item !== "object") {
      return { valido: false, mensaje: MENSAJE_ERROR_PEDIDO };
    }

    const { varianteId, cantidad } = item;

    if (
      !Number.isInteger(varianteId) ||
      varianteId <= 0 ||
      !Number.isInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > 20 ||
      variantesVistas.has(varianteId)
    ) {
      return { valido: false, mensaje: MENSAJE_ERROR_PEDIDO };
    }

    variantesVistas.add(varianteId);
  }

  return { valido: true };
}
