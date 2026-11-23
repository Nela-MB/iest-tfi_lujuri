"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { esEnlaceActivo } from "../lib/navegacion.js";
import estilos from "./MenuPrincipal.module.css";

export default function MenuPrincipal() {
  const ruta = usePathname();
  const [abierto, setAbierto] = useState(false);
  const botonRef = useRef(null);
  const inicioActivo = esEnlaceActivo(ruta, "/");
  const catalogoActivo = esEnlaceActivo(ruta, "/catalogo");
  const quienesSomosActivo = esEnlaceActivo(ruta, "/quienes-somos");

  useEffect(() => {
    setAbierto(false);
  }, [ruta]);

  useEffect(() => {
    if (!abierto) {
      return;
    }

    function manejarTecla(evento) {
      if (evento.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    }

    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [abierto]);

  function cerrarMenu() {
    setAbierto(false);
  }

  return (
    <nav aria-label="Principal" className={estilos.menu}>
      <div
        id="panel-menu-principal"
        className={`${estilos.panel} ${abierto ? estilos.panelAbierto : ""}`}
      >
        <Link
          href="/"
          className={`${estilos.enlace} ${inicioActivo ? estilos.enlaceActivo : ""}`}
          aria-current={inicioActivo ? "page" : undefined}
          onClick={cerrarMenu}
        >
          Inicio
        </Link>
        <Link
          href="/catalogo"
          className={`${estilos.enlace} ${catalogoActivo ? estilos.enlaceActivo : ""}`}
          aria-current={catalogoActivo ? "page" : undefined}
          onClick={cerrarMenu}
        >
          Catálogo
        </Link>
        <Link
          href="/quienes-somos"
          className={`${estilos.enlace} ${quienesSomosActivo ? estilos.enlaceActivo : ""}`}
          aria-current={quienesSomosActivo ? "page" : undefined}
          onClick={cerrarMenu}
        >
          Quiénes somos
        </Link>
      </div>
      <button
        ref={botonRef}
        type="button"
        className={estilos.boton}
        aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={abierto}
        aria-controls="panel-menu-principal"
        onClick={() => setAbierto((estadoActual) => !estadoActual)}
      >
        <span className={estilos.icono} aria-hidden="true">
          <span className={estilos.rayita} />
          <span className={estilos.rayita} />
          <span className={estilos.rayita} />
        </span>
      </button>
    </nav>
  );
}
