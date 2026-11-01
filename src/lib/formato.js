// Muestra los precios con el formato "$ 1.500,00" (R3).
export function formatearPrecio(valor) {
  const numero = Number(valor) || 0;
  const texto = numero.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `$ ${texto}`;
}
