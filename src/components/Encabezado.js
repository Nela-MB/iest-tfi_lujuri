import Link from "next/link";
import ContadorPedido from "./ContadorPedido.js";
import estilos from "./Encabezado.module.css";

export default function Encabezado() {
  return (
    <header className={estilos.encabezado}>
      <Link href="/" aria-label="LujUri Boutique, ir al inicio">
        <img
          src="/marca/logo-lujuri-horizontal.png"
          alt="LujUri Boutique: una percha con un corazón y el nombre de la tienda"
          className={estilos.logo}
        />
      </Link>
      <nav aria-label="Principal" className={estilos.menu}>
        <Link href="/" className={estilos.enlace}>Inicio</Link>
        <Link href="/catalogo" className={estilos.enlace}>Catálogo</Link>
        <ContadorPedido />
      </nav>
    </header>
  );
}
