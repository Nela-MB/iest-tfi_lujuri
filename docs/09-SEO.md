# 09-SEO: cómo nos encuentran en Google

> Responde a la pregunta: **¿Cómo nos encuentran en Google?**

## Título y descripción de cada página

| Ruta | Título (`title`) | Descripción (`description`) |
|---|---|---|
| `/` | LujUri Boutique · Ropa para mujer, hombre y niños | Tu estilo, con cariño. Mirá el catálogo de LujUri Boutique y hacé tu pedido por WhatsApp con entrega a domicilio. |
| `/catalogo` | Catálogo · LujUri Boutique | Remeras, pantalones, abrigos y más para mujer, hombre y niños. Elegí talle y color. |
| `/catalogo/[id]` | {nombre de la prenda} · LujUri Boutique | {descripción corta de la prenda}. Pedila por WhatsApp. |
| `/pedido` | Mi pedido · LujUri Boutique | Revisá tu pedido y envialo por WhatsApp. |
| `/contacto` | Contacto y entregas · LujUri Boutique | Escribinos por WhatsApp o Instagram. Entregamos a domicilio. |

> Los títulos tienen hasta 60 caracteres y las descripciones hasta 160.

## Ejemplo en Next.js

```js
// app/catalogo/page.js
export const metadata = {
  title: "Catálogo · LujUri Boutique",
  description: "Remeras, pantalones, abrigos y más para mujer, hombre y niños.",
  openGraph: {
    images: ["/img/compartir.jpg"],
  },
};
```

```html
<!-- app/layout.js -->
<html lang="es">
```

## Palabras clave

| Tipo | Palabras |
|---|---|
| Principales | ropa para mujer, ropa para hombre, ropa para niños, boutique de ropa, ropa Tinogasta, Tienda Tinogasta |
| Secundarias | catálogo de ropa online, pedir ropa por WhatsApp, ropa por WhatsApp Tinogasta,  ropa con entrega a domicilio |
| De marca | LujUri, LujUri Boutique, `@luj_uri` |

> Agregar el nombre de la ciudad o zona cuando LujUri lo confirme. No inventarlo.

## Texto alternativo de imágenes

| Imagen | Texto alternativo (`alt`) |
|---|---|
| Logo horizontal | "LujUri Boutique, logo" |
| Foto de prenda | "{nombre} en color {color}" (ejemplo: "Remera lisa en color rosa") |
| Portada del inicio | "Prendas de LujUri Boutique para mujer, hombre y niños" |
| Imagen decorativa | `alt=""` (vacío) |

## Lista de control

- [ ] `metadata` única por página.
- [ ] Un solo `<h1>` por página.
- [ ] `<Image>` de Next.js con `alt` descriptivo.
- [ ] Etiquetas semánticas: `header`, `nav`, `main`, `article`, `footer`.
- [ ] `lang="es"` en `<html>`.
- [ ] Imagen para compartir en redes (`openGraph`).
- [ ] Favicon desde `marca/favicon.ico`.
- [ ] PageSpeed de 90 o más en celular.
