# Revisión de fuentes · 11 de octubre de 2026

## Resultado editorial

- **Alta preparada:** **Funciones del Planetario Nacional · octubre** — Lima (Ate), Planetario Nacional Mutsumi Ishitsuka, **11 y 25 de octubre**. El IGP confirma las fechas, el local y la dirección, pero su campaña publica dos juegos de horarios incompatibles; la ficha queda con **hora y disponibilidad pendientes**.
  - Fuente oficial: https://www.gob.pe/institucion/igp/campañas/97299-visitar-el-planetario-nacional-del-igp
- **Corrección preparada:** **Coro Nacional del Perú: Petite Messe Solennelle de Rossini** — Lima, Gran Teatro Nacional, **11 de octubre, 11:30**. Entrada gratuita con inscripción previa por Joinnus y cupos limitados.
  - Recinto: https://granteatronacional.pe/evento/coro-nacional-del-peru-petite-messe-solennelle-de-rossini
- **Cambio comprobado:** **De La Rose · LATAM Tour** fue reprogramado a una fecha por confirmar. Se retiró del catálogo fechado hasta que exista una nueva fecha oficial.
  - Avisos Teleticket: https://ayuda.teleticket.com.pe/helpcenter/category/eventos-modificados-o-cancelados
- **Corrección estructural:** el catálogo visible ahora deduplica por identificador o enlace individual normalizado. Cuando coinciden una ficha manual y una importada, conserva primero la manual con sus horarios verificados.
- **Sincronización de main:** se conservó la actualización automática de GTN del commit `f027788009fa6c8ba91287340c7b88990eec1b0f`.

## Confirmados cercanos

- **Coro Nacional: Petite Messe Solennelle** — Lima, **11 de octubre, 11:30**.
- **Expo Maternidad Lima 2026** — Lima, Jockey Plaza, **11 de octubre, 11:00**; ya estaba preparada en el PR.
- **Cuentos Sinfónicos de Disney** — Cusco, Teatro Municipal, **11 de octubre, 19:00**; la copia manual prevalece sobre la importada sin hora.
- **Funciones del Planetario Nacional** — Lima, Ate, **11 y 25 de octubre; hora pendiente** por contradicción de la fuente.
- **El Percusionista Ciego** — Lima, Sala Lumière, **12 y 13 de octubre, 20:00**; ya estaba preparado en el PR.

## Pendientes, descartes y límites

- **Bratty** — Ticketmaster identifica C.C. Leguía y Vichama EIRL, pero la ficha abierta muestra **viernes 16 de abril, 21:00**, mientras el resultado de agenda la relaciona con el **11 de octubre**. Contradicción sin resolver; no se incorpora.
- **Enanitos Verdes, Amen y La Ley** — Ticketmaster muestra **11 de octubre, 21:00**, Bar 122 y organizador Franquicias Peruanas MP SAC, pero omite el año en el contenido visible. Pendiente confirmación del organizador o recinto.
- **Teleticket:** la agenda del 11 de octubre mostró Fiesta Perú, Pinocho, Walls y varias obras familiares, pero no se convirtieron rangos comerciales en funciones ni se incorporaron sin una segunda ficha del organizador o recinto.
- **Feria Internacional del Libro de Chosica:** la municipalidad confirma el rango **9–18 de octubre**, pero no una sesión diaria ni horario individual; no se inventaron funciones para hoy.
- **Joinnus, VAOPE, Fever y Eventbrite público:** `Internal Error` de la herramienta, sin código HTTP expuesto. No se interpreta como 403, 429, caída del sitio ni cancelación.
- **Passline:** la ruta pública redirigió a una página corporativa sin agenda peruana; sigue pendiente la revisión por fichas individuales.
- **Ica/Pisco y Piura:** las consultas oficiales de la ventana inmediata devolvieron publicaciones antiguas, guías o contenido sin ficha individual; no se concluye que no haya eventos.
- **Cusco e Iquitos:** hubo primera pasada dirigida; la cobertura sigue parcial y requiere abrir fichas nuevas del organizador o recinto.
- **Tours y Free Walking Tours Peru:** permanecen como descubrimiento; no se importó una guía ni un rango recurrente como actividad para hoy.
- No se consultó ni extrajo Vamos Eventos.

## Cobertura y catálogo

- Fuentes preservadas en el registro: **263**.
- Contenido realmente leído en esta ronda: **8** rutas; las demás conservan estado y siguiente acción sin presentarse como agenda revisada.
- Cola de salud: **252** rutas; **17** identidades siguen sin URL verificada.
- Las consultas cubrieron las 22 áreas de forma dirigida pero parcial. Siguen especialmente débiles gastronomía/catas, bienestar, mascotas, deporte/running, idiomas/comunidad, tours con operador, municipalidades regionales y redes sociales.
- Para el **11 de octubre** hay **14 fichas únicas preparadas** frente a **10 en main**: Lima 11, Cusco 1, Iquitos 2, Ica 0 y Piura 0. Lo preparado en el PR no debe presentarse como visible en el dominio.

## Validación

- **24 pruebas Node** y **11 pruebas Python** aprobadas.
- `radar-health.json` se regeneró sin errores de validación y con conteos deduplicados.
- El build local no pudo iniciarse porque el entorno no contiene `vite`; se requiere la compilación del CI del último commit.
- Los cambios quedan preparados para el PR editorial existente; no fusionados ni publicados.
