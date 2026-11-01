import Link from "next/link";

export default function PrendaNoEncontrada() {
  return (
    <main className="contenido">
      <h1>No encontramos esta prenda</h1>
      <p>Puede que ya no esté disponible o que el enlace tenga un error.</p>
      <Link href="/catalogo">Volver al catálogo</Link>
    </main>
  );
}
