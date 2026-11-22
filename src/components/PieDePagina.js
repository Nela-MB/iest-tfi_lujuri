import Link from "next/link";
import estilos from "./PieDePagina.module.css";

export default function PieDePagina() {
  return (
    <footer className={estilos.pie}>
      <p className={estilos.marca}>LujUri</p>
      <p>Tu estilo, con cariño.</p>
      <nav aria-label="Pie de página">
        <Link href="/quienes-somos" className={estilos.enlace}>Quiénes somos</Link>
      </nav>
    </footer>
  );
}
