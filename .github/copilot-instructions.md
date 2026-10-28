# Instrucciones permanentes para el agente de VS Code

Este archivo lo lee el agente del editor en cada conversación. Es el equivalente de `CLAUDE.md` para este proyecto.

Antes de hacer cualquier cosa, leé:

1. `AGENTS.md` (índice y reglas del proyecto)
2. `memory.md` (decisiones y estado actual)
3. `docs/CONSTITUCION.md` (principios que no se negocian)

## Resumen de reglas

- Una tarea por conversación; lo que haya que recordar se anota en `memory.md`, no en el chat.
- Tests primero y un commit por tarea.
- Colores y fuentes solo con las variables CSS de `docs/IDENTIDAD-MARCA.md`.
- La base de datos solo se usa desde `src/lib/db.js`, con SQL parametrizado.
- Nunca pedir ni escribir claves, contraseñas ni el número real de WhatsApp.
- No ejecutar comandos sin avisar qué hacen. Si algo no está claro, preguntar antes de inventar.

## Comandos disponibles (escribir `/` en el chat)

| Comando | Para qué |
|---|---|
| `/spec` | Redactar la spec de una funcionalidad en `specs/NNN-nombre/spec.md` |
| `/clarificar` | Revisar la spec como QA y registrar las decisiones de la estudiante |
| `/verificar` | Comprobar cada requisito contra el código y los tests |
