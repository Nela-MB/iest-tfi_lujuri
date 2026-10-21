# LujUri Boutique: instrucciones para la IA

> Responde a la pregunta: **¿Qué debe leer y respetar la IA?**

## Proyecto

**LujUri Boutique** es una tienda de ropa para mujer, hombre y niños que hoy vende por Instagram y WhatsApp, con entrega a domicilio. Este proyecto es su **catálogo online**: las clientas ven la ropa por categoría, arman su pedido y lo envían por WhatsApp para coordinar el pago y la entrega.

**Stack:** Next.js (React) + PostgreSQL + GitHub + Vercel.

## IA que trabaja en este proyecto

La IA que se usa para desarrollar es **Claude** (Anthropic). Claude debe:

- Leer este archivo y `MEMORY.md` **al comenzar cada sesión**.
- Seguir las especificaciones de `docs/` como única fuente de verdad del proyecto.
- Trabajar de a una tarea, explicar brevemente qué hizo y qué archivos cambió.
- Anotar en `MEMORY.md` las decisiones nuevas y el avance, cuando se lo pidan.
- No guardar en ningún archivo claves, contraseñas ni datos personales de clientas.

## Antes de escribir código, leé

| Archivo | Propósito |
|---|---|
| `MEMORY.md` | Memoria del proyecto: decisiones tomadas, estado actual y pendientes |
| `docs/IDENTIDAD-MARCA.md` | Nombre, logo, colores, tipografías y tono de voz |
| `docs/01-CONTEXTO.md` | Por qué existe el proyecto y para quién es |
| `docs/02-REQUERIMIENTOS.md` | Qué tiene que hacer el sistema (RF y RNF) |
| `docs/03-TECNOLOGIAS.md` | Con qué se construye y qué NO usar |
| `docs/04-ARQUITECTURA.md` | Estructura de carpetas y función de cada parte |
| `docs/05-DATOS.md` | Tablas, campos y ejemplos de datos |
| `docs/06-DISENO-UI.md` | Pantallas y cómo se aplica la marca |
| `docs/07-CONVENCIONES.md` | Nombres, idioma del código y formato de commits |
| `docs/08-TAREAS.md` | Etapas de trabajo con casillas para tildar |
| `docs/09-SEO.md` | Títulos, descripciones y palabras clave |
| `docs/10-SEGURIDAD.md` | Datos sensibles, validaciones y variables de entorno |

El logo y la paleta están en la carpeta `marca/`.

## Reglas obligatorias

### Qué hacer

- Usar **siempre** las variables CSS de `IDENTIDAD-MARCA.md` (por ejemplo `var(--color-principal)`).
- Escribir el nombre de la marca siempre como **LujUri** (junto, con la U mayúscula).
- Acceder a la base de datos **solo** desde `lib/db.js`.
- Escribir las consultas SQL **siempre con parámetros**, nunca pegando texto del usuario.
- Calcular los totales del pedido en el **servidor**, con los precios de la base.
- Escribir los textos del sitio en español rioplatense (voseo), con el tono de la marca.
- Trabajar **una tarea de `08-TAREAS.md` por vez** y marcarla con `[x]` al terminarla.

### Qué no hacer

- No usar colores ni fuentes escritos a mano fuera de `IDENTIDAD-MARCA.md`.
- No deformar, rotar, recolorear ni agregar efectos al logo.
- No mostrar ni subir `DATABASE_URL` ni ningún dato del archivo `.env.local`.
- No inventar precios: usar `$ 0` como marcador.
- No inventar marcas reales, descuentos, talles ni datos de clientas.
- No agregar tecnologías que no estén en `03-TECNOLOGIAS.md`.
- No agregar pago online ni cuentas de usuario (quedan fuera por ahora).

## Si algo no está claro

**Preguntar antes de inventar.** Si un dato falta o dos archivos se contradicen, la IA debe avisarlo y esperar la respuesta, en lugar de suponer.

## Orden de prioridad ante contradicciones

1. `docs/IDENTIDAD-MARCA.md` (marca)
2. `docs/10-SEGURIDAD.md` (seguridad)
3. `docs/02-REQUERIMIENTOS.md` (funcionalidad)
4. El resto de los archivos de `docs/`
