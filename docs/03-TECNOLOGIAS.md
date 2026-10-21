# 03-TECNOLOGIAS: con qué construimos LujUri Boutique

> Responde a la pregunta: **¿Con qué lo construimos?**

## Stack elegido

| Capa | Tecnología | Motivo de la elección |
|---|---|---|
| Interfaz (frontend) | **React** | Permite armar piezas reutilizables (tarjeta de prenda, filtro, resumen del pedido) y mantenerlas ordenadas |
| Framework | **Next.js** (enrutador `app/`) | Une páginas, rutas de API y SEO en un solo proyecto; sirve para que Google encuentre el catálogo |
| Estilos | **CSS + variables** | Los colores y fuentes de la marca se definen una sola vez y se reutilizan; sin librerías extra |
| Fuentes | **Google Fonts** (vía `next/font`) | Sacramento, Cormorant Garamond y Montserrat tienen licencia libre para la web |
| Base de datos | **PostgreSQL** en **Neon** | SQL estándar, plan gratuito y buena conexión con Vercel; guarda prendas, pedidos y consultas |
| Repositorio | **Git + GitHub** | Guarda el historial de cambios y permite trabajar con ramas y Pull Requests |
| Publicación | **Vercel** | Publica automáticamente en cada `push` y da HTTPS sin configurar nada |
| IA de desarrollo | **Claude** (Anthropic) | Lee `AGENTS.md`, `MEMORY.md` y los archivos de `docs/` para generar código respetando la marca y las reglas; entiende bien Markdown |
| Editor | **VS Code** | Vista previa de Markdown con `Ctrl + Shift + V` |
| Mensajería | **Enlace `wa.me` de WhatsApp** | No requiere API ni costo: abre el chat con el pedido ya escrito |

## Cómo se conecta todo

```text
Navegador de la clienta --HTTPS--> Vercel (Next.js: páginas React + /api/...)
                                        |
                                        +--SQL--> PostgreSQL (Neon)
Computadora (VS Code + Claude) --git push--> GitHub --publica--> Vercel
```

> La contraseña de la base (`DATABASE_URL`) vive en el servidor y nunca llega al navegador.

## Versiones y dependencias

```bash
npx create-next-app@latest lujuri-boutique   # JavaScript, App Router, sin Tailwind
npm install @neondatabase/serverless          # conexión a PostgreSQL
```

## No usar en este proyecto

- Tailwind y Bootstrap (los estilos van con CSS y variables de la marca).
- Vue, Angular y jQuery.
- MongoDB y Firebase.
- Prisma y TypeScript, por ahora.
- Pasarelas de pago ni librerías de login (fuera del alcance).
- Cualquier tecnología que no figure en este archivo.

> Es una decisión del equipo, no una regla eterna: si algo cambia, **primero se edita este archivo y después el código**.
