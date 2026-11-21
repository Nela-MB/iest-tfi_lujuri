# Tareas de la spec 005: Panel de administración

> Fase 4 del ciclo SDD. Cada tarea dura menos de 30 minutos, lleva su «Listo cuando» y se cierra con **un commit**. Las funciones puras se hacen con **el test primero**. Una tarea por conversación con el agente.

## Tarea 0 · Documentos primero

- [x] **T0. Actualizar la documentación** (ver «Prompt T0» en `PROMPTS-COPILOT-004-005.md`).
  - Listo cuando: `AGENTS.md`, `docs/01-CONTEXTO.md`, `02-REQUERIMIENTOS.md` (RF14 y RF15), `03-TECNOLOGIAS.md` (Vercel Blob y acceso propio), `04-ARQUITECTURA.md`, `10-SEGURIDAD.md`, `.env.example` y `memory.md` están actualizados y **vos los leíste y aprobaste**.
  - Commit: `actualiza la documentacion para sumar el panel de administracion`

## Lógica con tests

- [ ] **T1. `sesion.js`** (R2, R3, R6). Test primero.
  - Listo cuando: un token creado con un secreto se verifica; uno vencido, alterado o firmado con otro secreto se rechaza; `compararClave` acepta la clave correcta y rechaza la incorrecta, vacía o `undefined`. Los tests usan secretos y claves **inventados**.
  - Commit: `agrega la sesion firmada del panel con tests`

- [ ] **T2. Validaciones del panel** (R8, R13, R18, R22). Test primero en `tests/validaciones.test.js`.
  - Listo cuando: `validarProductoAdmin` controla nombre, descripción, categoría y precio (acepta «15000,50» y «15000.50»); `validarVarianteAdmin` controla talle, color y stock; `validarFoto` acepta JPG, PNG y WEBP de hasta 4 MB y rechaza el resto. Los mensajes están en voseo.
  - Commit: `agrega validaciones de prenda, variante y foto`

- [ ] **T3. `codigos.js`** (R9). Test primero.
  - Listo cuando: con `MUJ-008` existente da `MUJ-009`; sin códigos da `MUJ-001`; mujer, hombre y niños usan `MUJ`, `HOM` y `NIN`; ignora códigos de otras categorías o mal formados.
  - Commit: `agrega el codigo automatico de prendas`

- [ ] **T4. `rutaImagen` con direcciones completas** (R17). Test primero.
  - Listo cuando: una dirección `https://...` se usa tal cual, un nombre de archivo sigue yendo a `/media/prendas/`, y sin imagen se usa el isotipo. Si hace falta, mover `rutaImagen` a `src/lib/` para poder testearla.
  - Commit: `permite fotos con direccion completa en el catalogo`

## Datos, fotos y API

- [ ] **T5. `src/lib/admin.js`** (R7 a R12, R18 a R21, R24).
  - Listo cuando: lista todas las prendas con sus variantes, crea y actualiza prendas, activa y desactiva, crea y actualiza variantes y quita variantes (borra si nunca se pidió; si no, deja el stock en 0). Todo con parámetros. Probado a mano con una prenda de prueba.
  - Commit: `crea el modulo sql del panel de administracion`

- [ ] **T6. `src/lib/fotos.js`** (R13 a R16). Antes: instalar `@vercel/blob` (el comando lo leés y lo aprobás vos) y crear el almacén en Vercel.
  - Listo cuando: sube una foto y devuelve su dirección, borra una foto, arma un nombre de archivo seguro generado en el servidor y no usa nunca el nombre que manda el navegador.
  - Commit: `agrega la subida de fotos con vercel blob`

- [ ] **T7. API de acceso** (`api/admin/login` y `logout`) (R2 a R5, R27).
  - Listo cuando: clave correcta crea la cookie y clave incorrecta responde el mensaje del requisito tras 1 segundo; sin variables responde «El acceso no está disponible por ahora»; cerrar sesión borra la cookie.
  - Commit: `crea el acceso y cierre de sesion del panel`

- [ ] **T8. API de prendas y variantes** (R6, R8, R10 a R15, R18 a R22).
  - Listo cuando: cada ruta responde 401 sin sesión; valida en el servidor; si falla la foto no se guarda la prenda; los errores son amables; se probó con `curl` sin sesión y desde la pantalla.
  - Commit: `crea la api de prendas y variantes del panel`

## Pantallas

- [ ] **T9. Login y estructura de `/admin`** (R1, R3, R5, R25, R26).
  - Listo cuando: sin sesión todo `/admin` lleva al login; tras ingresar se ve el panel; «Cerrar sesión» funciona; las páginas llevan `noindex` y no hay enlace desde el menú público.
  - Commit: `crea el login y el layout del panel`

- [ ] **T10. Lista de prendas** (R7, R11, R23).
  - Listo cuando: muestra todas las prendas con foto, categoría, precio, stock y estado; permite activar y desactivar con confirmación; se ve bien en 360 px.
  - Commit: `crea la lista de prendas del panel`

- [ ] **T11. Formulario de prenda y editor de variantes** (R8, R10, R13, R18 a R21, R26).
  - Listo cuando: se crea y edita una prenda con foto y vista previa; se agregan, editan y quitan talles y colores; los errores aparecen junto al campo; se usa con teclado y en el celular.
  - Commit: `crea el formulario de prenda y el editor de variantes`

## Cierre

- [ ] **T12. Revisión de marca y seguridad.** Skill `revisar-marca` y repaso de `docs/10-SEGURIDAD.md`.
  - Listo cuando: no hay colores a mano, no hay secretos en el repositorio (`git grep`), ninguna ruta de `/api/admin/` responde sin sesión y las páginas del panel no se indexan.
  - Commit: `revisa marca y seguridad del panel`

- [ ] **T13. Verificación y publicación.** `/verificar`, cargar `ADMIN_CLAVE`, `ADMIN_SECRETO` y el token de Blob en Vercel, redeploy y prueba desde el celular.
  - Listo cuando: `verificacion.md` está completo y cargaste una prenda real desde el celular que se ve en el catálogo publicado.
  - Commit: `verifica y publica la spec 005`

## Al terminar cada tarea

Marcar `[x]` acá solo si está **probada**, y al cierre de la sesión pedirle al agente: «Actualizá `memory.md` con lo que hicimos hoy».
