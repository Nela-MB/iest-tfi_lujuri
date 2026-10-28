# LujUri Boutique: instrucciones para la IA

> Responde a la pregunta: **¿Qué debe leer y respetar la IA?**

## Proyecto

**LujUri Boutique** es una tienda de ropa para mujer, hombre y niños que hoy vende por Instagram y WhatsApp, con entrega a domicilio. Este proyecto es su **catálogo online**: las clientas ven la ropa por categoría, arman su pedido y lo envían por WhatsApp para coordinar el pago y la entrega.

**Stack:** Next.js (React) + PostgreSQL (Neon) + Vitest + GitHub + Vercel.

## IA que trabaja en este proyecto

- **En el editor:** el agente del chat de VS Code (GitHub Copilot), que programa, corre los tests y propone los commits.
- **Fuera del editor:** Claude (Anthropic), usado en conversaciones aparte para redactar specs, planes, guiones y el informe.

En todos los casos, el agente debe:

- Leer este archivo y `memory.md` **al comenzar cada sesión**, y `docs/CONSTITUCION.md` antes de cada spec, plan o tarea.
- Seguir las especificaciones de `docs/` y `specs/` como única fuente de verdad del proyecto.
- Trabajar de a una tarea, explicar brevemente qué hizo y qué archivos cambió.
- Anotar en `memory.md` las decisiones nuevas y el avance, cuando se lo pidan.
- No guardar en ningún archivo claves, contraseñas ni datos personales de clientas.

## Ciclo de trabajo (Desarrollo Guiado por Especificaciones)

Cada funcionalidad vive en `specs/NNN-nombre/` y pasa por estas fases, en orden:

| Fase | Comando | Archivo |
|---|---|---|
| 1. Spec | `/spec` | `spec.md` |
| 2. Clarificación | `/clarificar` | `clarificacion.md` |
| 3. Plan | — | `plan.md` |
| 4. Tareas | — | `tasks.md` |
| 5. Implementación | — | código, tests y commits |
| 6. Validación | `/verificar` | `verificacion.md` |
| 7. Cambio | — | spec actualizada y commits |

Los comandos están en `.github/prompts/` (se escriben con `/` en el chat) y las skills propias en `.agents/skills/` (`verificar-criterios` y `revisar-marca`). Las instrucciones permanentes del editor están en `.github/copilot-instructions.md`.

## Antes de escribir código, leé

| Archivo | Propósito |
|---|---|
| `memory.md` | Memoria del proyecto: decisiones tomadas, estado actual y pendientes |
| `docs/CONSTITUCION.md` | Principios que no se negocian |
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
| `docs/PROMPTS.md` | Registro de pedidos importantes y errores de la IA |
| `docs/DECLARACION-IA.md` | Declaración de uso de IA |
| `multimedia/FICHAS-IA.md` | Una ficha por cada pieza generada con IA |

El logo y la paleta están en la carpeta `public/marca/`.

## Reglas obligatorias

### Qué hacer

- Usar **siempre** las variables CSS de `IDENTIDAD-MARCA.md` (por ejemplo `var(--color-principal)`).
- Escribir el nombre de la marca siempre como **LujUri** (junto, con la U mayúscula).
- Acceder a la base de datos **solo** desde `src/lib/db.js`.
- Escribir las consultas SQL **siempre con parámetros**, nunca pegando texto del usuario.
- Calcular los totales del pedido en el **servidor**, con los precios de la base.
- Escribir los textos del sitio en español rioplatense (voseo), con el tono de la marca.
- Trabajar **una tarea por vez**, con **tests primero**, y un **commit por tarea** según `07-CONVENCIONES.md`.
- Marcar la tarea con `[x]` al terminarla.
- Dejar que la persona lea y entienda cada archivo antes de aceptarlo.
- Poner la leyenda **«Generado con IA»** en toda imagen, video o gráfico creado con IA.

### Qué no hacer

- No usar colores ni fuentes escritos a mano fuera de `IDENTIDAD-MARCA.md`.
- No deformar, rotar, recolorear ni agregar efectos al logo.
- No mostrar ni subir `DATABASE_URL`, el número real de WhatsApp ni ningún dato del archivo `.env.local`.
- No inventar precios: usar `$ 0` como marcador.
- No inventar marcas reales, descuentos, talles ni datos de clientas.
- No inventar datos para los gráficos: deben salir del repositorio.
- No agregar tecnologías que no estén en `03-TECNOLOGIAS.md`.
- No agregar pago online ni cuentas de usuario (quedan fuera por ahora).
- No generar imágenes, voces ni videos de personas reales, ni imitar marcas, logos o artistas.
- No ejecutar comandos ni instalar skills externas sin que la persona los lea antes.

## Si algo no está claro

**Preguntar antes de inventar.** Si un dato falta o dos archivos se contradicen, la IA debe avisarlo y esperar la respuesta, en lugar de suponer.

## Orden de prioridad ante contradicciones

1. `docs/CONSTITUCION.md`
2. `docs/IDENTIDAD-MARCA.md` (marca)
3. `docs/10-SEGURIDAD.md` (seguridad)
4. `docs/02-REQUERIMIENTOS.md` y la `spec.md` de la funcionalidad
5. El resto de los archivos de `docs/`
