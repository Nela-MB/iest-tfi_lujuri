export function calcularTotalPedido(lineas) {
  const total = lineas.reduce(
    (acumulado, linea) => acumulado + linea.precio * linea.cantidad,
    0
  );

  return Math.round(
    (total + Number.EPSILON * Math.sign(total)) * 100
  ) / 100;
}

export function revisarStock(lineas) {
  return lineas.filter((linea) => linea.stock < linea.cantidad);
}
