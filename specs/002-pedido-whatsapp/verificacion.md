# Verificación: Pedido por WhatsApp

Se contrastaron los requisitos R1–R21 de `spec.md` con el código y los tests existentes. No se hicieron pruebas manuales en celular, con teclado, contra Neon ni con WhatsApp.

| Requisito | RF | Resultado | Evidencia | Causa si falla |
|---|---|---|---|---|
| R1. Selector de talle y color en el detalle | RF05 | Prueba manual pendiente | `src/app/catalogo/[id]/page.js`, `src/components/SelectorTalleColor.js`, `tests/selector-talle-color.test.js` | — |
| R2. Botón desactivado y texto «Elegí talle y color» hasta completar la selección | RF05 | Prueba manual pendiente | `src/components/SelectorTalleColor.js` | — |
| R3. Variantes sin stock no elegibles y prenda agotada no agregable | RF10 | Cumple | `src/components/SelectorTalleColor.js`, `src/lib/selector-variantes.js`, `tests/selector-talle-color.test.js` | — |
| R4. Al agregar, actualizar contador y mostrar aviso accesible | RF06 | Prueba manual pendiente | `src/context/PedidoContext.js`, `src/components/ContadorPedido.js`, `src/components/SelectorTalleColor.js`, `tests/carrito.test.js` | — |
| R5. Sumar la variante existente, respetando máximo y stock | RF06 | Cumple | `src/lib/carrito.js`, `tests/carrito.test.js` | — |
| R6. Mostrar los datos de cada prenda del pedido | RF06 | Prueba manual pendiente | `src/components/ResumenPedido.js` | — |
| R7. Cambiar cantidades o quitar líneas y actualizar el pedido | RF06, RF07 | Cumple | `src/lib/carrito.js`, `src/context/PedidoContext.js`, `tests/carrito.test.js` | — |
| R8. Mostrar total con formato monetario y recalcularlo | RF07 | Cumple | `src/components/ResumenPedido.js`, `src/lib/carrito.js`, `src/lib/formato.js`, `src/lib/totales.js`, `tests/carrito.test.js`, `tests/totales.test.js`, `tests/formato.test.js` | — |
| R9. Estado vacío con enlace al catálogo y sin botón de WhatsApp | RF06 | Prueba manual pendiente | `src/components/ResumenPedido.js`, `src/components/BotonWhatsApp.js` | — |
| R10. Conservar el pedido al navegar y recargar | RF06 | Prueba manual pendiente | `src/context/PedidoContext.js`, `src/lib/carrito.js`, `tests/pedido-context.test.js` | — |
| R11. Enviar al servidor solo identificadores de variante y cantidades | RF08, Seguridad | Cumple | `src/lib/carrito.js`, `src/app/api/pedidos/route.js`, `tests/pedido-pantalla.test.js`, `tests/api-pedidos.test.js` | — |
| R12. Validar líneas, IDs, cantidades, variantes activas y stock | RF08, Seguridad | Cumple | `src/lib/validaciones.js`, `src/lib/pedidos.js`, `src/app/api/pedidos/route.js`, `tests/validaciones.test.js`, `tests/api-pedidos.test.js` | — |
| R13. Responder 400 con un mensaje amable que identifique la prenda problemática | Seguridad | No cumple | `src/lib/validaciones.js`, `src/app/api/pedidos/route.js`, `tests/api-pedidos.test.js` | Spec: se exige identificar la prenda incluso si el ítem recibido es inválido y no permite identificarla; esos casos devuelven un mensaje genérico. |
| R14. Obtener precios de la base, calcular total y guardar pedido y líneas | RF09 | Cumple | `src/lib/pedidos.js`, `src/lib/totales.js`, `src/app/api/pedidos/route.js`, `tests/api-pedidos.test.js` | — |
| R15. Guardar pedido y líneas de forma atómica | RF09 | Prueba manual pendiente | `src/lib/pedidos.js` (un único `WITH`/sentencia SQL); no hay test específico del guardado atómico | — |
| R16. Armar mensaje y enlace codificado con `WHATSAPP_NUMERO` | RF08 | Cumple | `src/lib/whatsapp.js`, `src/app/api/pedidos/route.js`, `tests/whatsapp.test.js`, `tests/api-pedidos.test.js` | — |
| R17. Si falta `WHATSAPP_NUMERO`, responder 500 sin guardar | Seguridad | Cumple | `src/app/api/pedidos/route.js`, `tests/api-pedidos.test.js` | — |
| R18. Ante error de guardado, mostrar error, no abrir WhatsApp y conservar el pedido | RNF | Cumple | `src/app/api/pedidos/route.js`, `src/components/BotonWhatsApp.js`, `tests/api-pedidos.test.js` | — |
| R19. Envío exitoso: abrir WhatsApp, vaciar pedido y mostrar enlace alternativo | RF08 | Prueba manual pendiente | `src/components/BotonWhatsApp.js`, `src/context/PedidoContext.js` | — |
| R20. Uso desde 360 px y teclado, controles de al menos 44 × 44 px, color WhatsApp de marca y voseo | RNF | Prueba manual pendiente | `src/components/SelectorTalleColor.module.css`, `src/components/ResumenPedido.module.css`, `src/components/BotonWhatsApp.module.css`, `src/components/ContadorPedido.module.css` | — |
| R21. No guardar datos personales de la clienta | Seguridad | Cumple | `src/app/api/pedidos/route.js`, `src/lib/pedidos.js`, `tests/api-pedidos.test.js` | — |

## Resumen

- Cumplen: 11 de 21.
- No cumplen: R13 (1).
- Pruebas manuales pendientes: R1, R2, R4, R6, R9, R10, R15, R19 y R20.
- `npm test`: pasó; 12 archivos y 112 tests.
- `npm run build`: pasó; compilación, lint y generación de páginas sin errores.
- Revisión de constitución en `src`: los colores literales encontrados están en `src/app/globals.css`; las consultas SQL del pedido están en `src/lib/pedidos.js` y usan parámetros. `.env.local` no está versionado. No se leyó ni modificó; Next.js lo cargó automáticamente durante `npm run build`, sin mostrar sus valores.
- No se verificó un pedido en Neon ni se probó la apertura del enlace en un dispositivo real. Esas comprobaciones siguen pendientes.
- Recomendación: aclarar R13 para separar errores que sí permiten identificar una prenda de errores de formato que no; luego completar las pruebas manuales y contra Neon antes de publicar.
