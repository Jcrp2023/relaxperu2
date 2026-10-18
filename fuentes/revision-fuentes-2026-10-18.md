# Radar editorial · 18 de octubre de 2026

## Cinco altas propuestas

Todas tienen fecha, hora, ciudad, recinto y enlace individual verificados. Disponibilidad pendiente, con aviso visible en tarjeta/detalle.

| Actividad | Ciudad y local | Fecha/hora America/Lima | Evidencia |
|---|---|---|---|
| Arsenal FBC vs. Alianza Arenal Moro | Lima, Estadio Municipal de Chorrillos | 18/10/2026 17:30 | https://vaope.com/eventos/futbol/arsenal-fbc-vs-alianza-arenal-moro-por-la-copa-peru-vaope-2026 |
| Bad Boys vs. Juventud Palmeiras | Pisco/Ica, Estadio Teobaldo Pinillos Olaechea | 18/10/2026 18:00 | https://vaope.com/eventos/futbol/cd-bad-boys-vs-juventud-palmeiras-por-la-copa-peru-vaope-2026 |
| Candy Candy: libro/conferencia | Lima, Mediateca AF Miraflores, Av. Arequipa4595 | 21/10/2026 18:30–20:00 | https://aflima.org.pe/evento/presentacion-de-librocandy-candy/ |
| 38 Festival de Cine Europeo | Lima, Cine Lumière AF Miraflores | 13 funciones explícitas21–28/10 (sin25 ni26 19:00) | https://aflima.org.pe/evento/38-festival-de-cine-europeo/ |
| Nuevo Perú: Ciclo de Jazz Europeo | Lima, Teatro AF Miraflores, Av. Arequipa4595 | 28/10/2026 20:00 | https://aflima.org.pe/evento/ciclo-de-jazz-europeo/ |

El ciclo conserva una ficha con13 sesiones exactas y el desglose película/fecha/hora en cobertura-fuentes-2026-10-18.json; no se expande el rango. Los tortuga queda excluida por discrepancia22/10 vs26/10 19:00. AF: publicación2026 confirmada en metadatos originales (Candy Candy30/09/2026; Jazz28/09/2026; Cine29/09/2026, modificado02/10). Ingreso libre hasta aforo para estas actividades culturales, sin promesa de cupos.

## Reconfirmaciones y pendientes

- Yuyachkani, GTN, Lima:18/10 17:30 sigue confirmado, ya integrado. No duplicar.
- Timoteo, Iquitos, Selva Arena:18/10 aparece en listado Teleticket, pero la ficha individual no expone fecha de función fuera de condiciones comerciales ni hora. No se incorpora hasta evidencia individual suficiente. Dirección:Pasaje Jorge Chávez347, Moronacocha. RUC20544159586; identidad del productor por completar.
- Media Maratón Callao:25/10/2026, hora de salida06:30; punto de salida pendiente. Escuela Naval se refiere a entrega de kits23/24, no se traslada a la carrera.
- Dos sesiones AF son virtuales:Mediatecas21/10 17–18h y CineLabs24/10 14h. Se registran aparte y no se presentan como planes presenciales.
- Aviso de cancelación Antes de partir corresponde al05/05/2026, no permite cancelar la función anunciada19/10. No se confirmaron nuevas cancelaciones del catálogo activo. Auditoría parcial.
- Guide Free Walking Tours revisada como descubrimiento; sin salida fechada verificada, sin altas ni garantía de gratuidad.

## Cobertura y continuidad

Base main b5babdf3f8c24eee27fca23e695198774f5e768e. PR15 integrado ayer; rama cerrada no reutilizada. PR14 abierto e inspeccionado, sin estos candidatos. Ambas copias de catálogo main coinciden; no se alteran importadores ni cambios previos. Hoy:7 fichas en main frente a9 propuestas (Lima8, Ica/Pisco1). Conteos por fecha, no disponibilidad ni publicación.

175 consultas dirigidas de actualidad para298 rutas iniciales, más17 consultas de identidades candidatas; no acreditan lectura de agendas. Cola íntegra guardada:308 rutas pendientes/parciales/desactualizadas, las22 áreas sin cierre integral y17 identidades pendientes. Lima/Callao y departamento, Cusco, Ica/Pisco, Piura e Iquitos conservan pendientes. Altas en Lima(cultura,música,deporte) e Ica/Pisco(deporte); sin nuevas altas suficientemente verificadas en Cusco,Piura,Iquitos. Gastronomía,catas,bienestar,mascotas,astronomía,idiomas,K-pop/geek,turismo,naturaleza y resto de áreas conservan próxima acción en la cola. No se declara ausencia de eventos.

Teleticket,Ticketmaster,VAOPE:contenido parcial. Joinnus:Internal Error de herramienta,sin HTTP expuesto. Fever:no accesible por herramienta. Eventbrite405. Passline403(estado previo de redirect loop no se declara resuelto). Cusco agenda:400 Timeout fetching. Errores exactos y fuentes revisadas en JSON; sin elusión, reintentos masivos ni inferencias de cancelación. No se consultó Vamos.

## Validación y entrega

radar_health ejecutado18/10 y resultado guardado;20 pruebas locales pasan. CI/build del commit final por comprobar en PR. Preparado, no integrado, sin comprobación de publicación para estas5altas. Autorización de merge de ayer correspondió alPR15 y no se extiende automáticamente al nuevo PR.
