import estilos from "./PieDePagina.module.css";

export default function PieDePagina() {
  return (
    <footer className={estilos.pie}>
      <p className={estilos.marca}>LujUri</p>
      <p>Tu estilo, con cariño.</p>
    </footer>
  );
}
