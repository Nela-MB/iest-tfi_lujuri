---
description: Revisa la spec como QA y registra cada decisión de la estudiante (fase 2 del ciclo SDD)
agent: agent
---
# /clarificar: revisar la spec antes de planificar

Leé `docs/CONSTITUCION.md` y la `spec.md` de la funcionalidad indicada (si no te dije cuál, preguntame).

Actuá como una persona de QA que busca problemas **sin cambiar la spec todavía**. Buscá:

- Ambigüedades o palabras vagas ("rápido", "fácil").
- Contradicciones con otros archivos de `docs/` o con la constitución.
- Casos límite que faltan.
- Requisitos que no se pueden probar.
- Datos que falta definir (preguntar, no inventar).

Presentá los hallazgos numerados. Para cada uno: qué encontraste, por qué importa y **una propuesta** de solución.

Después **esperá**: la decisión es mía. Por cada hallazgo, yo respondo: aceptar, rechazar o modificar.

Con mis respuestas, creá `specs/NNN-nombre/clarificacion.md` con una tabla `Hallazgo | Propuesta de la IA | Decisión de la estudiante` y actualizá la `spec.md` solo con lo que yo aprobé. No tomes decisiones por mí.
