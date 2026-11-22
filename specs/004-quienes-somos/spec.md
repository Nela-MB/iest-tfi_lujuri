# Spec 004: Quiénes somos

> Fase 1 del ciclo SDD. Agrega un requerimiento nuevo: **RF14** (ver tarea 0 de `PROMPTS-COPILOT-004-005.md`, que lo suma a `docs/02-REQUERIMIENTOS.md`).
> Borrador redactado con ayuda de Claude (chat aparte). Las decisiones y los datos reales los aporta la estudiante.

## 1. Contexto

Hoy la clienta que llega desde Instagram o Google no encuentra quién está detrás de LujUri Boutique. Esta funcionalidad agrega la página `/quienes-somos`, donde se cuenta la historia del emprendimiento, cómo se trabaja (catálogo, pedido por WhatsApp, entrega a domicilio) y cómo contactarse. Genera confianza antes de comprar.

Es una página **estática** (sin base de datos). Pantallas y marca: `docs/06-DISENO-UI.md` e `docs/IDENTIDAD-MARCA.md`. SEO: `docs/09-SEO.md`.

## 2. Historias de usuario

- Como clienta nueva, quiero saber quién vende y cómo trabajan, para confiar antes de hacer un pedido.
- Como clienta, quiero ver cómo se hace un pedido y cómo es la entrega, para saber qué esperar.
- Como clienta, quiero un acceso directo a WhatsApp, para consultar sin vueltas.

## 3. Requisitos en notación EARS

| ID | Requisito | RF |
|---|---|---|
| R1 | Cuando la clienta abre `/quienes-somos`, el sistema deberá mostrar el nombre de la marca, el eslogan «Tu estilo, con cariño.» y la historia del emprendimiento | RF14 |
| R2 | El sistema deberá mostrar una sección «Cómo trabajamos» con los pasos: elegís en el catálogo, armás tu pedido, lo enviás por WhatsApp y coordinamos pago y entrega a domicilio | RF14 |
| R3 | El sistema deberá mostrar enlaces a Instagram (`@luj_uri`) y a las demás redes que la estudiante confirme, con texto accesible y abriendo en pestaña nueva con `rel="noopener noreferrer"` | RF14 |
| R4 | El sistema deberá mostrar un botón «Ver el catálogo» que lleve a `/catalogo` | RF14 |
| R5 | El menú del encabezado y el pie de página deberán incluir el enlace «Quiénes somos» | RF14 |
| R6 | La página deberá tener un único `<h1>`, título y descripción propios (`metadata`) y usar etiquetas semánticas | RNF06 |
| R7 | El sistema no deberá mostrar ningún dato que no esté confirmado por la estudiante (años, cantidad de clientas, premios, ciudad) | AGENTS |
| R8 | Si se muestra una imagen o ilustración, deberá llevar texto alternativo; si fue generada con IA, la leyenda «Imagen generada con IA» | Constitución |
| R9 | La página deberá verse bien desde 360 px, con contraste AA y todos los textos en voseo con el tono de la marca | RNF |
| R10 | El número de WhatsApp no deberá escribirse en el código: si hay botón de WhatsApp, deberá usar el flujo ya existente del sitio o el enlace de Instagram | Seguridad |
| R11 | Cuando la pantalla mide menos de 768 px, el encabezado deberá mostrar el logo, el contador «Mi pedido (N)» y un botón con tres rayitas (menú hamburguesa) que despliegue los enlaces Inicio, Catálogo y Quiénes somos | RF14, RNF |
| R12 | El botón del menú deberá ser accesible: nombre «Abrir menú» o «Cerrar menú», `aria-expanded`, área táctil de 44 × 44 px, uso con teclado (Enter y Espacio), cierre con Escape y cierre al elegir un enlace | RNF |
| R13 | El enlace de la página donde está la clienta deberá verse diferenciado en el menú, tanto en la fila de pantallas grandes como en el desplegable, con un estilo que no dependa solo del color (por ejemplo negrita y subrayado o una barra al costado) y con `aria-current="page"`. En una página interna, como una prenda del catálogo, deberá quedar marcado «Catálogo» | RF14, RNF |

## 4. Casos límite

- Texto largo en pantalla de 360 px (no debe cortarse ni desbordar).
- Imagen que no carga (la página debe seguir siendo legible).
- Navegación solo con teclado.

## 5. Fuera de alcance

- Formulario de contacto (spec 003).
- Fotos reales del equipo o del local, si todavía no están (se suman cuando existan).
- Panel para editar este texto: se edita en el código.

## 6. Criterios de finalización

- [ ] R1 a R12 implementados o justificados.
- [ ] Todos los datos del texto están confirmados por la estudiante.
- [ ] `npm test` y `npm run build` pasan.
- [ ] Skill `revisar-marca` aplicada: sin colores a mano, sin errores de nombre (siempre **LujUri**).
- [ ] Se probó en 360 px y con teclado.
- [ ] Se comprobó el menú hamburguesa por debajo de 768 px: apertura, cierre, tecla Escape y selección de un enlace; el contador «Mi pedido (N)» permanece visible.

## 7. Datos que faltan (respondelos vos, no los inventa la IA)

| N.º | Dato | Tu respuesta |
|---|---|---|
| 1 | ¿Cómo y cuándo empezó LujUri? (una o dos frases reales) | LujUri comenzó en 2023 como un emprendimiento familiar, con la idea de llevar variedad, moda y precios accesibles. |
| 2 | ¿Quién está detrás? ¿Se muestra el nombre o solo «el equipo de LujUri»? | El equipo de LujUri. |
| 3 | ¿Qué las diferencia? | Atención personalizada, entrega a domicilio y cariño en cada elección para vos. |
| 4 | ¿Se puede nombrar la ciudad? | Sí: Tinogasta, Catamarca. |
| 5 | ¿Qué redes tienen además de `@luj_uri`? | Ninguna otra. La única red es Instagram: https://www.instagram.com/luj_uri/ |
| 6 | ¿Hay una foto real para la página? | No tenemos. La página usa solo el logo de la marca. |