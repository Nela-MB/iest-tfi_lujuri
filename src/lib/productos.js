// Único módulo que escribe consultas SQL de prendas (principio 3 de la constitución).
// Siempre usa parámetros: nunca se pega texto del usuario dentro de la consulta.
import { sql } from "./db.js";

function prepararProducto(fila) {
  return {
    id: fila.id,
    codigo: fila.codigo,
    nombre: fila.nombre,
    descripcion: fila.descripcion,
    categoria: fila.categoria,
    precio: Number(fila.precio),
    imagen: fila.imagen,
    imagenIa: Boolean(fila.imagen_ia),
    destacado: fila.destacado,
    variantes: fila.variantes ?? [],
  };
}

export async function listarProductos() {
  const filas = await sql`
    SELECT p.id, p.codigo, p.nombre, p.descripcion, p.categoria, p.precio, p.imagen, p.imagen_ia, p.destacado,
           COALESCE(
             json_agg(json_build_object('id', v.id, 'talle', v.talle, 'color', v.color, 'stock', v.stock))
             FILTER (WHERE v.id IS NOT NULL), '[]'
           ) AS variantes
    FROM productos p
    LEFT JOIN variantes v ON v.producto_id = p.id
    WHERE p.activo = TRUE
    GROUP BY p.id
    ORDER BY p.id`;
  return filas.map(prepararProducto);
}

export async function obtenerProducto(id) {
  const filas = await sql`
    SELECT p.id, p.codigo, p.nombre, p.descripcion, p.categoria, p.precio, p.imagen, p.imagen_ia, p.destacado,
           COALESCE(
             json_agg(json_build_object('id', v.id, 'talle', v.talle, 'color', v.color, 'stock', v.stock))
             FILTER (WHERE v.id IS NOT NULL), '[]'
           ) AS variantes
    FROM productos p
    LEFT JOIN variantes v ON v.producto_id = p.id
    WHERE p.id = ${id} AND p.activo = TRUE
    GROUP BY p.id`;
  return filas.length > 0 ? prepararProducto(filas[0]) : null;
}
