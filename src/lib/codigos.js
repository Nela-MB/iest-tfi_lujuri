const PREFIJOS_CATEGORIA = new Map([
  ["mujer", "MUJ"],
  ["hombre", "HOM"],
  ["ninos", "NIN"],
]);

export function generarCodigoProducto(categoria, codigosExistentes) {
  const prefijo = PREFIJOS_CATEGORIA.get(categoria);

  if (!prefijo) {
    throw new Error("La categoria no es valida.");
  }

  if (!Array.isArray(codigosExistentes)) {
    throw new TypeError("Los codigos existentes deben ser una lista.");
  }

  const formatoCodigo = new RegExp(`^${prefijo}-(\\d{3,})$`);
  let numeroMayor = 0;

  for (const codigo of codigosExistentes) {
    if (typeof codigo !== "string") {
      continue;
    }

    const coincidencia = codigo.match(formatoCodigo);
    if (!coincidencia) {
      continue;
    }

    const numero = Number(coincidencia[1]);
    if (Number.isSafeInteger(numero) && numero > numeroMayor) {
      numeroMayor = numero;
    }
  }

  return `${prefijo}-${String(numeroMayor + 1).padStart(3, "0")}`;
}
