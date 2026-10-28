# PROMPTS-IMAGENES: las 8 imágenes de LujUri Boutique

> Estructura de cada prompt: **SUJETO + ACCIÓN + ENTORNO + LUZ + CÁMARA + ESTILO + MARCA + RESTRICCIONES**.
> Ambiente: boutique neutra y luminosa. Los prompts son un punto de partida: se prueban, se corrigen y se registra cada intento en `FICHAS-IA.md`.

## Bloque común (se pega al final de cada prompt)

```text
Estilo: fotografía realista tipo catálogo de moda, colores naturales, aspecto de boutique moderna y delicada.
Marca: paleta de rosa empolvado, celeste suave y crema, con un único detalle en rosa frambuesa.
Restricciones: sin texto, sin logos, sin marcas reales, sin marcas de agua, sin personajes de dibujos, objetos completos y bien proporcionados, manos con cinco dedos.
```

## Los 8 prompts

### 1. Portada del sitio (hero), formato 16:9

```text
Interior de una boutique de ropa pequeña y luminosa, con percheros de madera clara y prendas de colores pastel (rosa, celeste y crema) ordenadas, un espejo de pie y una planta verde. Plano general, levemente elevado, sin personas. Luz natural suave de ventana por la mañana. Cámara réflex, lente de 35 mm, profundidad de campo media.
```

### 2. Ropa de mujer, formato 4:5

```text
Prendas de mujer dispuestas sobre una mesa de madera clara: una blusa rosa empolvado, un jean claro, un cárdigan color crema y un par de sandalias. Vista cenital (plano desde arriba), sin personas, composición ordenada y con aire. Luz natural difusa de ventana. Cámara réflex, lente de 50 mm.
```

### 3. Ropa de hombre, formato 4:5

```text
Prendas de hombre dobladas con prolijidad sobre un banco de madera clara: una remera celeste, una camisa blanca, un pantalón beige y un cinturón de cuero marrón. Plano ligeramente elevado, sin personas. Luz natural suave. Cámara réflex, lente de 50 mm, poca profundidad de campo.
```

### 4. Ropa de niños, formato 4:5

```text
Prendas infantiles sobre una alfombra clara: un buzo celeste, un pantalón de abrigo gris, una remera lisa rosa y un par de zapatillas pequeñas. Vista cenital, solo la ropa, sin niños ni rostros. Luz natural suave de tarde. Cámara réflex, lente de 50 mm.
```

### 5. El espacio de trabajo y empaque, formato 3:2

```text
Mesa de trabajo de una tienda de ropa con papel de seda, bolsas de papel kraft sin logo, etiquetas en blanco, perchas y un celular con la pantalla apagada. Plano medio, sin personas, ambiente ordenado. Luz cálida de ventana. Cámara réflex, lente de 35 mm, profundidad de campo media.
```

### 6. Persona ficticia recibiendo su pedido, formato 3:2

```text
Una mujer adulta de apariencia cotidiana y natural, con ropa casual, sonríe en la puerta de su casa mientras recibe una bolsa de papel kraft sin logo; solo se ven las manos de quien entrega, con cinco dedos. Entorno: entrada de una casa luminosa con una planta. Luz natural de la tarde. Cámara réflex, lente de 50 mm, plano medio.
```

### 7. Mockup del sitio en una notebook, formato 16:9

```text
Una notebook abierta sobre un escritorio de madera clara junto a una ventana, con una taza, una planta y una libreta. La pantalla encendida muestra un fondo plano color crema, sin texto ni imágenes. Vista en tres cuartos. Luz natural suave. Cámara réflex, lente de 50 mm.
```

### 8. Mockup del sitio en un celular, formato 4:5

```text
Una mano sostiene un smartphone sin marca visible frente a un perchero de boutique desenfocado. La pantalla encendida muestra un fondo plano color crema, sin texto. Cinco dedos visibles y bien formados. Luz natural suave. Cámara réflex, lente de 85 mm, poca profundidad de campo.
```

## Después de generar

- **Mockups 7 y 8:** la IA no puede mostrar el sitio real. Generá la escena con la pantalla en blanco y en **Canva** pegá una captura real del sitio sobre la pantalla. Eso se anota como **edición humana** en la ficha.
- **Revisar cada pieza con la Tabla 3** del TFI: luz, anatomía, textos, perspectiva, marca, calidad técnica y diversidad.
- **Al menos dos piezas** deben mostrar su evolución en 3 intentos o más. Guardá cada versión y captura de pantalla del prompt.
- **Guardar los archivos:** originales en `multimedia/imagenes/` y las versiones livianas (WebP o JPG) en `public/media/`.
- **Nombres sugeridos:** `01-hero.webp`, `02-mujer.webp`, `03-hombre.webp`, `04-ninos.webp`, `05-espacio.webp`, `06-entrega.webp`, `07-mockup-notebook.webp`, `08-mockup-celular.webp`.
- **Leyenda en el sitio:** «Imagen generada con IA (herramienta) y editada por la autora».
- **Registro:** actualizar la tabla de piezas generadas y usadas en `FICHAS-IA.md`.

---

# Ronda 2: prompts corregidos

> Motivo: en la primera ronda la IA dibujó un personaje de historieta con derechos de autor, letras inventadas en las remeras y versiones redibujadas del logo. Estos prompts lo evitan. Pegar el **bloque común** al final de cada uno.

## Regla nueva para todos los prompts

```text
No dibujes ningún logo ni nombre de marca: las superficies (bolsas, carteles, pantallas) quedan lisas. Sin personajes de dibujos animados ni historietas. Prendas lisas, sin estampas, letras, números ni calaveras.
```

## A. Mockup del sitio en una notebook (reemplaza la imagen con el personaje)

```text
Una notebook abierta sobre un escritorio de madera clara junto a una ventana, con una taza, una planta y una libreta. La pantalla encendida muestra un fondo plano color crema, sin texto ni imágenes. A un costado, una lámpara de escritorio con pantalla de tela lisa color crema, sin dibujos. Vista en tres cuartos. Luz natural suave. Cámara réflex, lente de 50 mm.
```

## B. Ropa de niños (reemplaza la imagen con letras inventadas)

```text
Prendas infantiles sobre una alfombra clara: un buzo celeste con capucha, un pantalón azul marino, una remera lisa blanca, una remera lisa rosa empolvado, un gorro gris y un par de zapatillas rosas pequeñas. Vista cenital, solo la ropa, sin niños ni rostros, sin bloques con letras. Luz natural suave de tarde. Cámara réflex, lente de 50 mm.
```

## C. Ropa de hombre (reemplaza la imagen con calaveras)

```text
Prendas de hombre dobladas con prolijidad sobre una mesa larga de madera clara junto a una ventana: remeras lisas en celeste, blanco, beige y gris, una camisa celeste, un buzo crema y un pantalón gris. Plano levemente elevado, sin personas. Luz natural suave. Cámara réflex, lente de 50 mm, poca profundidad de campo.
```

## D. Portada: interior de la boutique (pieza que falta)

```text
Interior de una boutique de ropa pequeña y luminosa, con percheros de madera clara y prendas de colores pastel (rosa, celeste y crema) ordenadas, un espejo de pie y una planta verde. Plano general, levemente elevado, sin personas. Luz natural suave de ventana por la mañana. Cámara réflex, lente de 35 mm, profundidad de campo media. Formato 16:9.
```

## E. Espacio de trabajo y empaque (pieza que falta)

```text
Mesa de trabajo de una tienda de ropa con papel de seda, bolsas de papel kraft lisas, etiquetas en blanco, perchas y un celular con la pantalla apagada. Plano medio, sin personas, ambiente ordenado. Luz cálida de ventana. Cámara réflex, lente de 35 mm. Formato 3:2.
```

## Edición humana en Canva (cuenta como ajuste del estudiante)

- [ ] Pegar el **logo oficial** (`public/marca/`) sobre la bolsa de la imagen de la entrega.
- [ ] Pegar una **captura real del sitio** en las pantallas de los mockups.
- [ ] Anotar cada ajuste en la ficha de la pieza.

## Corrección de sesgo (documentar al menos una)

- [ ] Pedir en una iteración personas de distintas edades y contexturas en las pantallas de los mockups y anotar qué se cambió y por qué.
