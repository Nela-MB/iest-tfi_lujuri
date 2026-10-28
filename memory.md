# memory: memoria del proyecto LujUri Boutique

> Responde a la pregunta: **¿Qué recuerda la IA de una sesión a otra?**
> Claude lee este archivo al empezar cada sesión, junto con `AGENTS.md`. Se actualiza a medida que el proyecto avanza.

## Resumen del proyecto

| Dato | Valor |
|---|---|
| Nombre | LujUri Boutique (siempre **LujUri**, junto y con la U mayúscula) |
| Qué es | Catálogo online de ropa para mujer, hombre y niños con pedido por WhatsApp |
| Eslogan | "Tu estilo, con cariño." |
| Stack | Next.js (React) + PostgreSQL (Neon) + Vitest + GitHub + Vercel |
| IA de desarrollo | Agente del chat de VS Code (GitHub Copilot); Claude (Anthropic) en chat aparte para specs, guiones e informe |
| Idioma | Textos en español rioplatense (voseo); código en español sin tildes |

## Decisiones tomadas

| Decisión | Motivo | Archivo |
|---|---|---|
| Variables CSS en `app/globals.css` | Un solo lugar para los colores y fuentes de la marca | `IDENTIDAD-MARCA.md` |
| Rosa Frambuesa `#C2415F` como color principal | Cumple contraste AA con texto blanco | `IDENTIDAD-MARCA.md` |
| Sin TypeScript, Tailwind ni Prisma por ahora | Mantener el proyecto simple | `03-TECNOLOGIAS.md` |
| Stock por talle y color en la tabla `variantes` | Una prenda puede estar agotada en un talle y no en otro | `05-DATOS.md` |
| Total del pedido calculado en el servidor | El navegador se puede manipular | `10-SEGURIDAD.md` |
| Precios en `$ 0` como marcador | No inventar datos | `AGENTS.md` |
| Pago por WhatsApp, sin pago online | Fuera del alcance por ahora | `01-CONTEXTO.md` |

## Estado actual

- [x] Identidad de marca definida (nombre, paleta, tipografías y tono).
- [x] Kit de especificación redactado (`AGENTS.md` y los once archivos de `docs/`).
- [x] Logo (circular, horizontal e isotipo), favicon y paleta definidos en `marca/`.
- [x] Repositorio público `iest-tfi_lujuri` creado en GitHub.
- [x] Constitución redactada (`docs/CONSTITUCION.md`).
- [x] Comandos `/spec`, `/clarificar`, `/verificar` y skills `verificar-criterios` y `revisar-marca` creados.
- [ ] Matriz de herramientas (Anexo I) y `docs/PROMPTS.md`.
- [ ] Proyecto Next.js creado.
- [ ] Base de datos creada en Neon.
- [ ] Catálogo, pedido y contacto programados.
- [ ] Sitio publicado en Vercel.

> La lista detallada de tareas está en `docs/08-TAREAS.md`.

## Datos que faltan (preguntar, no inventar)

- [ ] Número real de WhatsApp del negocio (va solo en `.env.local` y Vercel, en `WHATSAPP_NUMERO`).
- [ ] Ciudad o zona de entrega (para `09-SEO.md` y `/contacto`).
- [ ] Catálogo real: nombres, fotos, talles, colores y precios.
- [ ] Horarios de atención.

## Preferencias de trabajo

- Explicar los cambios en pocas líneas y con palabras simples.
- Mostrar qué archivos se crearon o modificaron.
- Pedir confirmación antes de borrar archivos o cambiar la estructura de carpetas.
- Revisar que los colores usen variables CSS y que el logo no se altere.

## Registro de sesiones

| Fecha | Qué se hizo | Qué sigue |
|---|---|---|
| 09-10-2026 | Se redactó el kit de especificación y el informe del TP N° 3 | Cargar el logo en `marca/` y empezar la Etapa 1 de `08-TAREAS.md` |
| 20-10-2026 | Se creó el repositorio del TFI, se corrigió el kit (carpeta `src/`, Vitest, variable `WHATSAPP_NUMERO`, número real fuera del repo) | Constitución, comandos, skills y primera spec |

## Cómo usar este archivo con el agente

El agente de VS Code lee `.github/copilot-instructions.md`, que le indica leer `AGENTS.md`, `memory.md` y `docs/CONSTITUCION.md`.

```text
Al terminar una sesión, pedirle al agente:
"Actualizá memory.md con lo que hicimos hoy".
```

> Una tarea, una conversación: lo que haya que recordar va acá, no al chat.
