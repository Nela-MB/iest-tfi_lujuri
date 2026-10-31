export function calcularEstadoStock(variantes) {
  const stockTotal = variantes.reduce(
    (total, variante) => total + (variante.stock ?? 0),
    0
  );

  if (stockTotal <= 0) {
    return "sin stock";
  }

  if (stockTotal <= 3) {
    return "quedan pocas";
  }

  return "disponible";
}
