import Link from "next/link";
import estilos from "./FiltroCategorias.module.css";

const OPCIONES = [
  { valor: "", nombre: "Todas" },
  { valor: "mujer", nombre: "Mujer" },
  { valor: "hombre", nombre: "Hombre" },
  { valor: "ninos", nombre: "Niños" },
];

function armarRuta(categoria, busqueda) {
  const parametros = new URLSearchParams();
  if (categoria) parametros.set("categoria", categoria);
  if (busqueda) parametros.set("q", busqueda);
  const texto = parametros.toString();
  return texto ? `/catalogo?${texto}` : "/catalogo";
}

export default function FiltroCategorias({ categoriaActual = "", busqueda = "" }) {
  return (
    <nav aria-label="Categorías" className={estilos.filtro}>
      {OPCIONES.map((opcion) => {
        const activa = opcion.valor === categoriaActual;
        return (
          <Link
            key={opcion.valor || "todas"}
            href={armarRuta(opcion.valor, busqueda)}
            className={activa ? `${estilos.opcion} ${estilos.activa}` : estilos.opcion}
            aria-current={activa ? "page" : undefined}
          >
            {opcion.nombre}
          </Link>
        );
      })}
    </nav>
  );
}
