// Consultas SQL del pedido; todos los valores se envian como parametros.
import { sql } from "./db.js";

export async function buscarVariantes(ids) {
  const filas = await sql`
    SELECT v.id AS variante_id, v.producto_id, p.nombre, p.categoria,
           v.talle, v.color, v.stock, p.precio
    FROM variantes v
    JOIN productos p ON p.id = v.producto_id
    WHERE v.id = ANY(${ids}) AND p.activo = TRUE`;

  return filas.map((fila) => ({
    varianteId: Number(fila.variante_id),
    productoId: Number(fila.producto_id),
    nombre: fila.nombre,
    categoria: fila.categoria,
    talle: fila.talle,
    color: fila.color,
    stock: Number(fila.stock),
    precio: Number(fila.precio)
  }));
}

export async function guardarPedido(lineas, total) {
  const productoIds = lineas.map((linea) => linea.productoId);
  const varianteIds = lineas.map((linea) => linea.varianteId);
  const cantidades = lineas.map((linea) => linea.cantidad);
  const precios = lineas.map((linea) => linea.precio);

  const filas = await sql`
    WITH pedido_creado AS (
      INSERT INTO pedidos (total)
      VALUES (${total})
      RETURNING id
    ),
    items_creados AS (
      INSERT INTO pedido_items (
        pedido_id, producto_id, variante_id, cantidad, precio_unitario
      )
      SELECT pedido_creado.id, datos.producto_id, datos.variante_id,
             datos.cantidad, datos.precio_unitario
      FROM pedido_creado
      CROSS JOIN UNNEST(
        ${productoIds}::INTEGER[],
        ${varianteIds}::INTEGER[],
        ${cantidades}::INTEGER[],
        ${precios}::NUMERIC[]
      ) AS datos(producto_id, variante_id, cantidad, precio_unitario)
      RETURNING id
    )
    SELECT id FROM pedido_creado`;

  if (filas.length === 0) {
    throw new Error("No se pudo recuperar el pedido guardado");
  }

  return Number(filas[0].id);
}
