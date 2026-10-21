# 06-DISENO-UI: la marca LujUri en pantalla

> Responde a la pregunta: **¿Cómo se ven las pantallas?**
> Todos los colores y fuentes salen de las variables de `IDENTIDAD-MARCA.md`. Nunca se escriben a mano.

## Pantallas

| Ruta | Pantalla | Qué muestra |
|---|---|---|
| `/` | Inicio | Logo, frase de bienvenida, prendas destacadas y las tres categorías |
| `/catalogo` | Catálogo | Buscador, filtro de categorías y grilla de prendas |
| `/catalogo/[id]` | Detalle de prenda | Foto, descripción, selector de talle y color, botón de agregar |
| `/pedido` | Mi pedido | Lista, cantidades, total y botón de WhatsApp |
| `/contacto` | Contacto | Formulario de consulta y datos de entrega a domicilio |

## Cómo se aplica la identidad

| Elemento | Regla de diseño |
|---|---|
| Fondo de las páginas | `var(--color-fondo)` (Crema) |
| Tarjetas y secciones suaves | `var(--color-rosa-suave)` o blanco, con `var(--radio-borde)` |
| Títulos (H1, H2) | `var(--fuente-titulos)` en `var(--color-texto)` |
| Nombre de la marca | `var(--fuente-marca)`, mínimo 28 px |
| Textos, precios y botones | `var(--fuente-texto)` |
| Texto de apoyo | `var(--color-texto-apoyo)` |
| Enlaces y botón principal | Fondo `var(--color-principal)`, texto blanco |
| Etiquetas y cintas | Fondo `var(--color-celeste-suave)`, texto `var(--color-texto)` |
| Líneas e ilustraciones | `var(--color-linea)` (nunca para texto) |
| Botón de WhatsApp | Fondo `var(--color-whatsapp)`, texto `var(--color-texto)` |

## Componentes

### Tarjeta de prenda

```text
+---------------------------+
| [foto]       [En stock]   |   <- etiqueta de estado
|                           |
| Remera lisa               |   <- fuente de títulos, Azul Noche
| $ 0                       |   <- fuente de texto, 600
| [ Ver prenda ]            |   <- botón principal
+---------------------------+
```

| Estado | Etiqueta | Color |
|---|---|---|
| Hay stock | "Disponible" | Fondo celeste suave |
| Poco stock | "Quedan pocas" | Fondo rosa suave |
| Sin stock | "Por ahora no tenemos stock de este talle" | Fondo gris claro, botón desactivado |

### Botones

- **Principal** ("Agregar a mi pedido"): fondo Rosa Frambuesa, texto blanco, `var(--radio-borde)`.
- **Secundario** ("Volver al catálogo"): borde Rosa Frambuesa, fondo transparente.
- **WhatsApp** ("Enviar pedido por WhatsApp"): verde funcional con texto Azul Noche.
- Tamaño mínimo táctil: **44 × 44 px**.

### Formularios

- Etiqueta visible sobre cada campo, en `var(--fuente-texto)`.
- Borde `var(--color-acento)`; al enfocar, borde `var(--color-principal)`.
- Mensajes de error en texto claro, con tono amable ("Falta tu nombre").

## Grilla del catálogo

| Pantalla | Columnas |
|---|---|
| Celular | 1 (o 2 compactas) |
| Tablet | 3 |
| Computadora | 4 |

## Reglas visuales

- Diseño **mobile first**.
- Logo horizontal en el encabezado (mínimo 160 px de ancho); circular solo en el inicio.
- Un solo `<h1>` por página.
- Nunca poner el logo sobre fondos oscuros ni sobre fotos cargadas.
- Los textos usan voseo y el tono de voz del manual de marca.
