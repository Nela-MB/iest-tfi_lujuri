# 04-ARQUITECTURA: cómo se organiza el código de LujUri Boutique

> Responde a la pregunta: **¿Cómo se organiza el código?**
> Proyecto Next.js con el enrutador `app/`, escrito en JavaScript (sin TypeScript, por ahora).

## Árbol de carpetas

```text
lujuri-boutique/
├── AGENTS.md                    ← reglas para la IA
├── docs/                        ← especificaciones (estos archivos .md)
├── marca/                       ← logo, favicon y paleta originales
├── app/
│   ├── layout.js                ← encabezado, pie, fuentes y <html lang="es">
│   ├── globals.css              ← variables CSS de la marca
│   ├── page.js                  ← inicio
│   ├── catalogo/
│   │   ├── page.js              ← catálogo con filtros y buscador
│   │   └── [id]/page.js         ← detalle de una prenda
│   ├── pedido/page.js           ← resumen del pedido y envío por WhatsApp
│   ├── contacto/page.js         ← formulario de consulta
│   └── api/
│       ├── productos/route.js   ← lista de prendas (con filtros)
│       ├── pedidos/route.js     ← guarda el pedido y calcula el total
│       └── consultas/route.js   ← guarda las consultas
├── components/
│   ├── Encabezado.js            ← logo, menú y contador del pedido
│   ├── PieDePagina.js           ← contacto, redes y entrega
│   ├── TarjetaPrenda.js         ← foto, nombre, precio y estado de stock
│   ├── FiltroCategorias.js      ← mujer, hombre y niños
│   ├── Buscador.js              ← búsqueda por nombre
│   ├── SelectorTalleColor.js    ← elección de talle y color
│   ├── ResumenPedido.js         ← lista, cantidades y total
│   └── BotonWhatsApp.js         ← "Enviar pedido por WhatsApp"
├── lib/
│   ├── db.js                    ← única conexión a la base (DATABASE_URL)
│   └── whatsapp.js              ← arma el mensaje y el enlace de WhatsApp
├── context/
│   └── PedidoContext.js         ← estado del pedido compartido entre páginas
├── db/
│   ├── esquema.sql              ← creación de las tablas
│   └── datos-ejemplo.sql        ← prendas de prueba con precio $ 0
├── public/
│   ├── img/
│   │   ├── logo-lujuri.svg      ← copias del logo de marca/
│   │   ├── logo-lujuri-horizontal.svg
│   │   └── prendas/             ← fotos de la ropa
│   └── favicon.png
├── .env.local                   ← secretos, no se sube a GitHub
├── .gitignore
└── package.json
```

## Función de cada parte

| Carpeta o archivo | Función |
|---|---|
| `app/` | Páginas del sitio y rutas de la API. Cada carpeta es una dirección web |
| `app/layout.js` | Estructura común: encabezado, pie, fuentes y lenguaje del sitio |
| `app/globals.css` | Variables CSS copiadas de `IDENTIDAD-MARCA.md` |
| `app/api/` | Código del servidor: habla con la base y valida los datos |
| `components/` | Piezas de pantalla reutilizables |
| `context/` | Guarda el pedido mientras la clienta navega |
| `lib/db.js` | **Único** lugar donde se conecta a PostgreSQL |
| `lib/whatsapp.js` | Genera el texto del pedido y el enlace `wa.me` |
| `db/` | Scripts SQL para crear tablas y cargar prendas |
| `public/` | Imágenes y archivos que el navegador puede pedir directamente |
| `.env.local` | Variables secretas; está en `.gitignore` |

## Rutas del sitio

| Ruta | Pantalla | Requerimientos |
|---|---|---|
| `/` | Inicio | RF11 |
| `/catalogo` | Catálogo con filtros y buscador | RF01, RF02, RF03, RF10 |
| `/catalogo/[id]` | Detalle de prenda con talle y color | RF04, RF05 |
| `/pedido` | Resumen y envío por WhatsApp | RF06, RF07, RF08, RF09 |
| `/contacto` | Formulario de consulta y datos de entrega | RF12, RF13 |

## Reglas de organización

- Las **páginas** no hablan con la base: piden los datos a las rutas de `app/api/`.
- Solo `lib/db.js` abre la conexión con PostgreSQL.
- Los **componentes** no tienen colores escritos a mano: usan las variables de `globals.css`.
- El **total del pedido** se calcula en `app/api/pedidos/route.js` con los precios de la base, nunca con los que manda el navegador.
- Cada archivo tiene una sola responsabilidad: si un componente crece demasiado, se divide.
