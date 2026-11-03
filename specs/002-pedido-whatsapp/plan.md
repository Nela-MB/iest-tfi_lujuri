# Plan de la spec 002: Pedido por WhatsApp

> Fase 3 del ciclo SDD. Describe **cómo** se va a construir, sin código. Cada decisión apunta a los requisitos de `spec.md`.

## Enfoque

El pedido vive en el navegador mientras la clienta elige (un **contexto de React** guardado en `localStorage`) y viaja al servidor **una sola vez**, al tocar «Enviar pedido por WhatsApp». El servidor es el que manda: valida, busca los precios en la base, calcula el total, guarda y arma el enlace de WhatsApp. El navegador nunca decide un precio ni conoce el número del negocio hasta que recibe el enlace ya armado.

La lógica se separa en **funciones puras** (fáciles de probar, con test primero) y un único módulo nuevo que escribe SQL, igual que en la spec 001.

## Módulos de lógica (`src/lib/`)

| Archivo | Responsabilidad | Requisitos |
|---|---|---|
| `carrito.js` | Funciones puras del pedido en el navegador: agregar (suma si ya existe, tope de 20 y de stock), cambiar cantidad, quitar, contar prendas, calcular total orientativo | R4, R5, R7, R8 |
| `validaciones.js` (se amplía) | `validarItemsPedido(items)`: de 1 a 20 líneas, `variante_id` entero positivo, cantidad entera de 1 a 20, sin variantes repetidas | R12, R13 |
| `pedidos.js` | **Único módulo con SQL del pedido**: busca las variantes pedidas con su prenda y precio, y guarda pedido y líneas en un solo paso | R12, R14, R15 |
| `totales.js` | `calcularTotalPedido(lineas)`: suma `precio × cantidad` con los precios de la base; `revisarStock(lineas)`: detecta líneas sin stock suficiente | R12, R13, R14 |
| `whatsapp.js` | `armarMensajeWhatsApp(lineas, total)` y `armarEnlaceWhatsApp(numero, mensaje)`: normaliza el número a dígitos y codifica el texto | R16, R17 |

## Pantallas, componentes y rutas

| Pieza | Función | Requisitos |
|---|---|---|
| `src/context/PedidoContext.js` | Estado del pedido (usa `carrito.js`), lectura y guardado en `localStorage` con `try/catch`, arranca vacío si los datos están rotos | R4, R5, R7, R10 |
| `SelectorTalleColor` | Elegir talle y color, botón «Agregar a mi pedido» desactivado hasta elegir, variantes sin stock no elegibles, aviso `role="status"` | R1, R2, R3, R4 |
| `ContadorPedido` | Enlace «Mi pedido (N)» dentro de `Encabezado`; es un componente de cliente porque lee el contexto | R4 |
| `ResumenPedido` | Lista de líneas, cantidades, quitar y total | R6, R7, R8, R9 |
| `BotonWhatsApp` | Envía los ids y cantidades a `/api/pedidos`, se desactiva mientras envía, abre el enlace, muestra errores | R11, R18, R19 |
| `src/app/pedido/page.js` | Página «Mi pedido» que une `ResumenPedido` y `BotonWhatsApp`, con título y descripción propios | R6 a R9, R19 |
| `src/app/catalogo/[id]/page.js` (se modifica) | Agrega el `SelectorTalleColor` debajo de la lista de talles | R1, R3 |
| `src/app/layout.js` (se modifica) | Envuelve la página con el proveedor del pedido | R10 |
| `src/app/api/pedidos/route.js` | `POST`: valida, pide datos a `pedidos.js`, calcula el total, guarda, arma el enlace y responde | R11 a R18 |

## Flujo de datos

1. En `/catalogo/[id]`, la clienta elige talle y color y agrega la prenda. `carrito.js` actualiza el contexto y `localStorage`.
2. En `/pedido`, la clienta ajusta cantidades y quita prendas. El total que ve es **orientativo** (calculado con los precios que el navegador recibió al armar la página).
3. Al tocar «Enviar», el navegador manda `[{ variante_id, cantidad }]` a `POST /api/pedidos`.
4. La API valida el formato con `validaciones.js` (400 si falla) y comprueba que exista `WHATSAPP_NUMERO` (500 si falta, antes de guardar).
5. `pedidos.js` trae las variantes con su prenda, precio y stock. `totales.js` revisa el stock (400 si algo no alcanza) y calcula el total real.
6. `pedidos.js` guarda el pedido y sus líneas **en una sola operación** (R15).
7. `whatsapp.js` arma el mensaje y el enlace. La API responde `{ enlace, total, pedidoId }`.
8. El navegador abre el enlace, vacía el pedido y muestra «¡Gracias!».

## Decisión técnica: guardado atómico (R15)

`db.js` usa el modo HTTP de Neon, que no admite una transacción abierta entre varias llamadas. Dos caminos válidos:

- **Opción A (propuesta):** una sola consulta SQL con un `WITH` que inserta el pedido y, en la misma sentencia, las líneas a partir de arreglos de parámetros. No cambia `db.js`.
- **Opción B:** ampliar `db.js` para exportar una función de transacciones de Neon. Es más legible pero toca la única conexión.

Se le pide a Copilot que explique la opción elegida antes de escribirla, y la estudiante la lee y la aprueba.

## Estilos

- CSS Modules propios por componente, solo con variables de `globals.css`.
- Botón principal: `var(--color-principal)` con texto blanco. Botón de WhatsApp: `var(--color-whatsapp)` con texto `var(--color-texto)`.
- Áreas táctiles de 44 × 44 px o más; mobile first desde 360 px. Un solo `<h1>` por página.

## Estrategia de pruebas

- **Tests automáticos (Vitest) primero:** `carrito`, `validarItemsPedido`, `totales` y `whatsapp`.
- **Prueba manual:** el flujo completo en celular real, el pedido guardado en Neon, el envío con la variable de WhatsApp ausente y con datos viejos en `localStorage`.
- `npm test` y `npm run build` sin errores antes de la verificación.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| El navegador manda un precio o total falso | La API ignora todo salvo `variante_id` y `cantidad`; los precios salen de la base |
| Pedido a medias si falla el guardado | Guardado en una sola operación (opción A o B) |
| Dos pedidos por doble toque | Botón desactivado mientras envía |
| Enlace de WhatsApp mal codificado | `encodeURIComponent` y tests con tildes, `&`, `#` y saltos de línea |
| Se filtra el número o la base | Variables sin `NEXT_PUBLIC_`; el número solo se usa en `whatsapp.js` del servidor |
| `localStorage` con datos viejos o corruptos | `try/catch` y validación al leer; si falla, el pedido empieza vacío |
| Hidratación de Next.js (el servidor no ve `localStorage`) | Leer el almacenamiento dentro de `useEffect` y mostrar el contador recién cuando cargó |
