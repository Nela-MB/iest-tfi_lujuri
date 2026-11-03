export function obtenerOpcionesVariante(variantes, campo, valorRelacionado = "") {
  if (!Array.isArray(variantes) || !["talle", "color"].includes(campo)) {
    return [];
  }

  const campoRelacionado = campo === "talle" ? "color" : "talle";
  const valores = [...new Set(variantes.map((variante) => variante[campo]))];

  return valores.map((valor) => ({
    valor,
    disponible: variantes.some(
      (variante) =>
        variante[campo] === valor &&
        (!valorRelacionado || variante[campoRelacionado] === valorRelacionado) &&
        variante.stock > 0
    )
  }));
}

export function buscarVarianteDisponible(variantes, talle, color) {
  if (!talle || !color) {
    return null;
  }

  return (
    variantes.find(
      (variante) =>
        variante.talle === talle &&
        variante.color === color &&
        variante.stock > 0
    ) ?? null
  );
}
