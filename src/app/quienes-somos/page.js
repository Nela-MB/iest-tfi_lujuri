import Link from "next/link";
import estilos from "./quienes.module.css";

export const metadata = {
  title: "Quiénes somos · LujUri Boutique",
  description:
    "Conocé la historia de LujUri y cómo elegir, armar tu pedido y coordinar pago y entrega a domicilio.",
};

export default function QuienesSomos() {
  return (
    <main className={estilos.pagina}>
      <header className={estilos.presentacion}>
        <img
          src="/marca/logo-lujuri.png"
          alt="Logo de LujUri Boutique"
          width={120}
          height={120}
        />
        <h1>Quiénes somos</h1>
        <p className={estilos.marca}>LujUri Boutique</p>
        <p className={estilos.eslogan}>Tu estilo, con cariño.</p>
      </header>

      <div className={estilos.secciones}>
        <section className={estilos.seccion} aria-labelledby="historia">
          <h2 id="historia">Nuestra historia</h2>
          <p>
            LujUri comenzó en 2023 como un emprendimiento familiar, con la idea
            de llevar variedad, moda y precios accesibles.
          </p>
          <p>Detrás de LujUri está su equipo.</p>
          <p>
            Nos diferencia la atención personalizada, la entrega a domicilio y
            el cariño en cada elección para vos.
          </p>
        </section>

        <section className={estilos.seccion} aria-labelledby="como-trabajamos">
          <h2 id="como-trabajamos">Cómo trabajamos</h2>
          <ol className={estilos.pasos}>
            <li>Elegís en el catálogo.</li>
            <li>Armás tu pedido.</li>
            <li>Lo enviás por WhatsApp.</li>
            <li>Coordinamos el pago y la entrega a domicilio.</li>
          </ol>
        </section>
      </div>

      <section className={estilos.redes} aria-labelledby="redes">
        <h2 id="redes">Encontranos en redes</h2>
        <a
          href="https://www.instagram.com/luj_uri/"
          target="_blank"
          rel="noopener noreferrer"
          className={estilos.enlaceRed}
        >
          Instagram: @luj_uri (se abre en una pestaña nueva)
        </a>
      </section>

      <div className={estilos.accion}>
        <Link href="/catalogo" className={estilos.boton}>
          Ver el catálogo
        </Link>
      </div>
    </main>
  );
}
