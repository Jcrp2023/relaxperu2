# Radar editorial · 12 de octubre de 2026

## Altas y correcciones verificadas

- **Bibliocine: Raíz (2024)** — Lima, San Borja; martes 13 de octubre, 07:00; Auditorio Mario Vargas Llosa de la BNP; ingreso libre hasta completar aforo. Fuente: https://eventos.bnp.gob.pe/agenda-cultural/bibliocine/raiz-2024-6242
- **CineArt Lab: Collage** — Lima, Miraflores; sábado 17 de octubre, 14:00–16:00; Cine Lumière de la Alianza Francesa; ingreso libre previa inscripción. Fuente: https://aflima.org.pe/evento/cineart-lab-collage/
- **Sesiones GTN: Una Muerte Light** — Lima, San Borja; martes 13 de octubre, 20:30. La inscripción figura agotada. Fuente: https://granteatronacional.pe/evento/sesiones-gtn-una-muerte-light
- **Sesiones GTN: Sinfonía por el Perú** — Lima, San Borja; miércoles 14 de octubre, 19:00. Inscripción anunciada desde el 12 de octubre a las 15:00, con cupos limitados. Fuente: https://granteatronacional.pe/evento/sesiones-gtn-sinfonia-por-el-peru
- Se retiró del importador la función vencida de Nicomedes Santa Cruz del 10 de octubre y se conservó la corrección editorial del Coro Nacional. Las dos copias del catálogo quedaron sincronizadas.

## Hoy y próximos días

- Para el **12 de octubre**, la propuesta contiene tres fichas: El Percusionista Ciego a las 20:00 y dos eventos de VAOPE con fecha confirmada pero hora pendiente. `main` contiene dos; la ficha de la Alianza Francesa sigue solo en el PR editorial.
- Conteos propuesta / `main`: 12 oct. **3/2**; 13 oct. **4/1**; 14 oct. **3/1**; 15 oct. **4/2**; 16 oct. **9/6**; 17 oct. **19/17**; 18 oct. **6/6**; 19 oct. **0/0**.
- No se rellenaron fechas por rangos de temporada, preventas o recorridos turísticos. El artículo Hoy Día se mantuvo solo como descubrimiento.

## Pendientes y descartes

- **Antes de Partir** — Lima, Teatro Canout, 12 de octubre: fecha y local visibles, pero hora no comprobada en fuente del organizador/recinto; no se incorporó.
- **Cazadores de Historias** — Lima, 13 de octubre; **Jammin** — Lima, 13 de octubre; **La Casa de Timoteo** — Iquitos, 18 de octubre: candidatos de boletería sin confirmación completa del organizador/recinto; quedan pendientes.
- Ticketmaster: Hermanos Castro y Los Pasteles Verdes muestran 12 de octubre sin año; la segunda URL corresponde a 2025. Se descartaron como evidencia de 2026.
- Urban Kitchen del 13 de octubre figura agotado; la ficha individual del taller del 12 devolvió “This experience couldn't be found”. No se incorporaron.
- Teleticket mantiene **Ivy Queen** cancelado y **José Feliciano** reprogramado al 7 de noviembre; no apareció un cambio nuevo que afecte fichas activas del catálogo.

## Cobertura y accesos

- Contenido revisado parcialmente: categorías de Teleticket, Ticketmaster, VAOPE, GTN, Alianza Francesa, BNP, Mesa 24/7 y Peru Runners. También se hizo primera pasada dirigida por Cusco, Ica/Pisco, Piura e Iquitos.
- Errores exactos: Teleticket `/todos`, `Failed to fetch`/ServerError de la herramienta sin código HTTP; Joinnus, HTTP 403; Eventbrite público, HTTP 405; Fever, URL no accesible por la herramienta; Passline redirigió al portal corporativo sin agenda Perú.
- Las consultas municipales regionales no devolvieron una ficha cultural individual verificable. Eso no se registró como “sin eventos”.
- Radar: 270 rutas acumuladas, 256 pendientes o parciales y 17 identidades de Jahel aún sin URL confirmada. Las 22 áreas siguen inventariadas; ninguna se declara cerrada por una búsqueda vacía.

## Validación y estado editorial

- Pruebas Node: **24 aprobadas**. Pruebas Python: **11 aprobadas**.
- Build local: no disponible porque `vite` no está instalado; debe validarse con CI del último commit.
- Cambios preparados para actualizar el PR editorial #15 sobre el avance actual de `main`. No están integrados ni comprobados en el dominio y no se fusionó ni publicó nada.
