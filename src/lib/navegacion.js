export function esEnlaceActivo(rutaActual, destino) {
  if (typeof rutaActual !== "string" || rutaActual.length === 0 || typeof destino !== "string") {
    return false;
  }

  if (destino === "/catalogo") {
    return rutaActual === destino || rutaActual.startsWith(`${destino}/`);
  }

  return rutaActual === destino;
}
