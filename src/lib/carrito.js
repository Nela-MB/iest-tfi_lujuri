// Actualiza el carrito sin mutarlo y calcula prendas y total orientativo (R4, R5, R7, R8).
const MAXIMO_UNIDADES = 20;

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
