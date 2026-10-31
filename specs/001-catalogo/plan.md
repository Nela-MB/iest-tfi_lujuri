# Plan de la spec 001: Catálogo de prendas

> Fase 3 del ciclo SDD. Describe **cómo** se va a construir, sin código. Cada decisión apunta a los requisitos de `spec.md`.

## Enfoque

El catálogo se construye con **páginas de servidor** de Next.js. La categoría y la búsqueda viajan en la dirección (`/catalogo?categoria=mujer&q=remera`), así que no hace falta JavaScript del lado del navegador para filtrar, la página se puede compartir y Google puede leerla. La lógica se separa en **funciones puras** (fáciles de probar) y un único módulo que habla con la base.

## Módulos de lógica (`src/lib/`)

| Archivo | Responsabilidad | Requisitos |
|---|---|---|
| `normalizar.js` | Pasar un texto a minúsculas y sin tildes | R6 |
| `filtros.js` | Filtrar la lista por categoría y por texto de búsqueda | R4, R5, R6, R7 |
| `stock.js` | Calcular el estado de una prenda a partir de sus variantes (sin stock, quedan pocas o disponible) | R8, R9, R16 |
| `validaciones.js` | Validar la categoría (`mujer`, `hombre`, `ninos`) y el texto de búsqueda (hasta 60 caracteres) | R12 |
| `formato.js` | Mostrar precios con el formato `$ 0,00` | R3 |
| `productos.js` | Único módulo con SQL: lista de prendas activas con sus variantes y detalle por identificador | R1, R10, R11, R13 |

## Pantallas y componentes

| Pieza | Función | Requisitos |
|---|---|---|
| `src/app/catalogo/page.js` | Lee los parámetros de la dirección, pide las prendas, filtra y muestra la grilla | R1, R4, R5, R6, R7, R14, R15 |
| `src/app/catalogo/[id]/page.js` | Detalle de una prenda con talles, colores y estado de stock; página «no encontrada» si no existe | R10, R11 |
| `src/app/api/productos/route.js` | Devuelve las prendas en formato de datos, con validación y error 400 | R12, R13 |
| `TarjetaPrenda` | Foto (o isotipo), nombre, precio y etiqueta de stock | R1, R2, R3, R8, R9, R16 |
| `FiltroCategorias` | Enlaces «Todas», «Mujer», «Hombre» y «Niños» | R4, R5 |
| `Buscador` | Formulario simple con el campo de texto | R6 |
| `Encabezado` | Logo horizontal y navegación mínima al catálogo | R15 |

## Flujo de datos

1. La clienta abre `/catalogo` con o sin parámetros.
2. La página valida los parámetros con `validaciones.js`.
3. `productos.js` consulta la base con SQL parametrizado y devuelve las prendas activas con sus variantes.
4. `filtros.js` aplica la categoría y la búsqueda; `stock.js` calcula la etiqueta de cada prenda.
5. La página dibuja la grilla. Si la base falla, muestra el mensaje de R14.

## Estilos

- CSS Modules propios por componente, usando solo las variables de `globals.css`.
- Grilla: 1 columna en celular, 3 en tablet y 4 en computadora.
- Etiquetas de stock según `docs/06-DISENO-UI.md`.

## Estrategia de pruebas

- **Tests automáticos (Vitest) primero** para las funciones puras: `normalizar`, `filtros`, `stock`, `validaciones` y `formato`.
- **Prueba manual** del acceso a la base, de las pantallas en 360 px, del teclado y de la ruta inexistente.
- `npm test` y `npm run build` sin errores antes de la verificación.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| La búsqueda escribe SQL con texto del usuario | La búsqueda se hace en JavaScript sobre la lista ya cargada; el SQL solo usa parámetros |
| La base no responde | `try/catch` en `productos.js` y mensaje amable en la página |
| Imágenes rotas | Imagen de reemplazo con el isotipo |
| Datos de prueba con precio `$ 0` | Se muestran como marcador y queda anotado como pendiente |
