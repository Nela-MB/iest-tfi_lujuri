---
name: revisar-marca
description: Revisa que las pantallas y textos del sitio respeten la identidad de LujUri (variables CSS, logo, tipografías, nombre, tono y accesibilidad). Usar al terminar una pantalla o antes de un commit que toque estilos o textos.
---
# Skill: revisar-marca

## Cuándo usarla

Después de crear o modificar una pantalla, un componente o un texto visible.

## Lista de control

1. **Colores:** no hay códigos `#` ni `rgb()` fuera de `src/app/globals.css`; todo usa `var(--color-...)`.
2. **Tipografías:** títulos con `var(--fuente-titulos)`, textos con `var(--fuente-texto)` y el nombre de la marca con `var(--fuente-marca)` en 28 px o más.
3. **Logo:** se usa el de `public/marca/`, sin deformar, recolorear ni agregar efectos, y nunca sobre fondos oscuros.
4. **Nombre:** siempre **LujUri**, junto y con la U mayúscula.
5. **Tono:** textos en español rioplatense con voseo, amables y sin presión de compra.
6. **Accesibilidad:** texto alternativo en cada imagen, un solo `<h1>` por página, botones de al menos 44 × 44 px y contraste AA.
7. **Imágenes con IA:** llevan la leyenda «Generado con IA».
8. **Botón de WhatsApp:** fondo `var(--color-whatsapp)` con texto `var(--color-texto)`.

## Formato de respuesta

Una tabla con `Punto | Estado (OK / Falta) | Archivo y línea`, y una lista corta de correcciones sugeridas. No modificar archivos sin que la estudiante lo apruebe.
