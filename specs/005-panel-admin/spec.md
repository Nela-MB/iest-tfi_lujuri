# Spec 005: Panel de administración

> Fase 1 del ciclo SDD. Agrega el requerimiento nuevo **RF15** (ver tarea 0 de `PROMPTS-COPILOT-004-005.md`).
> Borrador redactado con ayuda de Claude (chat aparte). Las decisiones finales las toma la estudiante (ver sección 7).
> **Esta spec contradice reglas vigentes** (`AGENTS.md`, `01-CONTEXTO.md`, `03-TECNOLOGIAS.md` y la spec 001). Por eso la tarea 0 actualiza esos documentos **antes** de escribir código.

## 1. Contexto

Hoy las prendas se cargan con scripts SQL (`db/catalogo-real.sql`), lo que obliga a abrir Neon y escribir código cada vez que llega ropa nueva. Esta funcionalidad agrega un **panel de administración** en `/admin`, al que entra solo la dueña con una clave, para:

- subir la **foto** de cada prenda,
- cargar **nombre, descripción, categoría, precio**,
- cargar **talles, colores y stock** de cada prenda,
- **activar o desactivar** prendas,

todo desde formularios, sin tocar SQL.

Datos: tablas `productos` y `variantes` (`docs/05-DATOS.md`); **no hace falta crear tablas nuevas**. Seguridad: `docs/10-SEGURIDAD.md` (se amplía en la tarea 0).

## 2. Historias de usuario

- Como dueña, quiero ingresar con una clave, para que nadie más pueda cambiar el catálogo.
- Como dueña, quiero subir la foto de una prenda desde el celular o la computadora, para no tocar archivos ni código.
- Como dueña, quiero cargar el nombre, la descripción, el precio y la categoría, para publicar la prenda.
- Como dueña, quiero cargar talles, colores y stock, para que las clientas elijan bien.
- Como dueña, quiero cambiar el precio o el stock cuando haga falta, y ocultar una prenda que ya no vendo.
- Como dueña, quiero marcar si una foto fue generada con IA, para que el sitio muestre la leyenda.

## 3. Requisitos en notación EARS

### Acceso

| ID | Requisito | RF |
|---|---|---|
| R1 | Cuando alguien abre una página de `/admin` sin sesión válida, el sistema deberá llevarla a `/admin/login` | RF15 |
| R2 | Cuando la dueña ingresa la clave correcta, el sistema deberá crear una sesión en una cookie `httpOnly`, `secure` (en producción) y `sameSite=strict`, que vence a las 8 horas, y llevarla a `/admin` | RF15, Seguridad |
| R3 | Si la clave es incorrecta, entonces el sistema deberá responder «La clave no es correcta», esperar 1 segundo antes de responder y no revelar ningún otro dato | Seguridad |
| R4 | Si faltan las variables `ADMIN_CLAVE` o `ADMIN_SECRETO`, entonces el sistema no deberá crear sesión y deberá responder «El acceso no está disponible por ahora» | Seguridad |
| R5 | Cuando la dueña toca «Cerrar sesión», el sistema deberá borrar la cookie y llevarla a `/admin/login` | RF15 |
| R6 | El sistema deberá comprobar la sesión **en el servidor** en cada ruta de `/api/admin/` y responder 401 si no es válida, aunque la pantalla ya haya controlado el acceso | Seguridad |

### Prendas

| ID | Requisito | RF |
|---|---|---|
| R7 | Cuando la dueña abre `/admin`, el sistema deberá listar **todas** las prendas (activas e inactivas) con foto, nombre, categoría, precio, stock total y estado | RF15 |
| R8 | Cuando la dueña crea una prenda, el sistema deberá pedir nombre (obligatorio, hasta 120 caracteres), descripción (hasta 500), categoría (`mujer`, `hombre` o `ninos`), precio (número de 0 a 9.999.999,99), foto, «foto generada con IA», «destacada» y «activa» | RF15 |
| R9 | El sistema deberá generar solo el código interno de la prenda según su categoría (por ejemplo `MUJ-009`), sin pedírselo a la dueña | RF15 |
| R10 | Cuando la dueña edita una prenda, el sistema deberá permitir cambiar todos sus datos y reemplazar la foto | RF15 |
| R11 | Cuando la dueña desactiva una prenda, el sistema deberá ocultarla del catálogo sin borrarla, y deberá poder volver a activarla | RF15 |
| R12 | El sistema no deberá permitir borrar prendas, porque pueden estar en pedidos ya guardados | Datos |

### Fotos

| ID | Requisito | RF |
|---|---|---|
| R13 | Cuando la dueña sube una foto, el sistema deberá aceptar solo JPG, PNG o WEBP de hasta 4 MB, comprobándolo en el servidor por tipo y por tamaño | Seguridad |
| R14 | El sistema deberá guardar la foto en el almacenamiento externo (Vercel Blob) y guardar en `productos.imagen` su dirección completa | RF15 |
| R15 | Si la subida de la foto falla, entonces el sistema no deberá guardar la prenda y deberá mostrar «No pudimos subir la foto, probá de nuevo» | RNF |
| R16 | Cuando se reemplaza la foto de una prenda, el sistema deberá borrar la foto anterior del almacenamiento si estaba guardada allí | Costos |
| R17 | El catálogo y el detalle deberán mostrar tanto las fotos nuevas (dirección completa) como las anteriores de `public/media/prendas/`, sin cambios visibles | RF15 |

### Talles, colores y stock

| ID | Requisito | RF |
|---|---|---|
| R18 | Cuando la dueña agrega una variante, el sistema deberá pedir talle (hasta 10 caracteres), color (hasta 30) y stock (entero de 0 a 9999) | RF15 |
| R19 | Si ya existe una variante con el mismo talle y color en esa prenda, entonces el sistema deberá rechazarla con un mensaje amable | RF15 |
| R20 | Cuando la dueña cambia el stock de una variante, el sistema deberá guardarlo y el catálogo deberá reflejarlo al recargar | RF15 |
| R21 | Cuando la dueña quita una variante que nunca fue pedida, el sistema deberá borrarla; si ya aparece en pedidos, deberá dejarla con stock 0 y avisarlo | Datos |

### Transversales

| ID | Requisito | RF |
|---|---|---|
| R22 | El sistema deberá validar **todos** los datos en el servidor y devolver errores en voseo, indicando qué campo corregir, sin detalles técnicos | Seguridad |
| R23 | Antes de desactivar una prenda o quitar una variante, el sistema deberá pedir confirmación | UX |
| R24 | Las consultas SQL del panel deberán vivir solo en un módulo de `src/lib/` y usar siempre parámetros | Constitución |
| R25 | Las páginas de `/admin` no deberán indexarse (`noindex`) ni tener enlace desde el menú público | Seguridad |
| R26 | El panel deberá usarse desde el celular (360 px) y con teclado: etiqueta visible en cada campo, botones de 44 × 44 px y mensajes con `role="alert"` o `role="status"` | RNF |
| R27 | `ADMIN_CLAVE`, `ADMIN_SECRETO` y el token del almacenamiento no deberán aparecer en el repositorio ni llevar el prefijo `NEXT_PUBLIC_` | Seguridad |

## 4. Casos límite

- Precio con coma o punto («15000,50» y «15000.50»), negativo, texto o vacío.
- Foto de otro tipo (PDF, GIF), de más de 4 MB, vacía, o con nombre raro (`..`, espacios, tildes).
- Nombre con solo espacios, o más largo que 120 caracteres.
- Dos pestañas abiertas editando la misma prenda (gana el último guardado).
- Sesión vencida a mitad de un formulario: debe pedir ingresar de nuevo sin perder la pantalla de forma confusa.
- Prenda sin variantes (queda «sin stock» en el catálogo, ya contemplado por la spec 001).
- Cambiar la categoría de una prenda existente (el código interno no cambia).
- Almacenamiento externo caído o variable del token ausente.
- Variante que ya está en un pedido (R21).
- Intentos repetidos de clave incorrecta (ver limitación en el plan).

## 5. Fuera de alcance

- Varios usuarios, roles o registro de personas (hay una sola clave de administración).
- Ver y administrar los **pedidos** (una futura spec 006).
- Varias fotos por prenda.
- Recortar o achicar fotos automáticamente (se pide una foto de hasta 4 MB).
- Importar productos desde planillas.
- Recuperar la clave por correo: si se pierde, se cambia en Vercel.

## 6. Criterios de finalización

- [ ] La tarea 0 (actualizar documentos) está hecha y aprobada **antes** del código.
- [ ] R1 a R27 implementados o justificados como pendientes.
- [ ] Hay tests automáticos para la sesión, la comparación de clave, las validaciones, el código automático y el manejo de fotos.
- [ ] `npm test` y `npm run build` pasan sin errores.
- [ ] Ninguna ruta de `/api/admin/` responde datos sin sesión (probado a mano).
- [ ] Se cargó una prenda de prueba completa desde el celular, y se ve en el catálogo publicado.
- [ ] `ADMIN_CLAVE`, `ADMIN_SECRETO` y el token de Blob están cargados en Vercel y no en el repositorio (`git grep`).
- [ ] `verificacion.md` marca cada requisito como cumple, no cumple o prueba manual pendiente.

## 7. Decisiones a confirmar (la estudiante decide)

| N.º | Decisión | Propuesta | Alternativa | Mi decisión |
|---|---|---|---|---|
| D1 | ¿Dónde se guardan las fotos subidas? | Vercel Blob | Guardarlas en Neon como datos binarios | Aceptada: propuesta |
| D2 | ¿Cómo se ingresa? | Una sola clave compartida (ADMIN_CLAVE) | Usuarios con correo y contraseña | Aceptada: propuesta |
| D3 | ¿Se pueden borrar prendas? | No, solo desactivar | Borrar solo las que nunca fueron pedidas | Aceptada: propuesta |
| D4 | ¿Límite de la foto? | 4 MB (Vercel limita los datos a una ruta a 4,5 MB) | Subida directa desde el navegador, más compleja | Aceptada: propuesta |
| D5 | ¿Código interno de prenda? | Automático por categoría | Que la dueña lo escriba | Aceptada: propuesta |
| D6 | ¿Ver pedidos en el panel? | No ahora; se hace en una spec 006 | Incluirlo ya | Aceptada: propuesta |