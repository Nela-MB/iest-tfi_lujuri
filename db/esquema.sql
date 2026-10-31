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
