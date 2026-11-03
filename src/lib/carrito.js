const MAXIMO_UNIDADES = 20;

export const agregarAlCarrito = (carrito, variante) => {
  const indice = carrito.findIndex(
    (linea) => linea.varianteId === variante.varianteId
  );

  if (indice === -1) {
    if (variante.stock < 1) {
      return [...carrito];
    }

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
};

export const cambiarCantidad = (carrito, varianteId, cantidad) =>
  carrito.map((linea) => {
    if (linea.varianteId !== varianteId) {
      return linea;
    }

    const cantidadMaxima = Math.min(MAXIMO_UNIDADES, linea.stock);

    return {
      ...linea,
      cantidad: Math.min(Math.max(cantidad, 1), cantidadMaxima)
    };
  });

export const quitarDelCarrito = (carrito, varianteId) =>
  carrito.filter((linea) => linea.varianteId !== varianteId);

export const contarPrendas = (carrito) =>
  carrito.reduce((total, linea) => total + linea.cantidad, 0);

export const calcularTotalOrientativo = (carrito) =>
  carrito.reduce(
    (total, linea) => total + linea.precio * linea.cantidad,
    0
  );
