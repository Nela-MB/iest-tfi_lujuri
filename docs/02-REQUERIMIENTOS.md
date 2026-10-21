# 02-REQUERIMIENTOS: qué tiene que hacer LujUri Boutique

> Responde a la pregunta: **¿Qué tiene que hacer?**

## Requerimientos funcionales (RF)

| ID | Requerimiento funcional | Prioridad |
|---|---|---|
| RF01 | Mostrar el catálogo con foto, nombre y precio de cada prenda | Alta |
| RF02 | Filtrar por categoría: mujer, hombre y niños | Alta |
| RF03 | Buscar una prenda por nombre | Media |
| RF04 | Ver el detalle de una prenda: descripción, talles y colores | Media |
| RF05 | Elegir talle y color antes de agregar la prenda al pedido | Alta |
| RF06 | Agregar y quitar prendas del pedido | Alta |
| RF07 | Cambiar la cantidad de cada prenda y calcular el total automáticamente | Alta |
| RF08 | Enviar el pedido por WhatsApp con el mensaje ya armado | Alta |
| RF09 | Guardar el pedido en la base de datos al enviarlo | Media |
| RF10 | Indicar si una prenda tiene stock o está agotada | Media |
| RF11 | Página de inicio con logo, prendas destacadas y las tres categorías | Alta |
| RF12 | Página de contacto con formulario de consulta, guardado en la base | Media |
| RF13 | Informar cómo funciona la entrega a domicilio y cómo se coordina | Baja |

## Requerimientos no funcionales (RNF)

- **RNF01 Responsive:** el sitio se ve y funciona bien en celular, tablet y computadora. Se diseña primero para celular (*mobile first*), porque la mayoría de las clientas llega desde Instagram.
- **RNF02 Rendimiento:** cada página carga en menos de 2 segundos con conexión común.
- **RNF03 Accesibilidad:** contraste mínimo AA (ver `IDENTIDAD-MARCA.md`), texto alternativo en las imágenes y botones con tamaño cómodo para tocar.
- **RNF04 Marca:** colores, tipografías y logo se usan siempre según `IDENTIDAD-MARCA.md`.
- **RNF05 Seguridad:** los datos sensibles nunca llegan al navegador y los totales se calculan en el servidor (ver `10-SEGURIDAD.md`).
- **RNF06 SEO:** cada página tiene título y descripción propios (ver `09-SEO.md`).
- **RNF07 Idioma:** todos los textos visibles están en español rioplatense, con el tono de la marca.
- **RNF08 Mantenibilidad:** el código sigue las convenciones de `07-CONVENCIONES.md` y los productos se pueden cargar o modificar sin tocar el diseño.

## Historia de usuario principal

> Como clienta, quiero elegir mis prendas, indicar talle y color, y mandar el pedido por WhatsApp, para no tener que escribir la lista a mano.

### Criterios de aceptación

- [ ] El contador del pedido aumenta al agregar una prenda.
- [ ] No se puede agregar una prenda sin elegir talle y color.
- [ ] Se puede cambiar la cantidad o quitar una prenda.
- [ ] El total se calcula solo.
- [ ] El botón "Enviar por WhatsApp" abre el chat con la lista completa.
- [ ] Las prendas agotadas no se pueden agregar al pedido.

## Ejemplo del mensaje de WhatsApp

```text
Hola LujUri Boutique, quiero hacer este pedido:

1. Remera lisa (Mujer) - Talle M - Color Rosa - x2 - $ 0
2. Pantalón de abrigo (Niños) - Talle 8 - Color Celeste - x1 - $ 0

Total: $ 0
¿Me confirman disponibilidad y entrega a domicilio?
```

> Los precios quedan en `$ 0` como marcador hasta cargar el catálogo real.
