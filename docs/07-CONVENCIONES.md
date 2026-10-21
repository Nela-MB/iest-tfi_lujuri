# 07-CONVENCIONES: cómo escribimos el código

> Responde a la pregunta: **¿Cómo escribimos el código?**

## Idioma

- **Textos visibles:** español rioplatense (voseo).
- **Código** (variables, funciones, tablas): en español, sin tildes ni eñes (`ninos`, `diseno`).
- **Comentarios:** en español, cortos y solo donde aclaren algo.

## Nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes React | PascalCase | `TarjetaPrenda.js` |
| Páginas y rutas | minúsculas (carpeta de Next.js) | `app/catalogo/page.js` |
| Funciones | camelCase, empiezan con verbo | `agregarAlPedido()` |
| Variables | camelCase, con `const` y `let` (nunca `var`) | `totalPedido` |
| Constantes | MAYÚSCULAS con guion bajo | `NUMERO_WHATSAPP` |
| Archivos de `lib/` | minúsculas | `db.js`, `whatsapp.js` |
| Tablas y campos SQL | minúsculas con guion bajo | `pedido_items`, `creado_en` |
| Variables CSS | prefijo `--` y minúsculas | `--color-principal` |
| Imágenes | minúsculas, sin espacios ni tildes | `remera-lisa-rosa.jpg` |

## Formato del código

- Sangría de **2 espacios**.
- Comillas dobles en JavaScript.
- Punto y coma al final de cada instrucción.
- Un componente por archivo y una sola responsabilidad.

```js
// components/TarjetaPrenda.js
export default function TarjetaPrenda({ prenda }) {
  return (
    <article className="tarjeta">
      <h2>{prenda.nombre}</h2>
      <p>$ {prenda.precio}</p>
    </article>
  );
}
```

## Commits

Formato: **verbo en presente + qué se hizo**, en español y en minúsculas.

| Bien | Mal |
|---|---|
| `agrega filtro por categoría` | `cambios` |
| `corrige el total del pedido` | `arreglé cosas` |
| `crea la tabla de variantes` | `update` |

## Ramas y Pull Requests

| Rama | Uso |
|---|---|
| `main` | Versión publicada |
| `feature/catalogo` | Una funcionalidad nueva |
| `fix/total-pedido` | Una corrección |

- Cada rama genera una vista previa en Vercel.
- Se revisa la vista previa antes de unir a `main`.

## Reglas generales

- [ ] Los colores se usan solo con variables CSS.
- [ ] El SQL va siempre con parámetros.
- [ ] La base solo se toca desde `lib/db.js`.
- [ ] Cada archivo `.md` se revisa con `Ctrl + Shift + V` antes de subirlo.
