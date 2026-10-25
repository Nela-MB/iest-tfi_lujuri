# 03-TECNOLOGIAS: con qué construimos LujUri Boutique

> Responde a la pregunta: **¿Con qué lo construimos?**
> Se mantiene el stack trabajado en clase (React con Next.js, PostgreSQL, GitHub y Vercel) porque se ajusta bien a un catálogo con pedidos por WhatsApp. Se agrega Vitest para las pruebas automáticas que exige el Trabajo Final.

## Stack elegido

| Capa | Tecnología | Función | Motivo de la elección |
|---|---|---|---|
| Interfaz (frontend) | **React** | Arma las pantallas con componentes reutilizables | Una sola tarjeta de prenda se repite para todo el catálogo; si se cambia el diseño, se cambia en un lugar |
| Framework | **Next.js** | Rutas, API y SEO en un solo proyecto | Permite crear las páginas y también la ruta que guarda los pedidos, sin un servidor aparte; mejora la visibilidad en Google |
| Estilos | **CSS + variables** | Aplica colores y tipografías de la marca | Fiel a `IDENTIDAD-MARCA.md`: si cambia un color se edita una sola línea |
| Base de datos | **PostgreSQL** (en Neon) | Guarda prendas, talles, colores, pedidos y consultas | Ordena la información en tablas relacionadas y Neon tiene plan gratuito suficiente para una tienda chica |
| Pruebas | **Vitest** | Tests automáticos con `npm test` | Es liviano, funciona con JavaScript moderno y permite probar totales, validaciones y filtros antes de programarlos |
| Repositorio | **Git + GitHub** | Guarda el código y su historial | Permite volver a una versión anterior y mostrar un commit por tarea |
| Publicación | **Vercel** | Publica el sitio con HTTPS | Se actualiza solo con cada `git push` y es gratis para proyectos chicos |
| IA | **Claude** (Anthropic) | Asistente que genera y revisa código a partir de las especificaciones | Lee `AGENTS.md` y `memory.md` en cada sesión y respeta las reglas de la marca, la base y la seguridad |

## Por qué le sirve a LujUri

- **Catálogo que crece:** las prendas viven en la base de datos, así que agregar ropa nueva no obliga a rehacer páginas.
- **Visibilidad:** las clientas llegan desde Instagram y Google; Next.js genera páginas con título y descripción propios para cada sección.
- **Costo cero para empezar:** Neon, GitHub y Vercel tienen planes gratuitos acordes a un emprendimiento nuevo.
- **Pedido por WhatsApp:** no se necesita pasarela de pago; el servidor arma el mensaje y el botón abre el chat.
- **Mantenible y verificable:** el código queda ordenado, documentado y con pruebas automáticas.

## Cómo se conecta todo

```text
Navegador (celular de la clienta)
        │  HTTPS
        ▼
Vercel · Next.js
   ├── Páginas React        → inicio, catálogo, pedido, contacto
   ├── Rutas de API /api/…  → guardan pedidos y consultas, arman el enlace de WhatsApp
   └── src/lib/db.js        → única conexión a la base (usa DATABASE_URL)
        │  SQL
        ▼
PostgreSQL en Neon          → prendas, talles, pedidos, consultas

Computadora (editor + Claude) ──git push──► GitHub ──publica──► Vercel
```

> La contraseña de la base de datos y el número de WhatsApp viven en el servidor: **nunca llegan al navegador**.

## Variables de entorno

| Variable | Dónde se guarda | Uso |
|---|---|---|
| `DATABASE_URL` | `.env.local` y panel de Vercel (secreta) | Conexión a PostgreSQL |
| `WHATSAPP_NUMERO` | `.env.local` y panel de Vercel (secreta) | Número de WhatsApp de la tienda; el servidor devuelve el enlace ya armado |

## Comandos del proyecto

```bash
npm run dev     # servidor local
npm test        # tests automáticos (Vitest)
npm run build   # compilación de producción
```

## Fuentes de la marca

Se cargan desde Google Fonts con el sistema de fuentes de Next.js:

```javascript
// src/app/layout.js
import { Sacramento, Cormorant_Garamond, Montserrat } from "next/font/google";
```

## No usar en este proyecto

- Tailwind y Bootstrap (los estilos son CSS propio con variables).
- Vue, Angular y jQuery.
- MongoDB y Firebase (la base es PostgreSQL).
- Prisma y TypeScript, por ahora.
- Pasarelas de pago y sistemas de login (quedan fuera por ahora).

> Es una decisión del proyecto, no una regla eterna: si algo cambia, **primero se edita este archivo y después el código**.
