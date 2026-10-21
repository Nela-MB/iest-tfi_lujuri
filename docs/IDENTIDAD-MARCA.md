# Manual de identidad: LujUri Boutique

> Responde a la pregunta: **¿Cómo nos vemos y cómo hablamos?**

## Esencia

- **Nombre:** LujUri Boutique
- **Rubro:** tienda de ropa (mujer, hombre y niños)
- **Canales actuales:** Instagram (`@luj_uri`), WhatsApp y entrega a domicilio
- **Eslogan:** "Tu estilo, con cariño."
- **Misión:** vestir a toda la familia con ropa linda y accesible, atendiendo a cada cliente de manera cercana y entregando en su casa.
- **Visión:** convertirse en la boutique de referencia de la zona, con un catálogo online simple donde cualquiera pueda elegir y pedir por WhatsApp.
- **Personalidad:** cálida, cercana, delicada y con estilo.
- **Público:** mujeres, hombres y familias que compran ropa para sí o para sus hijos, y que prefieren atención personalizada por Instagram y WhatsApp.

### Significado del nombre

**LujUri** es una sola palabra que une dos nombres propios: **Luj** (de Luján) y **Uri** (de Uriel) los nombres de mis pequeños. La "U" mayúscula en el medio marca el punto de unión. *Boutique* indica que es una tienda de ropa con selección cuidada y trato personal.

## Logo

El logo combina una **percha** de línea fina con un **corazón** en el centro (cariño en cada prenda), el nombre **LujUri** en cursiva delicada y una **cinta celeste** con la palabra "BOUTIQUE". Lleva un doble aro rosa y celeste y pequeños destellos.

| Versión | Archivo | Uso |
|---|---|---|
| Circular | `marca/logo-lujuri.png` / `.svg` | Foto de perfil, portada, impresos, etiquetas |
| Horizontal | `marca/logo-lujuri-horizontal.png` / `.svg` | Encabezado del sitio, firma de mensajes |
| Isotipo | `marca/isotipo-lujuri.png` / `.svg` | Íconos pequeños, sellos, bolsas |
| Favicon | `marca/favicon.ico` | Pestaña del navegador |
| Paleta | `marca/paleta-lujuri.png` | Referencia visual de colores |

### Reglas de uso del logo

- Tamaño mínimo digital: circular **96 px**, horizontal **160 px de ancho**, isotipo **32 px**.
- Espacio libre alrededor: al menos **10 % del ancho** del logo.
- Usarlo sobre Crema o sobre fondos claros de la paleta.

### La IA nunca debe

- Deformar, rotar o recolorear el logo.
- Agregarle sombras, brillos u otros efectos.
- Ponerlo sobre fondos oscuros o sobre fotos muy cargadas.
- Reconstruirlo escribiendo el nombre con otra tipografía.
- Separar el nombre en "Luj Uri": siempre es **LujUri**.

## Paleta de colores

Se aplica la regla **60-30-10**: 60 % fondos claros, 30 % texto en azul noche y 10 % acentos en rosa y celeste.

| Nombre | HEX | Uso | Proporción |
|---|---|---|---|
| Crema | `#FBF5EF` | Fondo dominante | 60 % |
| Rosa Empolvado | `#F6CAD3` | Tarjetas y secciones suaves | (dentro del 60 %) |
| Celeste Claro | `#CBE8F7` | Cintas, etiquetas y fondos secundarios | (dentro del 60 %) |
| Azul Noche | `#2B4260` | Títulos y textos | 30 % |
| Azul Grisáceo | `#5B6B82` | Textos de apoyo | (dentro del 30 %) |
| Rosa Frambuesa | `#C2415F` | Color principal: nombre, botones, enlaces | 10 % |
| Rosa Coral | `#E0607E` | Detalles y destellos | (dentro del 10 %) |
| Celeste Cielo | `#8CCBEA` | Acento: aros, destellos, íconos | (dentro del 10 %) |
| Azul Percha | `#4F8FBF` | Líneas decorativas e ilustraciones | uso puntual |

**Color funcional (no es de marca):** verde WhatsApp `#25D366`, solo para el botón de pedido por WhatsApp.

### Contraste (accesibilidad)

| Combinación | Ratio | Resultado |
|---|---|---|
| Blanco sobre Rosa Frambuesa | 4,98 : 1 | Cumple AA |
| Rosa Frambuesa sobre Crema | 4,60 : 1 | Cumple AA |
| Azul Noche sobre Crema | 9,46 : 1 | Cumple AAA |
| Azul Noche sobre Rosa Empolvado | 6,98 : 1 | Cumple AA |
| Azul Noche sobre Celeste Claro | 8,01 : 1 | Cumple AAA |
| Azul Grisáceo sobre Crema | 5,01 : 1 | Cumple AA |
| Azul Noche sobre verde WhatsApp | 5,16 : 1 | Cumple AA |

> Azul Percha sobre Crema da solo 3,23 : 1: se usa **únicamente** en líneas e ilustraciones, nunca para texto.
> Sobre el verde WhatsApp el texto va en Azul Noche, no en blanco.

## Tipografías

| Uso | Fuente | Peso | Alternativa |
|---|---|---|---|
| Nombre de la marca y frases destacadas | **Sacramento** | 400 | `cursive` |
| Títulos (H1, H2) | **Cormorant Garamond** | 600 | `Georgia, serif` |
| Textos, botones y precios | **Montserrat** | 400 / 500 / 600 | `Arial, sans-serif` |

- Las tres son de **Google Fonts** (licencia libre, aptas para la web).
- Sacramento es muy fina: se usa solo para el nombre y frases cortas, nunca en párrafos ni en tamaños menores a 28 px.
- Cormorant Garamond aporta elegancia en los títulos; Montserrat es moderna y muy legible en el celular.

## Tono de voz

- **Cercano y cálido**, con voseo ("Elegí", "Escribinos", "Te lo llevamos").
- **Claro:** se informan talles, colores disponibles y formas de entrega sin vueltas.
- **Delicado y positivo:** frases cortas, amables, con algún emoji de corazón (💗) en redes sociales.
- **Evitar:** lenguaje frío o técnico, presión para comprar ("¡última oportunidad!") y exceso de signos de exclamación.

| En lugar de... | Decir... |
|---|---|
| "Realice su pedido" | "Armá tu pedido" |
| "Contáctenos para consultas" | "Escribinos por WhatsApp" |
| "Producto agotado" | "Por ahora no tenemos stock de este talle" |

## Variables para el código

Copiar tal cual en `css/marca.css`. La IA usa **siempre** estas variables, nunca colores escritos a mano.

```css
/* css/marca.css */
:root {
  --color-principal:   #C2415F; /* Rosa Frambuesa */
  --color-detalle:     #E0607E; /* Rosa Coral */
  --color-rosa-suave:  #F6CAD3; /* Rosa Empolvado */
  --color-acento:      #8CCBEA; /* Celeste Cielo */
  --color-celeste-suave: #CBE8F7; /* Celeste Claro */
  --color-linea:       #4F8FBF; /* Azul Percha (solo líneas) */
  --color-texto:       #2B4260; /* Azul Noche */
  --color-texto-apoyo: #5B6B82; /* Azul Grisáceo */
  --color-fondo:       #FBF5EF; /* Crema */
  --color-whatsapp:    #25D366; /* funcional */

  --fuente-marca:   'Sacramento', cursive;
  --fuente-titulos: 'Cormorant Garamond', Georgia, serif;
  --fuente-texto:   'Montserrat', Arial, sans-serif;
  --radio-borde: 12px;
}

h1, h2 {
  font-family: var(--fuente-titulos);
  color: var(--color-texto);
}
body {
  font-family: var(--fuente-texto);
  background: var(--color-fondo);
  color: var(--color-texto);
}
```


