# Conciliación semanal · 19 de octubre de 2026

## Resultado editorial

Sin nuevas altas, correcciones de catálogo ni cancelaciones suficientemente verificadas en esta ronda. No se hace commit de catálogo por rellenar cantidades. Se conservan ambas copias idénticas y las diez propuestas del PR18; ocho siguen vigentes. Los partidos Arsenal–Arenal y Bad Boys–Palmeiras del18/10 ya vencieron y no se ofrecen como próximos. PR14 permanece abierto, redundante/divergente; no se cierra ni se copia sobre main.

Base main: b5babdf3f8c24eee27fca23e695198774f5e768e. Padre editorial:8b5b71f9fc274bffd4a9952dff9743236eb4a094. Ambas copias principales/PR cargadas y contrastadas; importadores de main no se modifican. Auditoría offline sin errores de validación. Se conservan guías y experiencias separadas de eventos fechados y la prioridad manual para duplicados de URL.

## Ocho fichas vigentes preparadas, no integradas

| Ficha | Ciudad/local | Fecha y hora America/Lima |
|---|---|---|
| [Candy Candy](https://aflima.org.pe/evento/presentacion-de-librocandy-candy/) | Lima, Mediateca AF Miraflores |21/10 18:30–20:00 |
| [Cine Europeo](https://aflima.org.pe/evento/38-festival-de-cine-europeo/) | Lima, Cine Lumière AF |13 sesiones explícitas21–28/10, sin25 ni26 19h |
| [Biblioteca abre de noche](https://eventos.bnp.gob.pe/agenda-cultural/visitas-mediadas/la-biblioteca-abre-de-noche-6291) | Lima, BNP San Borja |22/10 18:00 |
| [Discos Thriller](https://eventos.bnp.gob.pe/agenda-cultural/sonidos-de-la-biblioteca/discos-thriller-6287) | Lima, Anfiteatro BNP |22/10 19:00 |
| [Grau–ADT](https://vaope.com/eventos/futbol/atletico-grau-vs-adt-por-la-liga-1) | La Matanza/Piura, estadio Ambrosio Maco Arroyo |23/10 15:15 |
| [Mavka](https://eventos.bnp.gob.pe/agenda-cultural/bibliocine/mavka-guardiana-del-bosque-6288) | Lima, Hall BNP |24/10 18:30 |
| [Jazz Nuevo Perú](https://aflima.org.pe/evento/ciclo-de-jazz-europeo/) | Lima, Teatro AF Miraflores |28/10 20:00 |
| [Genealogías hechas a mano](https://mali.pe/es/activity/laboratorio-genealogias-hechas-a-mano-de-guadalajara-a-lima-a-cargo-de-luis-f-munoz-mexico/) | Lima, Auditorio MALI |14/11 11:00–13:00; postulación23/10–04/11 y selección06/11 |

Se reutiliza evidencia individual vigente de informes diarios; no se repiten publicaciones como altas nuevas. Disponibilidad/aforo pendientes; MALI requiere selección. Hoy main1 vsPR1 en Ica.22/10 main4 vsPR7;23/10 main9 vsPR11;24/10 main14 vsPR16. Conteos de fichas por fecha, no del universo de actividades de cada ciudad ni prueba de visibilidad en el dominio.

## Vacíos y comprobaciones de esta ronda

- 176 consultas dirigidas para318rutas iniciales;17 consultas de identidades sugeridas, sin nuevas identidades confirmadas. Todas las22áreas y URLs históricas conservadas. No se consultó Vamos.
- Cola regenerada:322 rutas pendientes/parciales/desactualizadas y17identidades pendientes. Contenido acumulado registrado en142 rutas no significa revisión completa vigente de las322. Las siete boleterías y22áreas siguen sin cierre integral.
- Cusco:agenda accesible en esta lectura, pero muestra últimos eventos2025; no acredita programación actual ni ausencia de eventos. Ica:programa oficial enlaza PDF46,651,475bytes que la herramienta rechaza por tamaño; faltan funciones verificables. Iquitos:municipio Internal Error. Piura:portal turístico400Timeout. Mantener fuentes/regiones en cola.
- Passline:la raíz hoy redirige a selector de países; acceso puntual comprobado, pero no es agendaPerú revisada ni resolución de todas sus restricciones. Joinnus Internal Error sinHTTP, Fever no accesible por herramienta, Eventbrite405. IGP418; se mantienen horas del25/10 pendientes por contradicción histórica.
- Mesa24/7:revisado contenido parcial y ficha individual Isolina Surco, ElPolo605. Oferta de cena de90min con reserva dinámica sin hora disponible comprobable; no se transforma22/10 de listado en función. Perroquet(cata) Internal Error de herramienta al seguir enlace33; pendiente. Gastronomía/alta cocina no completadas.
- LUM muestra agenda hasta septiembre; Filo redirige portada/muestras históricas; APJ presenta calendario sin contenido útil para mes completo. No extender temporadas ni interpretar estructuras vacías como ausencia de eventos.
- Guía Free Walking Tours identifica restricción a turismo receptivo y propinas; no se anuncia como gratis para nacionales ni como salida de hoy. No se verificó operador/salida concreta nueva, por eso no se incorpora tour.
- Running/Callao:partida de media maratón pendiente. Mascotas:recinto y acceso KCP pendientes. Bienestar, astronomía, comunidades/K-pop, naturaleza y agendas municipales necesitan fichas originales; no se ocultan vacíos.

## Bloqueo operativo verificado

Ejecución [Actualizar agenda oficial39306506912](https://github.com/Jcrp2023/relaxperu2/actions/runs/39306506912), job update118244861191,19/10/2026. GTN,VAOPE,clasificación,auditoría,24pruebasNode ybuild pasaron. Falló el paso Preparar cambios comprobados en un PR con:

> pull request create failed: GraphQL: GitHub Actions is not permitted to create or approve pull requests (createPullRequest)

El flujo guardó cambios en codex/agenda-oficial-2026-10-19(commit b2e7b5e) antes del rechazo. No es bloqueo de boletería ni fallo del build. No se modifican permisos,se extraen credenciales ni se intenta eludir el control. Siguiente paso del propietario:revisar la autorización de GitHub Actions para crear PR y reejecutar solo tras habilitación aplicable; confirmar nuevoPR yúltimoCI. El PR18 sigue independiente. No se presenta la importación bloqueada como integrada.

## Validación y entrega

radar_health ejecutado después del registro; salida guardada. Comparación con main recalculada desde su snapshot actual. Sin cambios de catálogo/código enesta ronda; solo informe,registro ysalud. CI/build del commit final por comprobar enPR18. Preparado,no integrado ni publicado. No merge automático.
