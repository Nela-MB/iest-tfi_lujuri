# Plan de la spec 005: Panel de administración

> Fase 3 del ciclo SDD. Describe **cómo** se va a construir, sin código. Cada decisión apunta a los requisitos de `spec.md`.

## Enfoque

Se agrega una zona `/admin` con las mismas capas que ya usás: **funciones puras con test primero**, un único módulo con SQL, rutas de API que validan en el servidor y pantallas de React. No se agregan tablas: se usan `productos` y `variantes`.

Tecnologías nuevas (se registran primero en `docs/03-TECNOLOGIAS.md`, tarea 0):

- **Vercel Blob** (paquete `@vercel/blob`) para guardar las fotos, porque Vercel no permite escribir archivos en `public/` una vez publicado el sitio.
- **Acceso propio con una clave y una cookie firmada**, hecho con el módulo `node:crypto` que ya trae Node. **No se instala ninguna librería de login.**

## Cómo funciona el acceso

1. La dueña escribe la clave en `/admin/login`.
2. La API compara la clave con `ADMIN_CLAVE` de forma segura (en tiempo constante, para que no se pueda adivinar por la demora).
3. Si coincide, el servidor crea un **token**: un texto con la fecha de vencimiento y una **firma** hecha con `ADMIN_SECRETO`. Lo guarda en una cookie que el navegador no puede leer con JavaScript (`httpOnly`).
4. En cada página y cada ruta de `/api/admin/`, el servidor revisa que el token exista, tenga la firma correcta y no esté vencido.
5. Si alguien cambia el token a mano, la firma deja de coincidir y se rechaza.

## Módulos de lógica (`src/lib/`)

| Archivo | Responsabilidad | Requisitos |
|---|---|---|
| `sesion.js` | Funciones puras: `crearToken`, `verificarToken` (firma y vencimiento) y `compararClave` (en tiempo constante) | R2, R3, R6 |
| `validaciones.js` (se amplía) | `validarProductoAdmin`, `validarVarianteAdmin` y `validarFoto` (tipo y tamaño), con mensajes amables en voseo | R8, R13, R18, R22 |
| `codigos.js` | `generarCodigoProducto(categoria, codigosExistentes)`: arma `MUJ-009`, `HOM-004`, `NIN-005` | R9 |
| `fotos.js` | Único módulo que habla con Vercel Blob: `subirFoto`, `borrarFoto`; arma un nombre de archivo seguro | R13 a R16 |
| `admin.js` | **Único módulo con SQL del panel**: listar todas las prendas con variantes, crear y actualizar prenda, activar o desactivar, crear, actualizar y quitar variante | R7 a R12, R18 a R21, R24 |
| `src/components/TarjetaPrenda.js` (se modifica) | `rutaImagen` acepta direcciones completas (`https://...`) además de nombres de archivo | R17 |

## Rutas de API (`src/app/api/admin/`)

| Ruta | Función | Requisitos |
|---|---|---|
| `login/route.js` | `POST`: compara la clave, espera 1 s si falla, crea la cookie | R2, R3, R4 |
| `logout/route.js` | `POST`: borra la cookie | R5 |
| `productos/route.js` | `POST`: crea prenda (datos y foto) | R8, R9, R13 a R15 |
| `productos/[id]/route.js` | `PATCH`: edita datos, activa o desactiva y reemplaza foto | R10, R11, R16 |
| `variantes/route.js` y `variantes/[id]/route.js` | `POST`, `PATCH` y `DELETE` de talles, colores y stock | R18 a R21 |

Cada ruta empieza comprobando la sesión (R6) y después valida.

## Pantallas y componentes

| Pieza | Función | Requisitos |
|---|---|---|
| `src/app/admin/login/page.js` | Formulario de clave | R1 a R4 |
| `src/app/admin/page.js` | Lista de prendas con estado, stock y botones | R7, R11, R25 |
| `src/app/admin/prenda/nueva/page.js` y `src/app/admin/prenda/[id]/page.js` | Crear y editar una prenda | R8, R10 |
| `FormularioPrenda` (componente de cliente) | Campos, vista previa de la foto y envío | R8, R10, R13, R26 |
| `EditorVariantes` (componente de cliente) | Agregar, editar stock y quitar talles y colores | R18 a R21, R23 |
| `BotonCerrarSesion` | Cierra la sesión | R5 |
| `src/app/admin/layout.js` | Revisa la sesión, agrega `noindex` y un encabezado simple del panel | R1, R25 |

## Flujo de datos de «cargar una prenda nueva»

1. La dueña entra a `/admin`, toca «Nueva prenda» y completa el formulario con la foto.
2. El navegador manda los datos y la foto a `POST /api/admin/productos`.
3. El servidor comprueba la sesión, valida los datos y la foto (tipo y tamaño).
4. `fotos.js` sube la foto a Vercel Blob y devuelve su dirección. Si falla, se corta acá y no se guarda nada.
5. `codigos.js` arma el código y `admin.js` guarda la prenda con la dirección de la foto.
6. La pantalla pasa a la edición de esa prenda para cargar talles, colores y stock.
7. En `/catalogo` la prenda aparece al recargar.

## Límites y limitaciones conocidas

- **Fuerza bruta:** en Vercel no se pueden contar intentos fallidos de forma confiable entre ejecuciones. Se mitiga con una espera de 1 segundo por intento y con una clave **larga** (se recomienda una frase de 20 caracteres o más). Queda anotado como limitación en el informe.
- **Foto de hasta 4 MB:** las fotos de celular suelen pesar más. La dueña puede achicarlas antes de subirlas (la mayoría de las galerías tiene la opción «reducir tamaño»). Mejorarlo es una tarea futura.
- **Dos personas editando a la vez:** gana el último guardado.

## Estilos

CSS Modules propios por componente, solo con variables de `globals.css`. El panel puede ser sobrio, pero respeta la marca: nombre **LujUri**, tipografías y colores definidos, tono en voseo. El logo no se altera.

## Estrategia de pruebas

- **Tests automáticos (Vitest) primero:** `sesion` (firma, vencimiento, token alterado, comparación de clave), validaciones de prenda, variante y foto, `generarCodigoProducto` y `rutaImagen` con direcciones completas.
- **Pruebas manuales:** ingresar con clave buena y mala, abrir `/api/admin/...` sin sesión (debe dar 401), cargar una prenda completa desde el celular, desactivarla, y ver que el catálogo cambie.
- `npm test` y `npm run build` sin errores antes de la verificación.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| La clave o el secreto se filtran | Solo en `.env.local` y Vercel, nunca con `NEXT_PUBLIC_`; revisión con `git grep` en la tarea de cierre |
| Cookie robada o falsificada | `httpOnly`, `secure`, `sameSite=strict`, firma con `ADMIN_SECRETO` y vencimiento de 8 h |
| Archivo malicioso disfrazado de foto | Validar tipo y tamaño en el servidor y generar el nombre del archivo en el servidor, nunca usar el nombre que manda el navegador |
| Alguien llega a una ruta de API sin pasar por la pantalla | Cada ruta de `/api/admin/` comprueba la sesión por su cuenta |
| Prenda borrada que está en pedidos | No se borran prendas; solo se desactivan (R12) |
| Fotos viejas quedan ocupando espacio | Se borra la foto anterior al reemplazarla (R16) |
| El repositorio es público | Ningún dato real en archivos; el ejemplo `.env.example` lleva valores falsos |
| Pérdida de acceso | La clave se cambia en Vercel y se hace un redeploy |

## Orden de trabajo

0. **Actualizar los documentos** (tarea 0).
1. Lógica pura con test primero: sesión, validaciones y códigos.
2. Módulos con servicios externos: fotos y SQL.
3. API de acceso y de prendas.
4. Pantallas.
5. Revisión, verificación y publicación.
