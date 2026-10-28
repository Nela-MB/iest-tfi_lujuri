---
name: verificar-criterios
description: Verifica uno por uno los requisitos y criterios de finalización de una spec contra el código y los tests, y genera el informe verificacion.md. Usar cuando se pida verificar, validar o revisar si una funcionalidad cumple su spec.
---
# Skill: verificar-criterios

## Cuándo usarla

Al terminar la implementación de una funcionalidad, o cuando se ejecute `/verificar`.

## Procedimiento

1. Abrir `specs/NNN-nombre/spec.md` y listar todos los requisitos EARS y los criterios de finalización.
2. Para cada requisito, buscar la evidencia: archivo de código, test automático o paso de prueba manual.
3. Decidir el resultado:
   - **Cumple**: hay código y un test que lo comprueba.
   - **No cumple**: falta código, falta el test o el test falla.
   - **Prueba manual pendiente**: solo se puede comprobar a mano (por ejemplo, que el botón abra WhatsApp).
4. Si no cumple, clasificar la causa: **código** (no hace lo que dice la spec) o **spec** (la spec es ambigua, incompleta o contradictoria).
5. No corregir nada: solo informar.
6. Comprobar también la constitución: sin colores escritos a mano, SQL parametrizado, sin secretos y textos en voseo.

## Formato del informe (`verificacion.md`)

```markdown
# Verificación: <nombre de la funcionalidad>

| Requisito | RF | Resultado | Evidencia | Causa si falla |
|---|---|---|---|---|
| R1 ... | RF01 | Cumple | `tests/catalogo.test.js` | — |

## Resumen
- Cumplen: X de Y
- No cumplen: ...
- Pruebas manuales pendientes: ...
- Recomendación: ...
```

## Reglas

- No marcar "Cumple" sin evidencia concreta.
- No inventar tests ni resultados.
- Pedir permiso antes de ejecutar comandos.
