# RelaxPerú

Catálogo editorial de actividades en Perú. La primera versión permite buscar y filtrar por ciudad, interés y fecha, consultar fichas con su fuente, compartir un enlace y guardar favoritos en el navegador sin cuenta.

## Iniciar

Requiere Node.js 20 o posterior. Desde la **raíz** del repositorio:

```bash
npm install
npm run dev
```

Para verificar: `npm test` y `npm run build`.

## Publicación y contenido

La aplicación principal está en `src/`. También se replica la interfaz en `relaxperu-main/` porque Vercel puede estar compilando esa carpeta o la raíz; aún no se ha confirmado su **Root Directory**. Ambos caminos compilan. Cuando se confirme la configuración, conviene consolidar en una sola carpeta. Para un despliegue nuevo, usar `Build Command` como `npm run build` y `Output Directory` como `dist`. El dominio de producción tiene un rollback activo: comprobar manualmente la asignación de dominio en Vercel antes de cambiarla.

Las fichas se mantienen en `src/data/activities.js`. Un editor revisa las fuentes y cambia el archivo en GitHub; el despliegue genera la web actualizada. No hay publicación automática ni cobros dentro de RelaxPerú. Evitar copiar nombres y horarios desde redes o completar datos por suposición.

- `kind: 'event'`: usar `sessions` con fecha/hora `-05:00` si la fuente ofrece horas exactas; usar `dates` para días confirmados cuando no publica hora. Nunca convertir un intervalo de festival en sesiones diarias si la programación no lo confirma.
- `kind: 'experience'` o `kind: 'guide'`: sin fecha. Son sugerencias para explorar; la web no afirma disponibilidad hoy.
- `url`: enlace HTTPS al sitio del organizador o a un portal turístico oficial; añadir un dominio nuevo a `safeSourceUrl` solo tras comprobarlo. Una fuente identificada **no** equivale a la verificación de identidad de un operador turístico.
- `reviewedAt`: fecha real de comprobación de la información. Antes de lanzar, revalidar cada enlace y las fichas vigentes; retirar las desactualizadas.
- Las fichas no deben llevar promociones pagadas sin una etiqueta visible y una política editorial definida.

Las fichas iniciales usan páginas del MALI, Gran Teatro Nacional, Perú Travel y SERPAR consultadas el 25/09/2026. Los eventos fechados desaparecerán del catálogo automáticamente al concluir sus fechas. Los favoritos se guardan en `localStorage` del dispositivo y no se sincronizan entre equipos. La versión actual no ofrece reservas internas, alertas, un panel de organizadores ni cobertura exhaustiva; estas funciones requieren operaciones, soporte y controles adicionales.
