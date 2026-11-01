import Link from "next/link";
import estilos from "./inicio.module.css";

export default function Inicio() {
  return (
    <main className={estilos.inicio}>
      <img
        src="/marca/logo-lujuri.png"
        alt="Logo de LujUri Boutique: una percha con un corazón"
        width={240}
        height={240}
      />
      <h1>LujUri Boutique</h1>
      <p>Ropa para mujer, hombre y niños. Elegí desde tu celular y recibila en tu casa.</p>
      <Link href="/catalogo" className={estilos.boton}>
        Ver el catálogo
      </Link>
    </main>
  );
}
