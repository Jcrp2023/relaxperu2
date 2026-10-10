# Radar editorial — 6 de octubre de 2026

## Altas comprobadas y preparadas
- Venta de libros de segunda mano: Lima, Patio AF Miraflores, Av. Arequipa 4595; 07/10/2026, 09:30–12:00. https://aflima.org.pe/evento/venta-de-libros-de-segunda-mano-4/
- Germán Tejada: el camino hacia Los Inocentes: Lima, Cine Lumière AF Miraflores, Av. Arequipa 4595; 09/10/2026, 19:00. https://aflima.org.pe/evento/german-tejada-el-caminohacia-los-inocentes/
- Club de lectura en francés: Lima, Mediateca AF Miraflores, Av. Arequipa 4595; 16/10/2026, 18:30–20:00. Mayores de edad, miembros de la Mediateca, nivel B1 o superior e inscripción previa. https://aflima.org.pe/evento/club-de-lectura-en-frances-2/
Las tres fichas se deduplicaron contra main y las propuestas 14/15 antes de ampliar fichas. No se afirma disponibilidad actual.

## Conservación y continuidad
Se conservan las 97 fichas VAOPE y 16 GTN del main b96bf8bdb9234f35ea2b26aca0486032252c9d6b en las dos copias; el main reciente cambia únicamente los archivos de importadores. No se pierden fichas vigentes de main. El PR14 no aporta una alta nueva y permanece abierto; no se fusiona ni publica.
Se corrige el informe regional: antes la ausencia de clasificación macro opcional producía ceros falsos por categoría. Ahora cuenta la categoría factual de cada ficha. Prueba de regresión añadida.
Para 07/10: main tiene 5 fichas y la propuesta 12 (Lima 10, Cusco 1, Iquitos 1). No son fichas comprobadas en dominio.
BTS del 07/10, Estadio San Marcos, Lima, sigue respaldado por BIGHIT: https://weverse.io/bts/notice/34732 . Las horas de preventa de abril no son horas de concierto. No se duplica esta ficha ya propuesta.
Carlos Ballarta del 06/10 a las 21:00, Lima, Teatro Peruano Japonés, reconfirmado en https://apj.org.pe/teatro/agenda_detalle/carlos-ballarta-presenta-naco-ladino .
No se verificó cancelación nueva; la revisión de cancelaciones de todas las fichas no está terminada.

## Cobertura real
Se hicieron consultas dirigidas de actualidad para las 226 rutas normalizadas heredadas, con primera pasada de las 22 áreas y todas las regiones. Estas consultas no equivalen a agenda leída ni permiten afirmar ausencia de eventos.
Teleticket: lectura parcial del listado próximo; Ticketmaster: destacados, con aviso de actividad sospechosa; AF: listado visible y fichas; MESA 24/7: parte del listado y fichas. El resto conserva su estado y siguiente acción.
Tras incorporar rutas individuales nuevas quedan 230 rutas pendientes/incompletas y 17 identidades sin URL verificada. La lista completa está en fuentes/radar-health.json (queue y unresolvedSources), preservando historial e identidades de Jahel. Las 22 áreas tienen revisión de contenido aún incompleta. No se consulta ni incorpora Vamos; apariciones incidentales en resultados se ignoran.
Inventario propuesto 06–12/10 por ciudad/categoría:
- Lima: shows 24, gastronomía 1, cultura 7, familia 6.
- Cusco: shows 2, cultura 1, familia 1.
- Piura: shows 2, deporte 1.
- Iquitos: shows 1, deporte 1.
- Ica/Pisco: ninguna ficha en esta ventana; cobertura pendiente, no ausencia de actividades.
Bienestar, turismo/naturaleza con salida concreta, astronomía y otras categorías sin ficha en la ventana requieren investigación; no se rellenan con guías ni temporadas.

## Pendientes y fallos comprobados
- Joinnus /search: Internal Error de herramienta, sin HTTP expuesto. La ficha individual El Percusionista ciego sí devuelve 403: https://www.joinnus.com/events/theater/lima-el-percusionista-ciego-78217 .
- El Percusionista ciego: organizador anuncia 6, 7, 12 y 13/10 a las 20:00, pero el lugar contiene “Arequipa” junto a Alianza Francesa de Lima. No se agrega hasta resolver ciudad/local. https://aflima.org.pe/evento/el-percusionista-ciego/
- VAOPE portada: respuesta sin contenido útil (0 líneas); no se acredita agenda completa ni se marca resuelto un bloqueo histórico.
- Fever: URL no accesible por herramienta, sin HTTP expuesto. Eventbrite Perú /d/peru/events/: 405 Method Not Allowed.
- Passline: redirige a selector de países; no es revisión de agenda peruana ni resolución del 403 histórico.
- Inquieto Fest: Piura, 17/10/2026, pendiente local y hora. Espace Liberté es referencia a julio 2025. https://arteinquieto.com/fest/
- Rally Super Prime: 08/10/2026 10:00, Kartódromo La Chutana confirmado; localización geográfica individual y venta completa pendientes. Organizador: https://rallycaminosdelinca.com/noticias/los-super-prime-en-caminos-del-inca/ . Venta devuelve error de herramienta “(400) Content length is too large: 4194305+”; no es cancelación ni 403 del sitio. https://www.ticketmaster.pe/event/rally-caminos-del-inca-super-prime-venta-general
- Urban Kitchen: fichas anuncian talleres 09/10 19:00 y 12/10 19:00 en Miraflores; falta comprobación de ficha original del organizador previa y selector de fecha/cupo contradictorio. No se agrega a catálogo.
- Guía Free Walking Tours Perú revisada como descubrimiento: no anuncia evento para hoy; dice que sus free tours son exclusivos para turismo receptivo. Operadores, salidas, puntos de encuentro, restricciones y pagos quedan pendientes.

## Validación y estado
Script radar_health.mjs ejecutado con fecha Lima 2026-10-06 y copias iguales; auditoría sin errores de datos. Comparación con snapshots de main por conector, sin afirmar git --base-ref local.
23 pruebas Node y 11 Python pasan sobre el conjunto final. npm ci --offline falla ENOTCACHED (yallist-3.1.1.tgz); no hay entorno local de build completo. Build y validación del último commit se comprueban en CI.
La validación anterior run 37368845460 no prueba un fallo de código: job 111960575734 cancelado, pasos no disponibles y logs 404 BlobNotFound.
Estado: preparado para revisión en PR15; sin fusión, integración nueva ni publicación comprobada.
