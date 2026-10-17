# Conciliación semanal — 5 de octubre de 2026

## Resultado

La ronda semanal reutiliza la revisión diaria cerrada minutos antes; no repite consultas ni presenta búsquedas como lecturas nuevas. El catálogo propuesto conserva las 16 fichas GTN actuales de main, 39 de VAOPE y las altas editoriales verificadas. Para el 7 de octubre, main muestra 2 fichas y la propuesta 8; siguen siendo propuestas no visibles en producción.

Se detectó que el PR #14 de macro-nódulos estaba 30 commits detrás de main y en conflicto, mientras el PR #15 estaba 5 commits detrás aunque conservaba el contenido actual de los importadores. Se consolidan en el PR #15: clasificación segura, etiqueta «Por clasificar», filtros solo para fichas clasificadas, cola de cobertura y flujo diario mediante rama de revisión/PR. No se fusiona ni publica.

## Cobertura y decisiones

- Altas confirmadas de la ronda diaria: Lima (5), Cusco (1) e Ica (1). Iquitos queda pendiente por falta de fecha individual; Piura sin nueva ficha confirmada.
- BTS 7, 9 y 10 de octubre continúa propuesto, con hora estimada y venta general agotada; no se duplica.
- Ivy Queen 24 de octubre permanece excluida por cancelación oficial.
- La Bella Durmiente, La Casa de Timoteo, el cineforo CRESPIAL y Festival de la Hispanidad siguen pendientes por discrepancias o datos incompletos.
- 226 rutas inventariadas; 208 continúan en la cola y 17 identidades de Jahel siguen sin verificación completa. Las 22 áreas se conservan; no se acredita cobertura completa.
- Eventbrite Perú devolvió 405, Passline 403; Joinnus mostró error de herramienta en búsqueda y 403 en una ficha. No se interpretan como cancelación ni se eluden.

## Validación

La propuesta sincroniza las dos copias. El CI debe comprobar importadores, catálogo, clasificación, auditoría de cobertura y build en el commit consolidado. El PR #14 solo podrá cerrarse como sustituido cuando el CI del PR #15 apruebe. Sin fusión ni publicación.
