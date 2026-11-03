// Actualiza el carrito sin mutarlo y calcula prendas y total orientativo (R4, R5, R7, R8).
const MAXIMO_UNIDADES = 20;
const CAMPOS_LINEA = [
  "varianteId",
  "productoId",
  "nombre",
  "categoria",
  "talle",
  "color",
  "precio",
  "stock",
  "cantidad"
];

export function validarPedidoGuardado(pedido) {
  return (
    Array.isArray(pedido) &&
    pedido.every((linea) => {
      if (!linea || typeof linea !== "object" || Array.isArray(linea)) {
        return false;
      }

      const campos = Object.keys(linea);
      return (
        campos.length === CAMPOS_LINEA.length &&
        CAMPOS_LINEA.every((campo) => campos.includes(campo)) &&
        Number.isInteger(linea.varianteId) &&
        linea.varianteId > 0 &&
        Number.isInteger(linea.productoId) &&
        linea.productoId > 0 &&
        typeof linea.nombre === "string" &&
        typeof linea.categoria === "string" &&
        typeof linea.talle === "string" &&
        typeof linea.color === "string" &&
        Number.isFinite(linea.precio) &&
        linea.precio >= 0 &&
        Number.isInteger(linea.stock) &&
        linea.stock >= 0 &&
        Number.isInteger(linea.cantidad) &&
        linea.cantidad >= 1 &&
        linea.cantidad <= MAXIMO_UNIDADES
      );
    })
  );
}

export function agregarAlCarrito(carrito, variante) {
  if (variante.stock < 1) {
    return [...carrito];
  }

  const indice = carrito.findIndex(
    (linea) => linea.varianteId === variante.varianteId
  );

  if (indice === -1) {
    return [...carrito, { ...variante, cantidad: 1 }];
  }

  return carrito.map((linea, posicion) => {
    if (posicion !== indice) {
      return linea;
    }

    const stockDisponible = Math.min(variante.stock, MAXIMO_UNIDADES);

    return {
      ...linea,
      stock: variante.stock,
      cantidad: Math.min(linea.cantidad + 1, stockDisponible)
    };
  });
}

export function cambiarCantidad(carrito, varianteId, cantidad) {
  return carrito.map((linea) => {
    if (linea.varianteId !== varianteId) {
      return linea;
    }

    if (!Number.isFinite(cantidad) || linea.stock < 1) {
      return { ...linea };
    }

    const cantidadMaxima = Math.min(MAXIMO_UNIDADES, linea.stock);
    const cantidadSolicitada = Math.floor(cantidad);

    return {
      ...linea,
      cantidad: Math.min(Math.max(cantidadSolicitada, 1), cantidadMaxima)
    };
  });
}

export function quitarDelCarrito(carrito, varianteId) {
  return carrito.filter((linea) => linea.varianteId !== varianteId);
}

export function contarPrendas(carrito) {
  return carrito.reduce((total, linea) => total + linea.cantidad, 0);
}

export function calcularTotalOrientativo(carrito) {
  return carrito.reduce(
    (total, linea) => total + linea.precio * linea.cantidad,
    0
  );
}
