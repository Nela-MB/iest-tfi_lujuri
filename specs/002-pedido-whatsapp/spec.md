# Spec 002: Pedido por WhatsApp

> Fase 1 del ciclo SDD. Cubre los requerimientos **RF05, RF06, RF07, RF08, RF09 y RF10** (la parte del pedido) de `docs/02-REQUERIMIENTOS.md`.
> Borrador redactado con ayuda de Claude (chat aparte). Las decisiones finales las toma la estudiante (ver sección 7).

## 1. Contexto

La spec 001 permite ver el catálogo y el detalle de cada prenda, pero todavía no se puede pedir nada. Esta funcionalidad agrega el **armado del pedido**: elegir talle y color en `/catalogo/[id]`, ver y editar el pedido en `/pedido`, y enviarlo por WhatsApp con el mensaje ya armado. Al enviarlo, el pedido se guarda en la base.

Datos: tablas `variantes`, `pedidos` y `pedido_items` (`docs/05-DATOS.md`). Seguridad: `docs/10-SEGURIDAD.md` (el total se calcula en el servidor). **No incluye** pago online, cuentas de usuario ni panel para ver pedidos.

## 2. Historias de usuario

- Como clienta, quiero elegir talle y color de una prenda, para pedir exactamente lo que quiero.
- Como clienta, quiero agregar varias prendas a mi pedido y cambiar cantidades o quitarlas, para armarlo a mi gusto.
- Como clienta, quiero ver el total, para saber cuánto voy a pagar.
- Como clienta, quiero mandar el pedido por WhatsApp con la lista ya escrita, para no tener que tipearla a mano.
- Como dueña del negocio, quiero que cada pedido quede guardado, para no perder ninguno.

## 3. Requisitos en notación EARS

| ID | Requisito | RF |
|---|---|---|
| R1 | Cuando la clienta abre `/catalogo/[id]`, el sistema deberá mostrar un selector de talle y color con las variantes de la prenda | RF05 |
| R2 | Mientras la clienta no haya elegido talle y color, el sistema deberá mantener desactivado el botón «Agregar a mi pedido» y mostrar el texto «Elegí talle y color» | RF05 |
| R3 | Si una variante tiene stock 0, entonces el sistema deberá mostrarla como no elegible con la leyenda «Sin stock»; si ninguna variante tiene stock, el sistema no deberá permitir agregar la prenda | RF10 |
| R4 | Cuando la clienta agrega una prenda, el sistema deberá aumentar el contador del encabezado y avisar «Agregaste la prenda a tu pedido» en un mensaje accesible (`role="status"`) | RF06 |
| R5 | Si la variante agregada ya está en el pedido, entonces el sistema deberá sumar la cantidad en lugar de repetir la línea, sin superar 20 unidades ni el stock disponible | RF06 |
| R6 | Cuando la clienta abre `/pedido`, el sistema deberá listar cada prenda con nombre, categoría, talle, color, cantidad, precio unitario y subtotal | RF06 |
| R7 | Cuando la clienta cambia la cantidad (de 1 a 20, sin superar el stock) o quita una prenda, el sistema deberá actualizar la lista y el total sin recargar la página | RF06, RF07 |
| R8 | El sistema deberá mostrar el total del pedido con el formato `$ 0,00`, recalculado cada vez que cambia la lista | RF07 |
| R9 | Si el pedido está vacío, entonces el sistema deberá mostrar «Todavía no agregaste prendas» con un enlace al catálogo y no deberá mostrar el botón de WhatsApp | RF06 |
| R10 | El sistema deberá conservar el pedido mientras la clienta navega entre páginas y si recarga el navegador | RF06 |
| R11 | Cuando la clienta toca «Enviar pedido por WhatsApp», el navegador deberá mandar al servidor solo los identificadores de variante y las cantidades, nunca precios ni totales | RF08, Seguridad |
| R12 | El servidor deberá validar que el pedido tenga de 1 a 20 líneas, que cada `variante_id` sea un entero positivo que exista y pertenezca a una prenda activa, que cada cantidad sea un entero entre 1 y 20 y que haya stock suficiente | RF08, Seguridad |
| R13 | Si la validación falla, entonces el servidor deberá responder con error 400 y un mensaje amable que indique qué prenda tiene el problema, sin detalles técnicos | Seguridad |
| R14 | El servidor deberá buscar los precios en la base, calcular el total y guardar el pedido en `pedidos` y sus líneas en `pedido_items`, copiando `precio_unitario` | RF09 |
| R15 | El guardado deberá ser atómico: si falla una parte, no deberá quedar un pedido a medias | RF09 |
| R16 | El servidor deberá armar el mensaje con el formato de `docs/02-REQUERIMIENTOS.md` y devolver el enlace `https://wa.me/<número>?text=<mensaje codificado>`, usando el número de `WHATSAPP_NUMERO` | RF08 |
| R17 | Si falta la variable `WHATSAPP_NUMERO`, entonces el servidor no deberá guardar el pedido y deberá responder con error 500 y el mensaje «No pudimos enviar tu pedido, probá de nuevo en un rato» | Seguridad |
| R18 | Si el guardado falla o la base no responde, entonces el sistema deberá mostrar «No pudimos guardar tu pedido, probá de nuevo en un rato», no deberá abrir WhatsApp y deberá conservar el pedido en pantalla | RNF |
| R19 | Cuando el envío sale bien, el sistema deberá abrir el enlace de WhatsApp, vaciar el pedido y mostrar «¡Gracias! Te abrimos WhatsApp» con el enlace visible por si no se abrió | RF08 |
| R20 | El sistema deberá poder usarse en 360 px de ancho y con teclado, con botones de al menos 44 × 44 px, el botón de WhatsApp con `var(--color-whatsapp)` y todos los textos en voseo | RNF |
| R21 | El sistema deberá guardar el pedido sin datos personales de la clienta (sin nombre, teléfono ni dirección) | Seguridad |

## 4. Casos límite

- Pedido vacío en `/pedido`.
- Misma variante agregada dos veces (suma cantidades).
- Cantidad pedida mayor al stock actual.
- Una prenda se queda sin stock o se desactiva mientras está en el pedido de la clienta (el servidor lo detecta en R12).
- Navegador con el almacenamiento bloqueado o con datos viejos o corruptos guardados: el pedido arranca vacío sin romper la página.
- Mensaje de WhatsApp muy largo (20 líneas) y caracteres especiales (tildes, `&`, `#`, saltos de línea): el enlace debe codificarse bien.
- Envío con `variante_id` inventado, negativo, decimal o texto; con cantidad 0, 21 o decimal.
- Doble toque sobre «Enviar»: no debe crear dos pedidos (botón desactivado mientras se envía).
- Variable `WHATSAPP_NUMERO` con `+`, espacios o guiones: se normaliza a solo dígitos.
- El navegador manda un precio o total en el cuerpo: se ignora.

## 5. Fuera de alcance

- Pago online y cuentas de usuario (`AGENTS.md`).
- Descontar el stock al guardar el pedido (ver decisión D1).
- Pedir nombre, dirección o teléfono en el sitio: se coordinan por WhatsApp.
- Panel para ver o cambiar el estado de los pedidos: se hace con SQL.
- Cupones, descuentos y costo de envío.

## 6. Criterios de finalización

- [ ] Los requisitos R1 a R21 están implementados o justificados como pendientes.
- [ ] Hay tests automáticos para el carrito, el total, la validación del pedido y el mensaje de WhatsApp.
- [ ] `npm test` y `npm run build` pasan sin errores.
- [ ] Ningún color escrito a mano fuera de `globals.css`.
- [ ] `WHATSAPP_NUMERO` y `DATABASE_URL` no aparecen en ningún archivo del repositorio.
- [ ] Se probó el flujo completo en celular real (360 px) y con el teclado.
- [ ] Se hizo un pedido de prueba y apareció en las tablas `pedidos` y `pedido_items` de Neon.
- [ ] `verificacion.md` marca cada requisito como cumple, no cumple o prueba manual pendiente.

## 7. Decisiones a confirmar (la estudiante decide)

| N.º | Decisión | Propuesta | Alternativa |
|---|---|---|---|
| D1 | ¿Se descuenta el stock al enviar el pedido? | **No.** La dueña confirma por WhatsApp y ajusta el stock a mano; así no se bloquea stock por pedidos que nunca se concretan | Descontar al guardar (más complejo, necesita cancelar y devolver) | Aceptado
| D2 | ¿Dónde se guarda el pedido mientras la clienta navega? | `localStorage` del navegador (sobrevive a recargas), solo ids, cantidades y datos para mostrar | Solo en memoria (se pierde al recargar) | Aceptado
| D3 | ¿Se vacía el pedido al enviarlo? | Sí, y se muestra el enlace por si WhatsApp no se abrió | Dejarlo hasta que la clienta lo vacíe | Aceptado
| D4 | ¿Se piden datos de la clienta? | No (R21) | Un campo opcional de nombre | Aceptado
