# Plan y tareas de la spec 004: Quiénes somos

> Fases 3 y 4 del ciclo SDD en un solo archivo, porque la funcionalidad es chica. Si tu consigna pide archivos separados, copiá cada parte a `plan.md` y `tasks.md`.

## Plan

### Enfoque

Una página de servidor de Next.js, sin base de datos. El texto vive en el propio archivo de la página para poder editarlo fácil. El encabezado agrega solo la interactividad necesaria para el menú hamburguesa en pantallas chicas. Se reutilizan las variables de `globals.css` y se siguen los patrones de `src/app/inicio.module.css`.

### Piezas

| Archivo | Qué hace | Requisitos |
|---|---|---|
| `src/app/quienes-somos/page.js` | Página con `metadata`, un `<h1>`, historia, «Cómo trabajamos», redes y botón al catálogo | R1 a R4, R6, R7 |
| `src/app/quienes-somos/quienes.module.css` | Estilos propios, solo con variables de la marca | R9 |
| `src/components/Encabezado.js` (se modifica) | Agrega el enlace «Quiénes somos» al menú | R5 |
| `src/components/PieDePagina.js` (se modifica) | Agrega el mismo enlace al pie | R5 |
| `src/components/Encabezado.js` (se modifica) | En pantallas menores a 768 px, permite abrir y cerrar el menú hamburguesa y mantiene visible «Mi pedido (N)» | R11, R12 |

### Estrategia de pruebas

Es una página estática, así que no hay lógica para testear con Vitest. Las pruebas son:

- `npm run build` sin errores.
- Revisión manual en 360 px y con teclado.
- Pruebas del menú: accesibilidad del botón, apertura/cierre con Enter y Espacio, cierre con Escape y al elegir un enlace, y visibilidad del contador.
- Skill `revisar-marca`.
- Controlar que cada dato del texto esté confirmado (R7).

### Riesgos

| Riesgo | Mitigación |
|---|---|
| La IA inventa historia, años o cifras | El prompt prohíbe inventar; se usan solo los datos de la sección 7 de la spec y de `docs/01-CONTEXTO.md` |
| Escribir el nombre mal | La skill `revisar-marca` controla **LujUri** |
| Enlaces a redes equivocados | La estudiante confirma cada enlace antes del commit |

## Tareas

- [x] **T1. Página `/quienes-somos`** (R1 a R4, R6 a R10).
  - Listo cuando: la página abre en `localhost:3000/quienes-somos`, tiene un solo `<h1>`, `metadata` propia, solo datos confirmados, y se ve bien en 360 px.
  - Commit: `crea la pagina quienes somos`

- [x] **T2. Enlaces en el encabezado y el pie** (R5).
  - Listo cuando: «Quiénes somos» aparece en el menú y en el pie, se puede usar con teclado y no rompe el diseño del encabezado en 360 px.
  - Commit: `agrega el enlace a quienes somos en el menu y el pie`

- [x] **T2b. Menú hamburguesa en pantallas chicas** (R11, R12).
  - Listo cuando: en menos de 768 px los enlaces se esconden detrás del botón de tres rayitas; el menú abre y cierra, se cierra con Escape y al elegir un enlace; «Mi pedido (N)» sigue visible; en pantallas grandes el menú queda como está; se usa con teclado.
  - Commit: `agrega el menu hamburguesa en pantallas chicas`

  - [ ] **T2c. Resaltar la sección actual en el menú** (R13). Test primero.
  - Listo cuando: una función pura decide qué enlace está activo (Inicio solo en `/`, Catálogo en `/catalogo` y en `/catalogo/4`, Quiénes somos en `/quienes-somos`); el enlace activo se ve distinto sin depender solo del color y lleva `aria-current="page"`, en el menú desplegable y en la fila de pantallas grandes.
  - Commit: `resalta la seccion actual en el menu`

- [ ] **T3. Revisión y publicación.** Usar la skill `revisar-marca`, correr `npm test` y `npm run build`, y probar en el celular.
  - Listo cuando: la tabla de la skill no marca faltantes y la página funciona en la dirección pública de Vercel.
  - Commit: `revisa marca y publica quienes somos`
