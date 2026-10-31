# Spec 001: Catálogo de prendas

> Fase 1 del ciclo SDD. Cubre los requerimientos **RF01, RF02, RF03, RF04 y RF10** de `docs/02-REQUERIMIENTOS.md`.
> Borrador redactado con ayuda de Claude (chat aparte) a partir de las especificaciones del proyecto. Las decisiones finales las toma la estudiante en `clarificacion.md`.

## 1. Contexto

Hoy las clientas de LujUri Boutique ven la ropa por Instagram y WhatsApp, sin un catálogo ordenado. Esta funcionalidad agrega las páginas `/catalogo` y `/catalogo/[id]`, donde se ven las prendas por categoría, se buscan por nombre y se consulta su disponibilidad. **No incluye** armar el pedido (spec 002).

Datos: tablas `productos` y `variantes` (`docs/05-DATOS.md`). Pantallas: `docs/06-DISENO-UI.md`.

## 2. Historias de usuario

- Como clienta, quiero ver todas las prendas con foto, nombre y precio, para elegir sin recorrer Instagram.
- Como clienta, quiero filtrar por mujer, hombre o niños, para ver solo lo que me interesa.
- Como clienta, quiero buscar una prenda por nombre, para encontrarla rápido.
- Como clienta, quiero saber si una prenda tiene stock, para no pedir algo que no hay.
- Como clienta, quiero ver el detalle de una prenda con sus talles y colores, para decidir.

## 3. Requisitos en notación EARS

| ID | Requisito | RF |
|---|---|---|
| R1 | Cuando la clienta abre `/catalogo`, el sistema deberá mostrar todas las prendas activas con foto, nombre y precio | RF01 |
| R2 | Si una prenda no tiene imagen, entonces el sistema deberá mostrar una imagen de reemplazo con el isotipo de la marca | RF01 |
| R3 | El sistema deberá mostrar los precios con el formato `$ 0,00` | RF01 |
| R4 | Cuando la clienta elige una categoría (mujer, hombre o niños), el sistema deberá mostrar solo las prendas de esa categoría | RF02 |
| R5 | Cuando la clienta elige "Todas", el sistema deberá mostrar las prendas de todas las categorías | RF02 |
| R6 | Cuando la clienta escribe en el buscador, el sistema deberá mostrar las prendas cuyo nombre contenga el texto, sin distinguir mayúsculas de minúsculas | RF03 |
| R7 | Si no hay prendas que coincidan con el filtro o la búsqueda, entonces el sistema deberá mostrar el mensaje «No encontramos prendas con esa búsqueda» | RF03 |
| R8 | Mientras todas las variantes de una prenda tengan stock 0, el sistema deberá mostrar la etiqueta «Por ahora no tenemos stock de este talle» | RF10 |
| R9 | Mientras el stock total de una prenda sea bajo (umbral por definir en la clarificación), el sistema deberá mostrar la etiqueta «Quedan pocas» | RF10 |
| R10 | Cuando la clienta abre `/catalogo/[id]`, el sistema deberá mostrar foto, nombre, descripción, precio, talles y colores de la prenda | RF04 |
| R11 | Si el identificador no existe o la prenda está inactiva, entonces el sistema deberá mostrar una página «No encontramos esta prenda» con un enlace al catálogo | RF04 |
| R12 | Si la categoría recibida no es `mujer`, `hombre` o `ninos`, o el texto de búsqueda supera 60 caracteres, entonces el sistema deberá responder con un error 400 y un mensaje amable, sin detalles técnicos | Seguridad |
| R13 | El sistema deberá leer los datos solo desde `src/app/api/productos/` y `src/lib/db.js`, con consultas SQL parametrizadas | Constitución |
| R14 | Si la base de datos no responde, entonces el sistema deberá mostrar el mensaje «No pudimos cargar el catálogo, probá de nuevo en un rato» | RNF |
| R15 | El sistema deberá mostrar la grilla en 1 columna en celular, 3 en tablet y 4 en computadora, con texto alternativo en cada imagen | RNF |

## 4. Casos límite

- Catálogo vacío (ninguna prenda activa).
- Prenda con `activo = false`: no debe aparecer en el catálogo ni en el detalle.
- Búsqueda con espacios al inicio o al final, o con los caracteres `%` y `_`, que tienen significado especial en SQL.
- Nombre de prenda muy largo en la tarjeta.
- Prenda con algunas variantes sin stock y otras con stock.
- Prenda sin ninguna variante cargada.
- Texto de búsqueda con tildes («pantalon» frente a «pantalón»).

## 5. Fuera de alcance

- Agregar prendas al pedido y elegir talle y color (spec 002).
- Orden por precio y paginación.
- Varias fotos por prenda.
- Panel de administración: las prendas se cargan con SQL.

## 6. Criterios de finalización

- [ ] Los requisitos R1 a R15 están implementados o justificados como pendientes.
- [ ] Hay tests automáticos para el filtro, la búsqueda, el cálculo del estado de stock y la validación de la API.
- [ ] `npm test` y `npm run build` pasan sin errores.
- [ ] Ningún color escrito a mano fuera de `globals.css`.
- [ ] Cada imagen tiene texto alternativo.
- [ ] Se probó en 360 px de ancho y con el teclado.
- [ ] `verificacion.md` marca cada requisito como cumple, no cumple o prueba manual pendiente.
