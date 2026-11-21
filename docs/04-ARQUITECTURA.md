# 04-ARQUITECTURA: cómo se organiza el código de LujUri Boutique

> Responde a la pregunta: **¿Cómo se organiza el código?**
> Proyecto Next.js con el enrutador `app/` dentro de `src/`, escrito en JavaScript (sin TypeScript, por ahora).

## Árbol de carpetas

```text
iest-tfi_lujuri/
├── AGENTS.md · memory.md · README.md
├── docs/                        ← especificaciones y documentos del proceso
│   ├── CONSTITUCION.md · PROMPTS.md · DECLARACION-IA.md
│   ├── IDENTIDAD-MARCA.md
│   └── 01-CONTEXTO.md … 10-SEGURIDAD.md
├── specs/                       ← una carpeta por funcionalidad (ciclo SDD)
│   ├── 001-catalogo/            ← spec · clarificacion · plan · tasks · verificacion
│   ├── 002-pedido-whatsapp/
│   ├── 003-consultas/
│   ├── 004-quienes-somos/       ← spec · plan · tareas
│   └── 005-panel-admin/         ← spec · plan · tareas
├── .github/                     ← arnés del agente (VS Code)
│   ├── copilot-instructions.md  ← instrucciones permanentes (equivale a CLAUDE.md)
│   └── prompts/                 ← comandos: spec · clarificar · verificar (.prompt.md)
├── .agents/skills/              ← skills propias
│   ├── verificar-criterios/SKILL.md
│   └── revisar-marca/SKILL.md
├── src/
│   ├── app/
│   │   ├── layout.js            ← encabezado, pie, fuentes y <html lang="es">
│   │   ├── globals.css          ← variables CSS de la marca
│   │   ├── page.js              ← inicio
│   │   ├── catalogo/
│   │   │   ├── page.js          ← catálogo con filtros y buscador
│   │   │   └── [id]/page.js     ← detalle de una prenda
│   │   ├── pedido/page.js       ← resumen del pedido y envío por WhatsApp
│   │   ├── contacto/page.js     ← formulario de consulta
│   │   ├── quienes-somos/page.js← historia y presentación de LujUri
│   │   ├── admin/
│   │   │   ├── layout.js        ← verifica la sesión y agrega noindex
│   │   │   ├── page.js          ← lista todas las prendas
│   │   │   ├── login/page.js    ← ingreso con la clave
│   │   │   └── prenda/
│   │   │       ├── nueva/page.js← carga una prenda nueva
│   │   │       └── [id]/page.js ← edita prenda y variantes
│   │   └── api/
│   │       ├── productos/route.js   ← lista de prendas (con filtros)
│   │       ├── pedidos/route.js     ← valida, calcula el total, guarda y arma el enlace
│   │       ├── consultas/route.js   ← guarda las consultas
│   │       └── admin/
│   │           ├── login/route.js  ← crea la sesión
│   │           ├── logout/route.js ← cierra la sesión
│   │           ├── productos/route.js ← crea prendas
│   │           ├── productos/[id]/route.js ← edita prendas
│   │           ├── variantes/route.js ← crea variantes
│   │           └── variantes/[id]/route.js ← edita o quita variantes
│   ├── components/
│   │   ├── Encabezado.js        ← logo, menú y contador del pedido
│   │   ├── PieDePagina.js       ← contacto, redes y entrega
│   │   ├── TarjetaPrenda.js     ← foto, nombre, precio y estado de stock
│   │   ├── FiltroCategorias.js  ← mujer, hombre y niños
│   │   ├── Buscador.js          ← búsqueda por nombre
│   │   ├── SelectorTalleColor.js← elección de talle y color
│   │   ├── ResumenPedido.js     ← lista, cantidades y total
│   │   └── BotonWhatsApp.js     ← "Enviar pedido por WhatsApp"
│   ├── context/
│   │   └── PedidoContext.js     ← estado del pedido compartido entre páginas
│   └── lib/
│       ├── db.js                ← única conexión a la base (DATABASE_URL)
│       ├── productos.js         ← única consulta de prendas (usa db.js, SQL parametrizado)
│       ├── filtros.js           ← filtra por categoría y búsqueda
│       ├── normalizar.js        ← quita tildes y mayúsculas para comparar textos
│       ├── stock.js             ← calcula el estado de stock de una prenda
│       ├── formato.js           ← formato de precios ($ 0,00)
│       ├── whatsapp.js          ← arma el mensaje y el enlace de WhatsApp (servidor)
│       ├── validaciones.js      ← reglas de validación de pedidos, consultas y panel
│       ├── sesion.js            ← crea y verifica la sesión firmada
│       ├── codigos.js           ← genera códigos como MUJ-009
│       ├── fotos.js             ← sube y borra fotos en Vercel Blob
│       └── admin.js             ← SQL del panel con parámetros
├── tests/                       ← tests automáticos con Vitest
├── db/
│   ├── esquema.sql              ← creación de las tablas
│   └── datos-ejemplo.sql        ← prendas de prueba con precio $ 0
├── public/
│   ├── marca/                   ← logo, favicon y paleta
│   └── media/                   ← fotos de prendas (`prendas/`) y piezas generadas con IA
├── multimedia/
│   ├── imagenes/ · video/ · graficos/
│   └── FICHAS-IA.md             ← una ficha por pieza generada con IA
├── .env.local                   ← secretos, no se sube a GitHub
├── .gitignore
└── package.json
```

## Función de cada parte

| Carpeta o archivo | Función |
|---|---|
| `docs/` | Especificaciones del TP N° 3 y documentos del proceso (constitución, prompts, declaración de IA) |
| `specs/` | Spec, clarificación, plan, tareas y verificación de cada funcionalidad |
| `.github/` | Instrucciones permanentes y comandos (`/spec`, `/clarificar`, `/verificar`) del agente |
| `.agents/skills/` | Skills propias del proyecto |
| `src/app/` | Páginas del sitio y rutas de la API. Cada carpeta es una dirección web |
| `src/app/api/` | Código del servidor: habla con la base y valida los datos |
| `src/app/api/admin/` | Rutas de administración: requiere sesión en cada operación |
| `/quienes-somos` | Página pública con la historia y presentación de LujUri |
| `/admin` | Lista privada de todas las prendas y su estado |
| `/admin/login` | Acceso privado con la única clave de administración |
| `/admin/prenda/nueva` | Alta privada de una prenda |
| `/admin/prenda/[id]` | Edición privada de una prenda y sus variantes |
| `src/components/` | Piezas de pantalla reutilizables |
| `src/context/` | Guarda el pedido mientras la clienta navega |
| `src/lib/db.js` | **Único** lugar donde se conecta a PostgreSQL |
| `src/lib/productos.js` | **Único** lugar donde se escriben las consultas de prendas |
| `src/lib/whatsapp.js` | Genera el texto del pedido y el enlace `wa.me` en el servidor |
| `src/lib/validaciones.js` | Funciones puras de validación, fáciles de probar |
| `src/lib/sesion.js` | Crea y verifica la sesión firmada del panel |
| `src/lib/codigos.js` | Genera códigos seguros de prendas por categoría |
| `src/lib/fotos.js` | Sube y borra fotos en Vercel Blob |
| `src/lib/admin.js` | Único módulo con SQL para prendas y variantes del panel |
| `tests/` | Pruebas automáticas de totales, validaciones, filtros y mensaje de WhatsApp |
| `db/` | Scripts SQL para crear tablas y cargar prendas |
| `public/` | Imágenes y archivos que el navegador puede pedir directamente |
| `multimedia/` | Piezas generadas con IA y sus fichas |
| `.env.local` | Variables secretas; está en `.gitignore` |

## Rutas del sitio

| Ruta | Pantalla | Requerimientos |
|---|---|---|
| `/` | Inicio | RF11 |
| `/catalogo` | Catálogo con filtros y buscador | RF01, RF02, RF03, RF10 |
| `/catalogo/[id]` | Detalle de prenda con talle y color | RF04, RF05 |
| `/pedido` | Resumen y envío por WhatsApp | RF06, RF07, RF08, RF09 |
| `/contacto` | Formulario de consulta y datos de entrega | RF12, RF13 |
| `/quienes-somos` | Historia y presentación de LujUri | RF14 |
| `/admin/login` | Inicio de sesión del panel con una sola clave | RF15 |
| `/admin` | Lista y estado de todas las prendas | RF15 |
| `/admin/prenda/nueva` | Carga de prenda, foto, talles, colores y stock | RF15 |
| `/admin/prenda/[id]` | Edición de prenda, foto, talles, colores y stock | RF15 |

## Reglas de organización

- Las **páginas y la API** no escriben SQL: piden los datos a los módulos de `src/lib/` (por ejemplo `productos.js`).
- Solo `src/lib/db.js` abre la conexión con PostgreSQL y solo los módulos de `src/lib/` lo usan.
- Los **componentes** no tienen colores escritos a mano: usan las variables de `globals.css`.
- El **total del pedido** se calcula en `src/app/api/pedidos/route.js` con los precios de la base, nunca con los que manda el navegador.
- El **número de WhatsApp** no sale del servidor: la API devuelve el enlace ya armado.
- Cada archivo tiene una sola responsabilidad: si un componente crece demasiado, se divide.
