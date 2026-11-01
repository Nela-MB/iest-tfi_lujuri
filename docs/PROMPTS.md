# PROMPTS: registro de pedidos importantes y errores de la IA

> Este archivo documenta cómo se dirigió a la IA y en qué se equivocó. Se actualiza a medida que avanza el trabajo.
> Los campos entre corchetes `[completar]` los completa la estudiante con lo que realmente vio o hizo.

## Herramientas usadas

| Herramienta | Para qué se usó |
|---|---|
| Claude (chat aparte) | Redactar specs, planes, tareas, guiones y revisar documentos |
| Agente del chat de VS Code | Escribir tests y código de cada tarea |
| Gemini y Canva (Contenido Mágico) | Generar imágenes |
| Runway | Prueba de video; el modelo requería plan pago, no se generó ningún clip |

## Pedidos más importantes

| N.º | Fecha | Herramienta | Para qué | Pedido (resumen o texto) | Resultado y decisión de la estudiante |
|---|---|---|---|---|---|
| P1 | 28/10/2026 | Claude | Armar la constitución y el arnés del agente | Principios cortos y comprobables, tres comandos y dos skills para el editor | Se aceptaron; se ajustó el principio 3 después de la clarificación |
| P2 | 31/10/2026 | Claude | Redactar la spec 001 en notación EARS | Spec del catálogo a partir de `02-REQUERIMIENTOS.md` y `06-DISENO-UI.md` | Se aceptó el borrador; la estudiante decidió los 7 hallazgos de la clarificación |
| P3 | 31/10/2026 | Agente de VS Code | Implementar la tarea T1 | «Leé AGENTS.md y docs/CONSTITUCION.md. Hacé solo la tarea T1 de specs/001-catalogo/tasks.md: escribí primero el test de normalizarTexto en tests/ y después la función en src/lib/normalizar.js. Explicame qué hiciste y no ejecutes comandos sin avisarme.» | Creó el test y la función; no pudo ejecutar el test por un problema del entorno (ver E1). La estudiante revisó los dos archivos |
| P4 | 28/10/2026 | Gemini | Imágenes de prendas, entrega y mockups | Prompts de `multimedia/PROMPTS-IMAGENES.md` | Se descartaron varias por errores (ver E2) y se escribió una segunda ronda de prompts |
| P5 | `[completar]` | `[completar]` | `[completar]` | `[completar]` | `[completar]` |

## Errores de la IA

### E5. Un archivo de configuración enviado sin las dependencias

| Campo | Detalle |
|---|---|
| Herramienta | Claude (chat aparte) |
| Qué hizo mal | En un archivo comprimido incluyó un `package.json` de ejemplo sin las dependencias de Next, React y Neon. Al descomprimirlo, pisó el archivo real del proyecto |
| Cómo se detectó | Al revisar el `package-lock.json` se vio que solo figuraba Vitest. `[versel no mostro error]` |
| Cómo se corrigió | Se reinstalaron las dependencias con `npm install` y se verificaron con `npm test` y `npm run build` antes de subir los cambios |
| Aprendizaje | No copiar archivos de configuración sin compararlos con los propios. Pedir solo los archivos nuevos y verificar cada commit |

### E1. Versión de Vitest incompatible con la versión de Node

| Campo | Detalle |
|---|---|
| Herramienta | Claude (chat aparte) y agente de VS Code |
| Qué hizo mal | Claude indicó instalar Vitest con `npm install -D vitest` sin considerar la versión de Node del equipo (v20.16.0). Se instaló una versión nueva que no arrancaba por la falta de una pieza nativa (`@rolldown/binding-wasm32-wasi`). Además, el primer intento del agente de ejecutar el test falló por un problema de su ejecutor, así que nunca se llegó a ver el test en rojo antes de escribir la función |
| Cómo se detectó | El agente informó con honestidad que no podía confirmar que el test pasara y explicó el motivo; la estudiante le mostró el mensaje a Claude |
| Cómo se corrigió | Se instaló una versión anterior con `npm install -D vitest@2` y se volvió a ejecutar `npm test`. Resultado: `[completar: pegar lo que dijo npm test]` |
| Aprendizaje | Antes de instalar una herramienta hay que comprobar la versión de Node (`node --version`). Pedirle a la IA que verifique compatibilidades, y no aceptar el comando sin mirarlo |

### E2. Imágenes con personajes protegidos, textos inventados y logo redibujado

| Campo | Detalle |
|---|---|
| Herramienta | Gemini |
| Qué hizo mal | En la imagen del notebook dibujó en la lámpara un personaje de historieta reconocible (con derechos de autor). En la ropa de niños inventó letras sin sentido en las remeras y en la ropa de hombre agregó calaveras y alas que no corresponden a una marca delicada. En varias escenas redibujó el logo con otra tipografía o con el nombre separado («Luj Uri») |
| Cómo se detectó | Revisión de cada imagen con la Tabla 3 del TFI (textos, coherencia de marca) y con las reglas de propiedad intelectual |
| Cómo se corrigió | Se descartaron esas imágenes y se escribió una «Ronda 2» de prompts con restricciones explícitas: prendas lisas, sin personajes ni letras, superficies sin logo. El logo oficial se agrega después, a mano, en Canva. `[completar: confirmar si ya se regeneraron]` |
| Aprendizaje | La IA agrega elementos que nadie pidió. Hay que revisar cada pieza y ser explícita en lo que no debe aparecer |

### E3. Contradicciones entre los archivos de especificación

| Campo | Detalle |
|---|---|
| Herramienta | Claude (chat aparte) |
| Qué hizo mal | Al redactar `03-TECNOLOGIAS.md` nombró la variable del número de WhatsApp como `NEXT_PUBLIC_WHATSAPP` (visible en el navegador), mientras `10-SEGURIDAD.md` la llamaba `WHATSAPP_NUMERO` (privada). También quedaron dos rutas distintas para las fotos de las prendas, y la IA de desarrollo figuraba como OpenCode en un archivo y como Claude en otro |
| Cómo se detectó | Revisión cruzada de los archivos del kit al empezar el Trabajo Final y, para las fotos, en la clarificación de la spec 001 |
| Cómo se corrigió | Se unificó la variable en `WHATSAPP_NUMERO`, se eligió `public/media/prendas/` y se dejó el agente de VS Code como herramienta de programación, con Claude como apoyo aparte |
| Aprendizaje | Con varios archivos, la IA puede contradecirse. La clarificación y la revisión humana son necesarias |

### E4. Una corrección de la spec que no se aplicó y pasó desapercibida

| Campo | Detalle |
|---|---|
| Herramienta | Claude (chat aparte) |
| Qué hizo mal | Al actualizar `spec.md` tras la clarificación, el script de edición falló a mitad de camino (buscaba un texto que no coincidía). Los otros archivos se escribieron, pero la spec quedó **sin actualizar** y Claude no lo advirtió en ese momento |
| Cómo se detectó | Claude revisó la salida del comando, vio el error, y comprobó que el requisito R16 no figuraba en el archivo |
| Cómo se corrigió | Se volvió a ejecutar la actualización con el texto exacto y se verificó que aparecieran los cambios |
| Aprendizaje | No dar por hecho que un cambio se aplicó: comprobarlo mirando el archivo |

## Incidentes de seguridad

| Incidente | Qué pasó | Cómo se resolvió |
|---|---|---|
| Contraseña de la base visible | En capturas enviadas al chat se vio parte de `DATABASE_URL`, y VS Code adjuntó `.env.local` como contexto del chat del agente | Se cerró la pestaña, se quitó el adjunto del chat y se restableció la contraseña en Neon. `[completar: confirmar que se cambió la contraseña]` |
| Número de WhatsApp en un repositorio público | `10-SEGURIDAD.md` incluía un número real | Se reemplazó por `+54XXXXXXXXXX`. El número sigue en el historial de commits anteriores. `[completar: decidir si se limpia el historial]` |

## Lista de control para esta entrega

- [x] Al menos 3 errores de la IA documentados (hay 4).
- [ ] Completar los campos `[completar]`.
- [ ] Agregar los pedidos más importantes que falten (por ejemplo, de las tareas T2 en adelante).
- [ ] Documentar una corrección de sesgo en las imágenes con personas.
