# CONSTITUCIÓN: principios de LujUri Boutique

> Estos principios son cortos y comprobables. El agente de IA los lee **antes de cada spec, plan o tarea**. Si una tarea los contradice, se frena y se avisa.

| N.º | Principio | Cómo se comprueba |
|---|---|---|
| 1 | **Stack.** Solo se usa lo definido en `docs/03-TECNOLOGIAS.md`: Next.js, PostgreSQL, Vitest, GitHub y Vercel. Para sumar una tecnología, primero se edita ese archivo | `package.json` no incluye Tailwind, Bootstrap, TypeScript ni Prisma |
| 2 | **Marca.** Los colores y las fuentes salen de las variables CSS de `IDENTIDAD-MARCA.md`. El nombre se escribe siempre **LujUri** y el logo no se altera | Ningún código de color `#` fuera de `src/app/globals.css`; el logo es el de `public/marca/` |
| 3 | **Capas.** La base de datos se usa solo desde `src/lib/db.js` y las consultas SQL llevan siempre parámetros. Las páginas piden los datos a `src/app/api/` | Búsqueda en el código: las consultas SQL solo aparecen en `src/lib/` y `src/app/api/` |
| 4 | **Tests y commits.** Una tarea por vez, con el test primero. Un commit por tarea, con mensaje claro según `07-CONVENCIONES.md` | `npm test` y `npm run build` pasan sin errores; el historial muestra un commit por tarea |
| 5 | **Seguridad.** Ningún secreto en el repositorio ni en el chat con la IA. Los totales y las validaciones se hacen en el servidor | `.env.local` está en `.gitignore`; no aparecen `DATABASE_URL` ni el número real de WhatsApp en ningún archivo subido |
| 6 | **Idioma y tono.** Los textos del sitio están en español rioplatense, con voseo y el tono de la marca. Los nombres en el código van en español, sin tildes | Revisión de textos y de nombres según `07-CONVENCIONES.md` |
| 7 | **Accesibilidad.** Mobile first desde 360 px, contraste mínimo AA, texto alternativo en toda imagen y navegación con teclado | Informe de Lighthouse con 80 puntos o más en las cuatro categorías |
| 8 | **Uso responsable de la IA.** Toda línea de código se lee y se entiende antes de aceptarla. Las piezas generadas con IA llevan la leyenda «Generado con IA». No se generan personas reales ni se imitan marcas ni artistas. No se pegan datos personales ni claves en los prompts. Los datos de los gráficos son reales | Cada pieza tiene su ficha en `multimedia/FICHAS-IA.md`, `docs/DECLARACION-IA.md` está completa y los errores de la IA están registrados en `docs/PROMPTS.md` |
