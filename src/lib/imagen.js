const IMAGEN_POR_DEFECTO = "/marca/isotipo-lujuri.png";

function tieneTraversal(ruta) {
  let rutaDecodificada = ruta;

  for (let intento = 0; intento < 3; intento += 1) {
    try {
      const siguiente = decodeURIComponent(rutaDecodificada);
      if (siguiente === rutaDecodificada) {
        break;
      }
      rutaDecodificada = siguiente;
    } catch {
      return true;
    }
  }

  return rutaDecodificada.split(/[\\/]/).includes("..");
}

export function rutaImagen(prenda) {
  if (!prenda || typeof prenda !== "object") {
    return IMAGEN_POR_DEFECTO;
  }

  const imagen = prenda.imagen;
  if (typeof imagen !== "string" || imagen.length === 0 || imagen.trim() !== imagen) {
    return IMAGEN_POR_DEFECTO;
  }

  if (/^https:\/\//i.test(imagen)) {
    return imagen;
  }

  if (imagen.startsWith("//") || /^[a-z][a-z\d+.-]*:/i.test(imagen)) {
    return IMAGEN_POR_DEFECTO;
  }

  if (imagen.startsWith("/")) {
    if (imagen.includes("\\") || tieneTraversal(imagen)) {
      return IMAGEN_POR_DEFECTO;
    }
    return imagen;
  }

  if (imagen.includes("/") || imagen.includes("\\") || tieneTraversal(imagen)) {
    return IMAGEN_POR_DEFECTO;
  }

  return `/media/prendas/${encodeURIComponent(imagen)}`;
}
