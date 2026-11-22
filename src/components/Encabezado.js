import Link from "next/link";
import ContadorPedido from "./ContadorPedido.js";
import estilos from "./Encabezado.module.css";
import MenuPrincipal from "./MenuPrincipal.js";

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
      <div className={estilos.acciones}>
        <MenuPrincipal />
        <div className={estilos.contador}>
          <ContadorPedido />
        </div>
      </div>
    </header>
  );
}
