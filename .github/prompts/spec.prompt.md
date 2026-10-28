---
description: Redacta la spec de una funcionalidad en notación EARS (fase 1 del ciclo SDD)
agent: agent
---
# /spec: redactar la especificación de una funcionalidad

Leé primero `AGENTS.md`, `memory.md`, `docs/CONSTITUCION.md`, `docs/02-REQUERIMIENTOS.md` y los archivos de `docs/` que correspondan a la funcionalidad.

Si no te dije cuál es la funcionalidad, preguntame cuál. Si falta información, hacé **una pregunta por vez** (máximo 5) y esperá mi respuesta. No inventes datos.

Después creá `specs/NNN-nombre/spec.md` (NNN es el número correlativo, por ejemplo `001-catalogo`) con estas secciones:

1. **Contexto**: para qué sirve y qué RF de `02-REQUERIMIENTOS.md` cubre.
2. **Historias de usuario**: "Como clienta, quiero... para...".
3. **Requisitos en notación EARS**, numerados, cada uno con su RF. Formatos permitidos:
   - Siempre: "El sistema deberá ..."
   - Evento: "Cuando <evento>, el sistema deberá ..."
   - Estado: "Mientras <estado>, el sistema deberá ..."
   - No deseado: "Si <situación no deseada>, entonces el sistema deberá ..."
   - Opcional: "Donde <característica>, el sistema deberá ..."
4. **Casos límite**: por ejemplo, sin stock, cantidad inválida, texto vacío.
5. **Fuera de alcance**.
6. **Criterios de finalización**: lista de casillas `- [ ]` comprobables.

Reglas: no escribas código; cada requisito debe poder probarse; respetá la marca, la seguridad y el stack de la constitución. Al terminar, resumí en tres líneas lo que quedó escrito y sugerime pasar a `/clarificar`.
