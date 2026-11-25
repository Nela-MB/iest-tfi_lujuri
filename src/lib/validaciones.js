const CATEGORIAS_VALIDAS = ["mujer", "hombre", "ninos"];
const MAX_CARACTERES_BUSQUEDA = 60;
const MAX_PRECIO_PRODUCTO_ADMIN = 9999999.99;
const MAX_TAMANO_FOTO_ADMIN = 4 * 1024 * 1024;
const TIPOS_FOTO_ADMIN = ["image/jpeg", "image/png", "image/webp"];
const MENSAJE_ERROR_PEDIDO =
  "Revisá los productos de tu pedido e intentá de nuevo.";

export function validarCategoria(categoria) {
  return (
    typeof categoria === "string" && CATEGORIAS_VALIDAS.includes(categoria)
  );
}

export function validarBusqueda(busqueda) {
  return (
    typeof busqueda === "string" &&
    busqueda.length <= MAX_CARACTERES_BUSQUEDA
  );
}

export function validarItemsPedido(items) {
  if (!Array.isArray(items) || items.length < 1 || items.length > 20) {
    return { valido: false, mensaje: MENSAJE_ERROR_PEDIDO };
  }

  const variantesVistas = new Set();

  for (const item of items) {
    if (item === null || typeof item !== "object") {
      return { valido: false, mensaje: MENSAJE_ERROR_PEDIDO };
    }

    const { varianteId, cantidad } = item;

    if (
      !Number.isInteger(varianteId) ||
      varianteId <= 0 ||
      !Number.isInteger(cantidad) ||
      cantidad < 1 ||
      cantidad > 20 ||
      variantesVistas.has(varianteId)
    ) {
      return { valido: false, mensaje: MENSAJE_ERROR_PEDIDO };
    }

    variantesVistas.add(varianteId);
  }

  return { valido: true };
}

export function validarProductoAdmin(datos) {
  const producto =
    datos !== null && typeof datos === "object" && !Array.isArray(datos)
      ? datos
      : {};
  const errores = {};
  const nombre =
    typeof producto.nombre === "string" ? producto.nombre.trim() : "";
  const descripcion =
    producto.descripcion === undefined
      ? ""
      : typeof producto.descripcion === "string"
        ? producto.descripcion.trim()
        : null;
  const categoria =
    typeof producto.categoria === "string"
      ? producto.categoria.trim()
      : "";

  if (!nombre) {
    errores.nombre = "Ingresá el nombre de la prenda.";
  } else if (nombre.length > 120) {
    errores.nombre = "Revisá el nombre: puede tener hasta 120 caracteres.";
  }

  if (descripcion === null) {
    errores.descripcion = "Ingresá una descripción válida.";
  } else if (descripcion.length > 500) {
    errores.descripcion =
      "Revisá la descripción: puede tener hasta 500 caracteres.";
  }

  if (!CATEGORIAS_VALIDAS.includes(categoria)) {
    errores.categoria = "Elegí la categoría mujer, hombre o niños.";
  }

  const precioResultado = convertirPrecioAdmin(producto.precio);
  if (!precioResultado.valido) {
    errores.precio = precioResultado.mensaje;
  }

  if (Object.keys(errores).length > 0) {
    return { valido: false, errores };
  }

  return {
    valido: true,
    datos: {
      nombre,
      descripcion,
      categoria,
      precio: precioResultado.precio,
    },
  };
}

export function validarVarianteAdmin(datos) {
  const variante =
    datos !== null && typeof datos === "object" && !Array.isArray(datos)
      ? datos
      : {};
  const errores = {};
  const talle =
    typeof variante.talle === "string" ? variante.talle.trim() : "";
  const color =
    typeof variante.color === "string" ? variante.color.trim() : "";

  if (!talle) {
    errores.talle = "Ingresá el talle de la prenda.";
  } else if (talle.length > 10) {
    errores.talle = "Revisá el talle: puede tener hasta 10 caracteres.";
  }

  if (!color) {
    errores.color = "Ingresá el color de la prenda.";
  } else if (color.length > 30) {
    errores.color = "Revisá el color: puede tener hasta 30 caracteres.";
  }

  const stockTexto =
    typeof variante.stock === "string"
      ? variante.stock.trim()
      : variante.stock;
  const stock =
    typeof stockTexto === "number"
      ? stockTexto
      : typeof stockTexto === "string" && /^\d+$/.test(stockTexto)
        ? Number(stockTexto)
        : Number.NaN;

  if (!Number.isInteger(stock) || stock < 0 || stock > 9999) {
    errores.stock = "Ingresá un stock entero entre 0 y 9999.";
  }

  if (Object.keys(errores).length > 0) {
    return { valido: false, errores };
  }

  return {
    valido: true,
    datos: { talle, color, stock },
  };
}

export function validarFoto(datos) {
  const foto =
    datos !== null && typeof datos === "object" && !Array.isArray(datos)
      ? datos
      : {};
  const { tipo, tamano } = foto;
  const tipoLimpio = typeof tipo === "string" ? tipo.trim() : "";
  const errores = {};

  if (!TIPOS_FOTO_ADMIN.includes(tipoLimpio)) {
    errores.tipo = "Elegí una foto JPG, PNG o WEBP.";
  }

  if (
    typeof tamano !== "number" ||
    !Number.isInteger(tamano) ||
    tamano <= 0 ||
    tamano > MAX_TAMANO_FOTO_ADMIN
  ) {
    errores.tamano = "Revisá el tamaño: la foto debe pesar hasta 4 MB.";
  }

  if (Object.keys(errores).length > 0) {
    return { valido: false, errores };
  }

  return {
    valido: true,
    datos: { tipo: tipoLimpio, tamano },
  };
}

function convertirPrecioAdmin(valor) {
  if (typeof valor === "number") {
    if (!Number.isFinite(valor)) {
      return {
        valido: false,
        mensaje: "Ingresá un precio válido, entre 0 y 9999999,99.",
      };
    }

    const precioRedondeado = Math.round(valor * 100) / 100;
    if (
      valor < 0 ||
      valor > MAX_PRECIO_PRODUCTO_ADMIN ||
      Math.abs(valor - precioRedondeado) > 0.00000001
    ) {
      return {
        valido: false,
        mensaje: "Ingresá un precio válido, con hasta dos decimales.",
      };
    }

    return { valido: true, precio: valor };
  }

  if (typeof valor !== "string" || valor.trim() === "") {
    return {
      valido: false,
      mensaje: "Ingresá el precio de la prenda.",
    };
  }

  const texto = valor.trim();
  const formatoMilesConPuntos = /^\d{1,3}(?:\.\d{3})+(?:,\d{1,2})?$/;
  if (formatoMilesConPuntos.test(texto)) {
    return {
      valido: false,
      mensaje:
        "Escribí el precio sin puntos de miles, por ejemplo 15000 o 15000,50.",
    };
  }

  if (!/^\d+(?:[,.]\d{1,2})?$/.test(texto)) {
    return {
      valido: false,
      mensaje: "Ingresá un precio válido, con hasta dos decimales.",
    };
  }

  const precio = Number(texto.replace(",", "."));
  if (
    !Number.isFinite(precio) ||
    precio < 0 ||
    precio > MAX_PRECIO_PRODUCTO_ADMIN
  ) {
    return {
      valido: false,
      mensaje: "Ingresá un precio entre 0 y 9999999,99.",
    };
  }

  return { valido: true, precio };
}
