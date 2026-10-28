# LujUri Boutique

Catálogo online de ropa para mujer, hombre y niños, con pedido por WhatsApp.
Trabajo Final Integrador de Inteligencia Artificial, desarrollado con agentes de IA siguiendo el Desarrollo Guiado por Especificaciones.

- **Sitio publicado:** _(https://iest-tfi-lujuri.vercel.app/)_
- **Estudiante:** Barrionuevo, Marianela
- **Carrera:** Tecnicatura Superior en Desarrollo de Software, 3.er año
- **Institución:** Instituto de Estudios Superiores de Tinogasta

## Stack

Next.js (React) · PostgreSQL (Neon) · Vitest · GitHub · Vercel

## Cómo está organizado

| Carpeta | Contenido |
|---|---|
| `docs/` | Especificaciones, constitución, prompts y declaración de IA |
| `specs/` | Una carpeta por funcionalidad, con las fases del ciclo SDD |
| `src/` | Código del sitio |
| `tests/` | Tests automáticos |
| `multimedia/` | Imágenes, video y gráficos generados con IA, con sus fichas |

## Cómo ejecutarlo

```bash
npm install
npm run dev     # servidor local
npm test        # tests automáticos
npm run build   # compilación de producción
```

Antes de ejecutarlo hay que crear un archivo `.env.local` con `DATABASE_URL` y `WHATSAPP_NUMERO` (ver `docs/10-SEGURIDAD.md`).

> Las imágenes, videos y gráficos creados con IA están identificados con la leyenda «Generado con IA».
