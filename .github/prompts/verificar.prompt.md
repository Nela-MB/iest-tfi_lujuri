---
description: Verifica cada requisito de una funcionalidad contra el código y los tests (fase 6 del ciclo SDD)
agent: agent
---
# /verificar: validar la funcionalidad contra su spec

Usá la skill `verificar-criterios` (en `.agents/skills/verificar-criterios/`). Si no te dije la funcionalidad, preguntame cuál.

Pasos:

1. Leé `specs/NNN-nombre/spec.md` y `tasks.md`.
2. Revisá el código y los tests relacionados. **No modifiques código**: solo verificá.
3. Pedime permiso antes de ejecutar `npm test` o `npm run build`, y explicame qué hace cada comando.
4. Marcá cada requisito como **Cumple**, **No cumple** o **Prueba manual pendiente**, con la evidencia (archivo, test o paso manual).
5. Para cada "No cumple", indicá si la falla es **del código** o **de la spec**.
6. Guardá el informe en `specs/NNN-nombre/verificacion.md`.

Terminá con un resumen: cuántos requisitos cumplen, cuáles no y qué recomendás hacer primero.
