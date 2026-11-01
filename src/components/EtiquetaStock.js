import estilos from "./EtiquetaStock.module.css";

const TEXTOS = {
  "sin stock": "Por ahora no tenemos stock de este talle",
  "quedan pocas": "Quedan pocas",
  disponible: "Disponible",
};

const CLASES = {
  "sin stock": estilos.sinStock,
  "quedan pocas": estilos.quedanPocas,
  disponible: estilos.disponible,
};

export default function EtiquetaStock({ estado }) {
  return <span className={`${estilos.etiqueta} ${CLASES[estado]}`}>{TEXTOS[estado]}</span>;
}
