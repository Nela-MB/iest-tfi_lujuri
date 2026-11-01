const CATEGORIAS_VALIDAS = ["mujer", "hombre", "ninos"];
const MAX_CARACTERES_BUSQUEDA = 60;

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
