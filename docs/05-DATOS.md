# 05-DATOS: qué información guarda LujUri Boutique

> Responde a la pregunta: **¿Qué información guarda?**
> Base de datos PostgreSQL (Neon). El script de creación está en `db/esquema.sql`.

## Entidades

| Tabla | Para qué sirve |
|---|---|
| `productos` | Cada prenda del catálogo |
| `variantes` | Combinaciones de talle y color de una prenda, con su stock |
| `pedidos` | Cada pedido enviado por una clienta |
| `pedido_items` | Las prendas que forman cada pedido |
| `consultas` | Mensajes del formulario de contacto |

## Tabla `productos`

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | `SERIAL` | Clave primaria |
| `codigo` | `VARCHAR(20)` | Código interno, único |
| `nombre` | `VARCHAR(120)` | Obligatorio |
| `descripcion` | `TEXT` | Detalle de la prenda |
| `categoria` | `VARCHAR(10)` | `mujer`, `hombre` o `ninos` |
| `precio` | `NUMERIC(12,2)` | Por defecto `0` (marcador) |
| `imagen` | `VARCHAR(200)` | Ruta en `public/img/prendas/` |
| `destacado` | `BOOLEAN` | Aparece en el inicio |
| `activo` | `BOOLEAN` | Si está visible en el catálogo |

## Tabla `variantes`

| Campo | Tipo | Detalle |
|---|---|---|
| `id` | `SERIAL` | Clave primaria |
| `producto_id` | `INTEGER` | Clave foránea a `productos(id)` |
| `talle` | `VARCHAR(10)` | Ejemplo: `M`, `8` |
| `color` | `VARCHAR(30)` | Ejemplo: `Rosa` |
| `stock` | `INTEGER` | Por defecto `0`; con `0` se muestra "sin stock" |

## Tablas `pedidos`, `pedido_items` y `consultas`

| Tabla | Campos |
|---|---|
| `pedidos` | `id`, `total NUMERIC(12,2)`, `estado VARCHAR(15)` (`nuevo`, `confirmado`, `entregado`, `cancelado`), `creado_en TIMESTAMP` |
| `pedido_items` | `id`, `pedido_id`, `producto_id`, `variante_id`, `cantidad INTEGER`, `precio_unitario NUMERIC(12,2)` |
| `consultas` | `id`, `nombre VARCHAR(80)`, `contacto VARCHAR(120)`, `mensaje TEXT`, `creado_en TIMESTAMP` |

> `precio_unitario` se copia de `productos` en el servidor al guardar el pedido, para que el historial no cambie si luego se modifica el precio.

## Esquema SQL

```sql
-- db/esquema.sql
CREATE TABLE productos (
  id          SERIAL PRIMARY KEY,
  codigo      VARCHAR(20) UNIQUE,
  nombre      VARCHAR(120) NOT NULL,
  descripcion TEXT,
  categoria   VARCHAR(10) NOT NULL CHECK (categoria IN ('mujer', 'hombre', 'ninos')),
  precio      NUMERIC(12,2) DEFAULT 0,
  imagen      VARCHAR(200),
  destacado   BOOLEAN DEFAULT FALSE,
  activo      BOOLEAN DEFAULT TRUE
);

CREATE TABLE variantes (
  id          SERIAL PRIMARY KEY,
  producto_id INTEGER NOT NULL REFERENCES productos(id),
  talle       VARCHAR(10) NOT NULL,
  color       VARCHAR(30) NOT NULL,
  stock       INTEGER DEFAULT 0
);

CREATE TABLE pedidos (
  id        SERIAL PRIMARY KEY,
  total     NUMERIC(12,2) NOT NULL DEFAULT 0,
  estado    VARCHAR(15) DEFAULT 'nuevo',
  creado_en TIMESTAMP DEFAULT NOW()
);

CREATE TABLE pedido_items (
  id              SERIAL PRIMARY KEY,
  pedido_id       INTEGER NOT NULL REFERENCES pedidos(id),
  producto_id     INTEGER NOT NULL REFERENCES productos(id),
  variante_id     INTEGER NOT NULL REFERENCES variantes(id),
  cantidad        INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario NUMERIC(12,2) NOT NULL
);

CREATE TABLE consultas (
  id        SERIAL PRIMARY KEY,
  nombre    VARCHAR(80) NOT NULL,
  contacto  VARCHAR(120) NOT NULL,
  mensaje   TEXT NOT NULL,
  creado_en TIMESTAMP DEFAULT NOW()
);
```

## Ejemplo de datos

```sql
-- db/datos-ejemplo.sql (precios en 0 como marcador)
INSERT INTO productos (codigo, nombre, descripcion, categoria, precio, destacado) VALUES
  ('MUJ-001', 'Remera lisa',        'Remera de algodón, corte clásico', 'mujer',  0, TRUE),
  ('HOM-001', 'Remera básica',      'Remera cómoda para todos los días', 'hombre', 0, FALSE),
  ('NIN-001', 'Pantalón de abrigo', 'Pantalón suave para el invierno',   'ninos',  0, TRUE);

INSERT INTO variantes (producto_id, talle, color, stock) VALUES
  (1, 'M', 'Rosa',    5),
  (1, 'L', 'Celeste', 0),
  (3, '8', 'Celeste', 3);
```

| id | codigo | nombre | categoria | precio | destacado |
|---|---|---|---|---|---|
| 1 | MUJ-001 | Remera lisa | mujer | 0.00 | true |
| 2 | HOM-001 | Remera básica | hombre | 0.00 | false |
| 3 | NIN-001 | Pantalón de abrigo | ninos | 0.00 | true |

> Los datos son de prueba. No se usan marcas reales ni datos de clientas.
