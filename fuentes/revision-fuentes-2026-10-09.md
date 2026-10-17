# Revisión de fuentes · 9 de octubre de 2026

## Altas preparadas

- **Expo Maternidad Lima 2026** · Lima, Santiago de Surco · 9, 10 y 11 de octubre, 11:00 · Jockey Plaza, playa norte del estacionamiento. El sitio del organizador muestra la feria de octubre y la ficha individual de Teleticket confirma las tres sesiones, local, condiciones y a Corporación Mujer Perú S.A. como organizadora.
- **El Percusionista Ciego** · Lima, Miraflores · 12 y 13 de octubre, 20:00 · Sala Lumière de la Alianza Francesa. La cartelera individual del recinto confirma fechas, hora y lugar; Joinnus queda como canal de venta con acceso 403 en esta ronda.

Las dos copias editoriales quedan sincronizadas. También se conserva la actualización automática de `main` en las tres copias de `auto-activities.json`.

## Cambios y cancelaciones

- No se encontró una cancelación nueva que afecte las fichas propuestas para hoy o mañana.
- El centro oficial de Teleticket muestra la cancelación de Ivy Queen, pero esa ficha no estaba en el catálogo y no requiere corrección.
- Ticketmaster mantiene BTS WORLD TOUR ‘ARIRANG’ para el 9 y 10 de octubre, 20:00 estimada; continúa propuesto en el PR, no integrado en `main`.

## Pendientes con evidencia parcial

- **This Is Michael** · Lima · 10 de octubre, 21:00 · Explanada del Parque de la Exposición. Ticketmaster identifica a Top Entertainment S.A.C. y mantiene venta disponible; falta abrir una ficha individual del organizador o recinto.
- **David Bisbal · Tour Eternos** · Lima · 9 de octubre, 19:00 según Teleticket · Coliseo Dibós. La venta individual está vigente y enlaza a Evolution Concerts; el sitio del organizador no expuso una ficha legible en esta ronda.
- **APDAYC Fest II** · Lima · 10 de octubre, 18:00 · Parque de la Exposición. La fuente oficial devolvió HTTP 429 y no se reintentó; no se incorpora usando solo el extracto.
- **Amor de Marinera** · Lima · 10 de octubre según la portada del Teatro Peruano Japonés. La ficha individual todavía muestra noviembre de 2025; queda descartada hasta corregir la contradicción.
- **XXXIV Subasta de Arte MALI 2026** · Lima · 10 de octubre. El calendario técnico expone zona horaria de Nueva York; hora local pendiente.

## Cobertura

- Se consultaron 241 rutas deduplicadas y se abrieron las siete capas de boleterías primero. Solo 71 fuentes conservan revisión de contenido vigente; 249 rutas siguen en cola y 17 identidades propuestas por Jahel continúan sin URL verificada.
- Teleticket, Ticketmaster y VAOPE expusieron contenido parcial. Joinnus, Fever, Eventbrite público y Passline devolvieron error de herramienta sin código HTTP; las fichas alternativas se siguieron únicamente en fuentes oficiales.
- Próximos ocho días en el catálogo propuesto: Lima cubre espectáculos, cultura, familia y deporte; Cusco, Piura e Iquitos tienen fichas puntuales; Ica continúa sin fichas confirmadas. Turismo, gastronomía, bienestar y varias áreas comunitarias siguen sin cobertura demostrada.
- Las 22 áreas recibieron comprobación dirigida, pero ninguna se marca como agenda completa: una búsqueda por dominio no cuenta como revisión de contenido.

## Catálogo y validación

- 9 de octubre: **16** fichas propuestas frente a **9** en `main`; por ciudad: Lima 13, Cusco 1, Piura 1, Iquitos 1, Ica 0.
- Pruebas locales: 23 Node y 11 Python aprobadas.
- Build local pendiente porque `vite` no está instalado; debe validarse en CI del último commit.
- Estado editorial: cambios preparados para el PR compatible; no integrados en `main` y no comprobados en el dominio.

