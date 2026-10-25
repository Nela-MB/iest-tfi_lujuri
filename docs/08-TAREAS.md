# 08-TAREAS: en qué orden lo hacemos

> Responde a la pregunta: **¿En qué orden lo hacemos?**
> La IA trabaja **una tarea por vez** y la marca con `[x]` al terminarla.

## Etapa 1 · Preparación

- [ ] Crear el proyecto Next.js con JavaScript y el enrutador `src/app/`.
- [ ] Crear el repositorio en GitHub y subir la primera versión.
- [ ] Copiar las variables CSS de `IDENTIDAD-MARCA.md` en `src/app/globals.css`.
- [ ] Configurar las fuentes Sacramento, Cormorant Garamond y Montserrat.
- [ ] Copiar el logo y el favicon a `public/marca/`.
- [ ] Crear `.env.local` y agregarlo a `.gitignore`.
- [ ] Instalar Vitest y crear el script `npm test`.
- [ ] Crear `docs/CONSTITUCION.md`, `memory.md`, los comandos y las skills del agente.

## Etapa 2 · Base de datos

- [ ] Crear la base en Neon.
- [ ] Escribir `db/esquema.sql` y ejecutarlo.
- [ ] Escribir `db/datos-ejemplo.sql` con precios en `$ 0`.
- [ ] Crear `src/lib/db.js` como única conexión.
- [ ] Probar una consulta de prueba.

## Etapa 3 · Catálogo

- [ ] Crear `src/app/layout.js` con encabezado y pie de página (RF11).
- [ ] Crear la ruta `src/app/api/productos/route.js`.
- [ ] Escribir los tests de filtros y estado de stock (antes del código).
- [ ] Crear `TarjetaPrenda` con estado de stock (RF01, RF10).
- [ ] Crear `FiltroCategorias` (RF02) y `Buscador` (RF03).
- [ ] Crear la página `/catalogo`.
- [ ] Crear el detalle `/catalogo/[id]` con `SelectorTalleColor` (RF04, RF05).

## Etapa 4 · Pedido y WhatsApp

- [ ] Escribir los tests de cantidades, total y mensaje de WhatsApp (antes del código).
- [ ] Crear `PedidoContext` para guardar el pedido mientras se navega.
- [ ] Agregar, quitar y cambiar cantidades (RF06, RF07).
- [ ] Mostrar el contador en el encabezado.
- [ ] Crear `src/lib/whatsapp.js` que arme el mensaje y el enlace `wa.me` (RF08).
- [ ] Crear `src/app/api/pedidos/route.js` que valide, calcule el total y guarde (RF09).
- [ ] Crear la página `/pedido` con `ResumenPedido` y `BotonWhatsApp`.

## Etapa 5 · Inicio y contacto

- [ ] Crear la página de inicio con destacados y categorías (RF11).
- [ ] Escribir los tests de validación del formulario de consultas.
- [ ] Crear `src/app/api/consultas/route.js` (RF12).
- [ ] Crear la página `/contacto` con formulario (RF12).
- [ ] Agregar la información de entrega a domicilio (RF13).

## Etapa 6 · Calidad y publicación

- [ ] Agregar `metadata` única en cada página (`09-SEO.md`).
- [ ] Revisar el contraste y el texto alternativo de las imágenes.
- [ ] Probar en celular, tablet y computadora.
- [ ] Revisar las reglas de `10-SEGURIDAD.md`.
- [ ] Ejecutar `npm test` y `npm run build` sin errores.
- [ ] Generar el informe de Lighthouse (80 puntos o más en las cuatro categorías).
- [ ] Integrar las imágenes generadas con IA y su leyenda «Generado con IA».
- [ ] Cargar las variables de entorno en Vercel.
- [ ] Publicar en Vercel y probar el pedido completo.

## Tabla de avance

| Etapa | Nombre | Estado |
|---|---|---|
| 1 | Preparación | En Proceso |
| 2 | Base de datos | En Proceso |
| 3 | Catálogo | Pendiente |
| 4 | Pedido y WhatsApp | Pendiente |
| 5 | Inicio y contacto | Pendiente |
| 6 | Calidad y publicación | Pendiente |
