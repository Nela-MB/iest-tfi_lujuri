# Tareas de la spec 001: Catálogo de prendas

> Fase 4 del ciclo SDD. Cada tarea dura menos de 30 minutos, lleva su «Listo cuando» y se cierra con **un commit**. Las funciones puras se hacen con **el test primero**.

## Lógica con tests

- [ ] **T1. `normalizarTexto`** (R6). Escribir primero `tests/normalizar.test.js` y después `src/lib/normalizar.js`.
  - Listo cuando: «Pantalón» y «pantalon» dan el mismo resultado y el test pasa.
- [ ] **T2. `calcularEstadoStock`** (R8, R9, R16). Test primero.
  - Listo cuando: sin variantes o stock 0 da «sin stock»; de 1 a 3, «quedan pocas»; de 4 o más, «disponible».
- [ ] **T3. Validaciones** (R12). Test primero para categoría y búsqueda.
  - Listo cuando: acepta `mujer`, `hombre` y `ninos`, rechaza otras, y rechaza búsquedas de más de 60 caracteres.
- [ ] **T4. `filtrarProductos`** (R4, R5, R6, R7). Test primero.
  - Listo cuando: filtra por categoría, por texto sin tildes y devuelve lista vacía si nada coincide.
- [ ] **T5. `formatearPrecio`** (R3). Test primero.
  - Listo cuando: `0` se muestra como `$ 0,00` y `1500` como `$ 1.500,00`.

## Datos y API

- [ ] **T6. `src/lib/productos.js`** (R1, R10, R13).
  - Listo cuando: devuelve las 3 prendas de prueba con sus variantes y la consulta usa parámetros.
- [ ] **T7. `app/api/productos/route.js`** (R12, R13).
  - Listo cuando: responde la lista, y responde error 400 con mensaje amable ante una categoría inválida.

## Pantallas

- [ ] **T8. `TarjetaPrenda` y etiqueta de stock** (R1, R2, R3, R8, R9, R16).
  - Listo cuando: muestra nombre, precio, etiqueta e isotipo si no hay foto, sin colores escritos a mano.
- [ ] **T9. `FiltroCategorias` y `Buscador`** (R4, R5, R6).
  - Listo cuando: los enlaces y el formulario cambian la dirección y se pueden usar con el teclado.
- [ ] **T10. Página `/catalogo`** (R1, R7, R14, R15).
  - Listo cuando: muestra la grilla, el mensaje de «sin resultados» y el de error de la base.
- [ ] **T11. Página `/catalogo/[id]`** (R10, R11).
  - Listo cuando: muestra talles y colores, y una prenda inexistente muestra «No encontramos esta prenda».
- [ ] **T12. `Encabezado` con logo y enlace al catálogo** (R15).
  - Listo cuando: aparece en todas las páginas con el logo horizontal y texto alternativo.

## Cierre

- [ ] **T13. Revisión de marca y accesibilidad.** Usar la skill `revisar-marca`.
  - Listo cuando: no hay colores a mano, hay texto alternativo en cada imagen y se probó en 360 px y con el teclado.
- [ ] **T14. Verificación y publicación.** Ejecutar `/verificar`, cargar `DATABASE_URL` en Vercel y publicar.
  - Listo cuando: `verificacion.md` está completo y el catálogo funciona en la dirección pública.
