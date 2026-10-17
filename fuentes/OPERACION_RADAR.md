# Operación y control de cobertura de RelaxPerú

La cantidad de fichas del catálogo no mide la cantidad de eventos disponibles en una ciudad. Esta revisión automatiza la detección de vacíos y la continuidad del trabajo editorial; no promete acceso a siete boleterías ni importa eventos desde extractos de búsqueda.

## Inicio de cada ronda

1. Cargar los cuatro documentos originales y las dos copias del catálogo, el PR editorial compatible y los registros `cobertura-fuentes-*.json`. No reemplazar el trabajo anterior ni perder cuentas sin URL confirmada.
2. Ejecutar `node scripts/radar_health.mjs --date AAAA-MM-DD`. En un checkout con main disponible: añadir `--base-ref origin/main`. Leer `fuentes/radar-health.json`: contiene URLs normalizadas, las 22 áreas, identidades sociales pendientes, cola ordenada y conteos para hoy y los próximos siete días. La copia versionada es un checkpoint, no un indicador en tiempo real.
3. Revisar contenido vigente de Teleticket, Joinnus y Ticketmaster en cada ronda, junto con VAOPE, Fever, Eventbrite público y Passline. Buscar novedades/cancelaciones primero. No sustituir esta tarea por una búsqueda combinada de 100 dominios. Si falla una ruta, guardar el error exacto y consultar como máximo una alternativa oficial pertinente. Un 429 se deja para otra ronda, sin más intentos.
4. Dar una primera pasada de actualidad a todas las regiones y 22 áreas. Después avanzar en la cola desde las fuentes nunca revisadas o más antiguas. El plazo interno de contenido es un día para boleterías y siete días para las restantes fuentes; no sustituye la comprobación diaria de actualidad solicitada. Una revisión incompleta se informa como tal; no como ausencia de eventos.

## Registro de evidencia

Los registros nuevos conservan `url`, `consultedAt`, `method`, `status`, `contentReviewedThisRound`, `lastEvidence` y `nextAction`. Escribir `contentReviewedThisRound: true` solo tras leer contenido útil de la URL exacta (agenda o ficha); una ficha de BTS no prueba que se haya revisado toda la agenda de Ticketmaster. Mantener `false` para mera comprobación de acceso o búsqueda por dominio. Una consulta nueva fallida no borra la evidencia anterior ni acredita una cancelación. Las rutas excluidas de competidores se conservan identificadas y nunca se consultan.

Para fichas nuevas guardar fecha real, ciudad, recinto, enlace individual original y contraste público de venta; horarios definitivos y disponibilidad no comprobados permanecen pendientes. No expandir temporadas, recurrencias ni fechas de preventa como funciones. Las guías y experiencias permanentes no completan Hoy. Identificar perfiles sociales y operadores de tours antes de usarlos. Deduplicar contra catálogo y PR abiertos antes de ampliar investigación de un candidato.

## Cierre de cada ronda

- Preparar diariamente altas/correcciones comprobadas en el PR compatible; guardar avances y regenerar el informe antes de agotar recursos. No crear commits de catálogo cuando no hay altas válidas.
- Ejecutar pruebas y build sobre el conjunto final. La auditoría comprueba también las dos copias, enlaces permitidos, IDs y fechas; un fallo de datos detiene la validación. La falta de cobertura genera avisos y cola, sin bloquear actualizaciones válidas de otras fuentes.
- Informar por separado: agregado al PR, integrado en main y comprobado en el dominio. El informe compara main con el catálogo propuesto; no decir que una ficha aparece en la web porque existe en una rama.
- No fusionar ni desplegar cambios editoriales sin autorización aplicable. Si un PR queda abierto, mencionar el retraso de integración y las fichas pendientes. Esta condición no se resuelve inventando disponibilidad ni ocultando vacíos.
- La revisión semanal toma primero la cola acumulada y revisa las alertas; no repite solo las fuentes que respondieron el día anterior.

## Controles automáticos

El workflow de PR genera y adjunta el informe de salud, comparando con main. El workflow diario existente genera un informe tras los importadores y lo adjunta a GitHub Actions; no modifica el catálogo editorial. Estos controles se activan cuando el PR se integra. Las tareas editoriales recurrentes pueden trabajar desde el PR abierto antes de esa integración.

Se preserva la importación automática validada de GTN y VAOPE; el flujo prepara sus datos en una rama codex y reutiliza un PR compatible o crea una propuesta borrador, sin push a main ni fusión. GitHub debe permitir al token crear PR; si esa opción está desactivada, la ejecución falla de forma visible después de conservar el artefacto, sin publicar. Añadir un extractor de otra plataforma requiere comprobar sus condiciones y demostrar en pruebas que obtiene fichas individuales, fechas reales, ciudades y recintos. Hasta entonces la vía es la revisión pública original y el registro de pendientes, sin eludir restricciones.
