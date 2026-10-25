# 10-SEGURIDAD: cómo protegemos datos y sistema

> Responde a la pregunta: **¿Cómo protegemos datos y sistema?**

## Datos sensibles

| Dato | Dónde vive | Regla |
|---|---|---|
| `DATABASE_URL` (contraseña de la base) | `.env.local` y variables de Vercel | Nunca se muestra, se sube a GitHub ni llega al navegador |
| Contactos de las consultas | Tabla `consultas` | Solo se usan para responder; no se muestran en el sitio |
| Pedidos | Tablas `pedidos` y `pedido_items` | Solo se leen desde el servidor |
| Número de WhatsApp del negocio | Variable `WHATSAPP_NUMERO` | Se carga por variable de entorno y no se escribe fijo en el código |

> No se piden ni se guardan contraseñas, tarjetas ni documentos de identidad.

## Variables de entorno

```bash
# .env.local  (NO se sube a GitHub)
DATABASE_URL=postgresql://usuario:clave@host/basededatos
WHATSAPP_NUMERO=+54XXXXXXXXXX
```

- `.env.local` está en `.gitignore`.
- Ninguna variable de datos sensibles lleva el prefijo `NEXT_PUBLIC_`.
- En producción se cargan desde el panel de Vercel.
- El repositorio es **público**: en los archivos solo van valores de ejemplo, nunca el número ni las claves reales.

## SQL seguro

```js
// MAL: pega el texto del usuario en la consulta
const consulta = "SELECT * FROM productos WHERE categoria = '" + cat + "'";

// BIEN: el valor viaja como parámetro
const filas = await sql`SELECT * FROM productos WHERE categoria = ${cat}`;
```

## Validaciones en la API

| Dato | Validación |
|---|---|
| `categoria` | Solo `mujer`, `hombre` o `ninos` |
| `cantidad` | Número entero entre 1 y 20 |
| `variante_id` | Debe existir y tener stock |
| `nombre` (consulta) | Obligatorio, hasta 80 caracteres |
| `contacto` (consulta) | Obligatorio, hasta 120 caracteres |
| `mensaje` (consulta) | Obligatorio, hasta 1000 caracteres |

- Se valida **siempre en el servidor** (`src/app/api/`): el navegador se puede manipular.
- Los errores devuelven mensajes amables, sin detalles técnicos ni de la base.

## Total del pedido

- El navegador envía solo los **identificadores** y las **cantidades**.
- `src/app/api/pedidos/route.js` busca los precios en la base y calcula el total.
- Nunca se confía en un precio o total que venga del navegador.

## Qué nunca debe llegar al navegador

- [ ] `DATABASE_URL` ni ninguna credencial.
- [ ] Consultas SQL ni mensajes de error de la base.
- [ ] Datos de otros pedidos o de otras clientas.
- [ ] Variables sin `NEXT_PUBLIC_` (se quedan en el servidor).

## Reglas para el código

- Nunca usar `dangerouslySetInnerHTML` (React ya escapa el texto).
- La base solo se usa desde `src/lib/db.js`.
- Usar HTTPS (Vercel lo activa automáticamente).
- Si una clave se expone por error, **cambiarla de inmediato** en Neon y Vercel.
- Mantener las dependencias actualizadas con `npm audit`.

## Uso seguro de la IA

- Nunca pegar en un prompt claves, contraseñas, `DATABASE_URL` ni datos personales reales de clientas.
- Leer y entender todo el código antes de aceptarlo; no autorizar comandos sin mirarlos.
- Leer completas las skills externas antes de instalarlas.
- Antes de cada commit, revisar que no haya secretos en los archivos que se suben.
