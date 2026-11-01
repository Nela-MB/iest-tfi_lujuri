import estilos from "./Buscador.module.css";

export default function Buscador({ busqueda = "", categoria = "" }) {
  return (
    <form action="/catalogo" method="get" className={estilos.formulario} role="search">
      <label htmlFor="buscar" className={estilos.etiqueta}>
        Buscar una prenda
      </label>
      <div className={estilos.fila}>
        <input
          id="buscar"
          name="q"
          type="search"
          maxLength={60}
          defaultValue={busqueda}
          placeholder="Por ejemplo: remera"
          className={estilos.campo}
        />
        {categoria ? <input type="hidden" name="categoria" value={categoria} /> : null}
        <button type="submit" className={estilos.boton}>
          Buscar
        </button>
      </div>
    </form>
  );
}
