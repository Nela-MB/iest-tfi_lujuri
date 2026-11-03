# Tareas de la spec 002: Pedido por WhatsApp

> Fase 4 del ciclo SDD. Cada tarea dura menos de 30 minutos, lleva su «Listo cuando» y se cierra con **un commit**. Las funciones puras se hacen con **el test primero**. Una tarea por conversación con el agente.

## Lógica con tests

- [x] **T1. `carrito.js`** (R4, R5, R7, R8). Escribir primero `tests/carrito.test.js` y después `src/lib/carrito.js`.
  - Listo cuando: agregar una variante nueva crea la línea; agregar la misma suma cantidades sin pasar de 20 ni del stock; cambiar cantidad y quitar funcionan; contar y total orientativo dan bien; ninguna función modifica la lista original.
  - Commit: `agrega funciones del carrito con tests`

- [x] **T2. `validarItemsPedido`** (R12, R13). Test primero en `tests/validaciones.test.js`.
  - Listo cuando: acepta de 1 a 20 líneas válidas; rechaza lista vacía, más de 20 líneas, ids negativos, decimales o texto, cantidad 0, 21 o decimal, y variantes repetidas.
  - Commit: `agrega validacion de los items del pedido`

- [x] **T3. `totales.js`** (R12, R14). Test primero.
  - Listo cuando: `calcularTotalPedido` suma precio × cantidad con decimales correctos; `revisarStock` devuelve las líneas sin stock suficiente (o lista vacía si todo alcanza).
  - Commit: `agrega calculo de total y revision de stock del pedido`

- [x] **T4. `whatsapp.js`** (R16, R17). Test primero.
  - Listo cuando: el mensaje respeta el formato de `docs/02-REQUERIMIENTOS.md`; el enlace usa solo dígitos del número (`+54 9 11-1234` → `54911…`); el texto queda codificado con tildes, `&`, `#` y saltos de línea; sin número devuelve un error claro. Los tests usan un número **inventado**, nunca el real.
  - Commit: `agrega el mensaje y el enlace de whatsapp con tests`

## Datos y API

- [X] **T5. `src/lib/pedidos.js`** (R12, R14, R15).
  - Listo cuando: busca variantes con su prenda, precio y stock usando parámetros; guarda pedido y líneas en una sola operación; devuelve el id del pedido. Probado a mano con un pedido de prueba que aparece en Neon. 
  prueba manual con la base pendiente: se hace junto con T6 y T11
  - Commit: `crea el modulo de pedidos con sql parametrizado`

- [ ] **T6. `src/app/api/pedidos/route.js`** (R11 a R18, R21).
  - Listo cuando: responde `{ enlace, total, pedidoId }` con un pedido válido; responde 400 amable ante datos inválidos o sin stock; responde 500 amable si falta `WHATSAPP_NUMERO` (sin guardar) o si falla la base; ignora cualquier precio del navegador.
  - Commit: `crea la api de pedidos`

## Pantallas

- [ ] **T7. `PedidoContext` y `ContadorPedido`** (R4, R10).
  - Listo cuando: el contador aparece en el encabezado de todas las páginas, sube al agregar y se conserva al recargar; con datos corruptos en `localStorage` arranca en 0 sin errores.
  - Commit: `agrega el estado del pedido y el contador en el encabezado`

- [ ] **T8. `SelectorTalleColor` en `/catalogo/[id]`** (R1, R2, R3, R4).
  - Listo cuando: el botón está desactivado hasta elegir talle y color; las variantes sin stock no se pueden elegir; al agregar aparece el aviso y sube el contador; se maneja con teclado.
  - Commit: `agrega el selector de talle y color al detalle`

- [ ] **T9. `ResumenPedido`, `BotonWhatsApp` y `/pedido`** (R6 a R9, R18 a R20).
  - Listo cuando: se ve la lista con subtotales y total; se cambian cantidades y se quitan prendas; el pedido vacío muestra su mensaje; el botón se desactiva mientras envía, abre WhatsApp, vacía el pedido y muestra «¡Gracias!»; los errores se ven con `role="alert"`.
  - Commit: `crea la pagina de pedido con envio por whatsapp`

## Cierre

- [ ] **T10. Revisión de marca, seguridad y accesibilidad.** Usar la skill `revisar-marca` y repasar `docs/10-SEGURIDAD.md`.
  - Listo cuando: no hay colores a mano, ningún secreto en el repositorio (`git grep` del número y de `DATABASE_URL`), se probó en 360 px y con teclado.
  - Commit: `revisa marca y seguridad del pedido`

- [ ] **T11. Verificación y publicación.** Ejecutar `/verificar`, cargar `WHATSAPP_NUMERO` en Vercel, publicar y hacer un pedido real de prueba desde el celular.
  - Listo cuando: `verificacion.md` está completo, el pedido aparece en Neon y WhatsApp se abre con el mensaje correcto.
  - Commit: `verifica y publica la spec 002`

## Al terminar cada tarea

Marcar `[x]` acá, y al cierre de la sesión pedirle al agente: «Actualizá `memory.md` con lo que hicimos hoy».
