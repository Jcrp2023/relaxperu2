# Conciliación semanal editorial — 12 de octubre de 2026

## Alcance y base revisada

Se reconciliaron `main`, los PR editoriales abiertos y el registro diario del 12 de octubre. En esta ronda se leyeron una vez `SOURCES.md`, `FUENTES_MACRONODULOS.md`, `FUENTES_EXPANSION.md`, `fuentes/Propuesta_Jahel_22_areas_2026-09-25.txt` y `fuentes/OPERACION_RADAR.md`. Se reutilizó la evidencia vigente del radar diario para evitar repetir consultas ya realizadas el mismo día.

- `main`: `da867e30a288767a955bf20ac828e7a1655590d0`.
- PR #15: `1cfac3d1a4eaa5d7fd2326d153d2276beeb2ad44`, actualizado sobre `main`, combinable.
- PR #14: `e4f334fc5ae9edd1612ace82ecdb09ef646f2709`, divergente y no combinable.

## Resultado de la reconciliación

El PR #15 conserva las correcciones útiles del PR #14: `scripts/classify_events.mjs`, `src/data/event-classifications.json` y `tests/classify_events.test.js` son equivalentes; además, #15 contiene las ampliaciones posteriores del catálogo, validaciones y operación del radar. Por ello, #14 queda técnicamente sustituido y no debe integrarse en paralelo. Se mantiene abierto; no se cerró ni fusionó.

No se añadieron más fichas al catálogo en esta pasada semanal: las altas y correcciones verificadas ya fueron incorporadas por el radar diario del mismo día en #15. Las dos copias del catálogo permanecen sincronizadas. No se detectaron errores de esquema, identificadores duplicados ni regresiones de clasificación en el conjunto propuesto.

Cambios editoriales vigentes en #15:

- Lima — **Bibliocine: Raíz (2024)** — 13/10/2026, 07:00.
- Lima — **Una muerte light** — 13/10/2026, 20:30; agotado.
- Lima — **Sinfonía por el Perú** — 14/10/2026, 19:00; inscripción abierta desde 12/10/2026, 15:00.
- Lima — **CineArt Lab: Collage** — 17/10/2026, 14:00–16:00.
- Se retiró la función vencida de **Nicomedes** del 10/10/2026 y se preservó la corrección previa de **Coro Nacional**.

No hubo una cancelación nueva confirmada después del cierre diario. **Ivy Queen** continúa excluida por cancelación documentada y **De La Rose** sigue sin fecha vigente comprobada.

## Calendario propuesto frente a `main`

| Fecha | PR #15 | `main` | Cobertura regional en PR #15 |
|---|---:|---:|---|
| 12/10 | 3 | 2 | Lima 3 |
| 13/10 | 4 | 1 | Lima 4 |
| 14/10 | 3 | 1 | Lima 2, Cusco 1 |
| 15/10 | 4 | 2 | Lima 3, Cusco 1 |
| 16/10 | 9 | 6 | Lima 8, Piura 1 |
| 17/10 | 19 | 17 | Lima 15, Cusco 2, Ica 1, Iquitos 1 |
| 18/10 | 6 | 6 | Lima 6 |
| 19/10 | 0 | 0 | Sin fichas verificadas |

Estas diferencias están **preparadas en el PR #15**, no integradas en `main` ni comprobadas en el dominio público.

## Cobertura y vacíos

El inventario de continuidad registra 87 revisiones de contenido y una cola de 256 fuentes pendientes o parciales; conserva 17 identidades de Jahel sin resolver. Las siete boleterías prioritarias siguen con cobertura parcial: revisar una ficha aislada no completa Teleticket, Ticketmaster, Joinnus, VAOPE, Fever, Eventbrite público ni Passline.

Para los próximos siete días, la cobertura categórica sigue concentrada en Lima:

- Lima: espectáculos 22, cultura 9, familia 5; turismo, gastronomía, bienestar y deporte sin cobertura suficiente.
- Cusco: espectáculos 2, cultura 1.
- Ica/Pisco: espectáculos 1.
- Piura: espectáculos 1.
- Iquitos: espectáculos 1.

Las 22 áreas continúan abiertas en el control de salud porque no tienen una revisión de contenido completa y vigente. Las siguientes rondas deben priorizar fuentes nunca revisadas o más antiguas, especialmente turismo/naturaleza, gastronomía/catas, bienestar, mascotas, astronomía, running, idiomas/comunidad, K-pop/geek y operadores de tours en Ica/Pisco, Piura e Iquitos.

## Validación

Sobre el commit editorial anterior se verificaron 24 pruebas Node y 11 pruebas Python. GitHub Actions **Verificar catálogo #28** concluyó correctamente y las dos vistas previas de Vercel informaron éxito. El entorno local no tenía `vite`, por lo que no se afirmó un build local. El registro `fuentes/radar-health.json` del 12/10/2026 no presenta errores de validación y corresponde al mismo conjunto de catálogo.

Estado de entrega:

- **Preparado:** PR #15.
- **Integrado en `main`:** no.
- **Publicado o comprobado en dominio:** no.
- **Fusión/cierre de PR:** no realizado.
