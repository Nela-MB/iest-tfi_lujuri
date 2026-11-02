# Clarificación de la spec 001: Catálogo de prendas

> Fase 2 del ciclo SDD. La IA (Claude, en un chat aparte) revisó `spec.md` como control de calidad y propuso 7 hallazgos. **La estudiante decidió cada uno.**

| N.º | Hallazgo de la IA | Propuesta de la IA | Decisión de la estudiante | Efecto |
|---|---|---|---|---|
| 1 | R9 no definía cuánto es «poco stock» | «Quedan pocas» con 1 a 3 unidades de stock total | **Aceptado** | R9 actualizado; se agregó R16 («Disponible» con 4 o más) |
| 2 | La búsqueda no encontraba «pantalon» al escribir sin tilde | Comparar sin tildes ni mayúsculas con una función simple y testeable | **Aceptado** | R6 actualizado; nueva función `normalizarTexto` con tests |
| 3 | No estaba definido qué mostrar de una prenda sin variantes | Tratarla como «sin stock» y mostrarla igual, sin permitir pedirla | **Aceptado** | R8 actualizado |
| 4 | `05-DATOS.md` indicaba `public/img/prendas/` y `04-ARQUITECTURA.md` indicaba `public/media/` | Usar `public/media/prendas/` | **Aceptado** | `05-DATOS.md` corregido |
| 5 | La constitución exigía que las páginas pidieran los datos a la API, lo que duplica pasos y no ayuda al SEO | Opción B: un único módulo `src/lib/productos.js` que usa `db.js` y es llamado por páginas y API | **Aceptado (opción B)** | R13 actualizado; ver «Cambio» abajo |
| 6 | Mostrar «$ 0,00» podría confundir en un catálogo real | Mantener `$ 0,00` como marcador, según `AGENTS.md`, y anotar que faltan los precios reales | **Aceptado** | R3 actualizado; pendiente en `memory.md` |
| 7 | Las prendas de prueba no tienen foto | Usar el isotipo como imagen de reemplazo hasta cargar fotos reales | **Aceptado** | R2 actualizado |

## Cambio incorporado primero en la especificación (fase 7)

El hallazgo 5 contradecía el principio 3 de `docs/CONSTITUCION.md`. Siguiendo el ciclo SDD, **primero se editaron los documentos y después se escribirá el código**:

- `docs/CONSTITUCION.md`: principio 3 reescrito («las consultas SQL viven en módulos de `src/lib/`»).
- `docs/04-ARQUITECTURA.md`: se agregaron `productos.js`, `filtros.js`, `normalizar.js`, `stock.js` y `formato.js`.
- `AGENTS.md`: la regla de acceso a la base se ajustó al nuevo principio.
- `docs/05-DATOS.md`: ruta de las fotos corregida.

## Qué decidió la IA y qué decidió la estudiante

La IA propuso los hallazgos y una solución para cada uno. La estudiante pidió explicaciones de los puntos 4 y 5, comparó las dos opciones de arquitectura y eligió.

## Cambio posterior durante el desarrollo (fase 7)

Al cargar las primeras fotos del catálogo, la estudiante detectó un requisito nuevo: algunas fotos son reales y otras fueron generadas con IA, y las generadas con IA deben estar identificadas (Actividad 5 del Trabajo Final).

| Qué se detectó | Decisión | Dónde se cambió primero |
|---|---|---|
| Hace falta distinguir las fotos generadas con IA | Agregar el campo `imagen_ia` a `productos` y mostrar la leyenda «Imagen generada con IA» | `spec.md` (requisito R17) y `docs/05-DATOS.md`; después el código |
