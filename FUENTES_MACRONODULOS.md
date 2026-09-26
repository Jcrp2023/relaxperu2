# RelaxPerú: macro-nódulos, fuentes candidatas y automatización

Actualizado: 25 de septiembre de 2026. Este documento integra la propuesta técnica adjunta como guía operativa. La lista extensa contiene **candidatos de investigación**, no fuentes ya comprobadas ni autorizaciones para extraer datos automáticamente. La fuente de una ficha publicada debe ser el organizador, recinto, municipalidad o vendedor original; cada actividad requiere fecha y enlace individual verificables.

## 1. Macro-nódulos del catálogo

1. **Música, Conciertos y Salsódromos**
2. **Gastronomía, Huariques, Catas y Viñedos**
3. **Arte, Teatro, Cines y Cultura**
4. **Estilo de Vida, Solteros, K-Pop y Geek**
5. **Mascotas y Pet Friendly**
6. **Deporte, Fitness y Running Clubs**
7. **Turismo Regional, Naturaleza y Agendas Municipales**

El macro-nódulo debe funcionar como agrupación de navegación. Se conservan categorías temáticas y etiquetas más precisas para filtrar en combinación. Durante una migración, el campo actual `category` de las fichas no se reemplaza hasta que la interfaz lea y pruebe el nuevo campo `macroNode`; así no se rompen los filtros actuales.

## 2. Fuentes candidatas aportadas por la propietaria

Las siguientes páginas y cuentas se transcribieron del archivo de propuesta. **No se afirma aquí que todas estén activas, sean oficiales, publiquen eventos fechados o permitan automatización.** Antes de incorporarlas al radar operativo, confirmar titularidad, actividad reciente, URL canónica, fechas individuales y condiciones de uso.

### 1. Música, Conciertos y Salsódromos

- Boleterías y agendas: Joinnus, Teleticket, Ticketmaster Perú, VAOPE, Eventbrite Perú, Passline Perú.
- Orquestas, locales y peñas: Grupo 5, Corazón Serrano, Agua Marina, Hermanos Yaipén, Daniela Darcourt, La Casa de la Salsa, El Palmero de La Victoria, El Timbalero, Banana Bambú, Scencia, Yawar Plaza Mamacona, Sinfonía por el Perú, Brisas del Titicaca, La Candelaria, Peñobar Don Porfirio, El Huaralino y Complejo Santa Rosa.
- Incluir venues solo cuando su cartelera o una ficha del organizador confirme una función concreta. Los perfiles sociales sirven para detectar anuncios; no se importan automáticamente.

### 2. Gastronomía, Huariques, Catas y Viñedos

- Restaurantes y experiencias: Mesa 24/7, OpenTable Lima, Central, Maido, Kjolle, Mérito, Isolina, La Canta Rana, El Bolivariano, El Chinito y Mi Barrunto.
- Ferias y mercados: Filo Fest, Bioferia de Miraflores, MIDAGRI, Ruraq Maki y Timeleft Lima.
- Ica y Chincha: Tacama, Santiago Queirolo, Ocucaje, El Catador, Tres Generaciones, Bodega Lazo y DIRCETUR Ica.
- Un restaurante o viñedo permanente corresponde a una guía; una ficha de evento requiere fecha, actividad y condiciones confirmadas.

### 3. Arte, Teatro, Cines y Cultura

- Cines: Cineplanet, Cinemark, Cinépolis, UVK y Cines Plaza.
- Centros culturales y cine: Centro Cultural PUCP, Cine MALI, Biblioteca Nacional del Perú, Centro Cultural de España, Alianza Francesa, Goethe-Institut, Instituto Italiano de Cultura y Festival de Cine de Lima PUCP.
- Teatros y espectáculos: TuBoleto Cultura, Teatro Municipal de Lima, Teatro Segura, Teatro Pirandello, Los Productores y La Estación de Barranco.
- Una cartelera general no acredita que haya función el día seleccionado; confirmar película, hora o presentación en su ficha.

### 4. Estilo de Vida, Solteros, K-Pop y Geek

- Idiomas y comunidad: Mundo Lingo Lima, Lima Language Exchange / Gringo Tuesdays, Speed Dating Perú y Meetup Lima.
- K-Pop y fandoms: ARMY Perú, BLINK Perú, K-Pop World Festival Perú y Kaiwa Club de la Asociación Peruano Japonesa.
- Aficiones: Federación Peruana de Ajedrez, Liga Distrital de Ajedrez de Lima, La Ludoteca Bar, LudoBar Barranco, Asociación Peruana de Astronomía, SPACE UNI, Comic Con Perú y Yoga en el Parque.
- Verificar que la sesión sea pública y fechada; cuentas de fandom o perfiles sociales no sustituyen una página del organizador.

### 5. Mascotas y Pet Friendly

- Asociaciones y competencias: Kennel Club del Perú, Perú Agility Club, The Cat Fanciers' Club Perú, Asociación Felina del Perú y ANCCPP.
- Parques y agendas: SERPAR, Parque Canino de la Costa Verde y actividades caninas de Miraflores, San Borja, Surco, San Isidro, La Molina y Lince.
- Confirmar por separado la política de mascotas, requisitos de ingreso y fecha de cada actividad.

### 6. Deporte, Fitness y Running Clubs

- Deporte federado: FPF / Liga 1, Federación Peruana de Vóley, IPD y FENTA.
- Carreras y comunidad: Perú Runners, Running 4 Perú, Carreras Perú, Miraflores Running, Lima Running Club, actividades de San Borja y trotes comunitarios de San Miguel y Magdalena.
- Publicar partidos, carreras o sesiones con fecha y lugar; no tratar rutinas permanentes como eventos diarios.

### 7. Turismo Regional, Naturaleza y Agendas Municipales

- Lima Metropolitana: Visita Lima y las municipalidades de Lima, Miraflores, Barranco, San Borja, Surco, San Isidro, La Molina, La Victoria, San Miguel, Jesús María, Lince, Magdalena, Los Olivos, San Juan de Lurigancho, Ate, Comas y Chosica.
- Provincias del departamento de Lima: Cañete, Lunahuaná, Mala, San Antonio, Chilca, Pachacámac, Huaral, Aucallama, Huacho/Huaura, Barranca, Canta, Yauyos, Matucana, San Pedro de Casta/Marcahuasi, Oyón/Churín y Y tú qué planes.
- Huancayo y regiones: Municipalidad de Huancayo, Municipalidad de Jauja, DDC Junín, GORE Junín, DDC de Cusco, La Libertad, Arequipa, Lambayeque, Piura, Puno, Loreto y Áncash; EMUFEC Cusco, Federación Regional de Folklore de Puno y DIRCETUR regionales.
- Diferenciar eventos recreativos de avisos administrativos, convocatorias para proveedores o campañas institucionales. Los viajes y parques permanentes se presentan como guías, no como eventos “hoy”.

Para la matriz de 22 áreas y las fuentes ya localizadas, consultar [FUENTES_EXPANSION.md](FUENTES_EXPANSION.md). El estado allí consignado y las reglas editoriales vigentes prevalecen sobre una candidatura de esta lista.

## 3. Decisión técnica sobre la automatización

El repositorio ya cuenta con `.github/workflows/daily-official-agenda.yml`: extrae datos directamente de las agendas del Gran Teatro Nacional y VAOPE, valida los resultados, ejecuta pruebas y compila antes de publicar cambios en los datos versionados. Esta vía conserva los resultados que consume la web.

La propuesta adjunta no debe desplegarse literalmente por cuatro razones:

1. **El modelo no rastrea páginas por recibir ese prompt.** Structured Outputs define el formato de respuesta; GPT recibe los datos que el programa le envía. La extracción de fuentes debe seguir siendo un paso separado y limitado a páginas originales autorizadas.
2. **El ejemplo no guarda el resultado en el catálogo.** Devolver JSON desde una función no actualiza los archivos que la web sirve. La clasificación tiene que escribirse en los datos versionados o en una base persistente que lea el sitio.
3. **El proyecto es Vite/React, no Next.js.** El ejemplo importa tipos de Next.js, pero el repositorio no tiene Next.js como dependencia. Una función serverless tendría que seguir el runtime real.
4. **Vercel Cron usa UTC y no acepta `timezone` en esa configuración.** Para las 8:00 a. m. de Perú corresponde `0 13 * * *`. Ya hay una tarea diaria con el mismo propósito, por lo que se ajusta ese flujo en vez de crear un segundo cron que duplique extracciones y escrituras.

La opción recomendada es mantener una sola ejecución de GitHub Actions a las 13:00 UTC (8:00 a. m. en Perú), usar reglas deterministas para datos verificables y añadir, como fase posterior, un clasificador GPT-4o mini con Structured Outputs que reciba lotes de 20–30 fichas ya extraídas y validadas. El modelo podrá asignar macro-nódulo, subcategoría y etiquetas sugeridas; no podrá inventar precio, fecha, horario ni fuente. La web debe conservar la ficha original si la API falla. Si se implementa esa fase, `OPENAI_API_KEY` se guardaría como secreto del entorno que ejecute el clasificador (GitHub Actions en esta arquitectura), nunca en el cliente. No se requiere `CRON_SECRET` mientras el cron permanezca dentro de GitHub Actions.

Referencias técnicas: [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) especifica que la zona horaria es UTC; [Vercel Quickstart](https://vercel.com/docs/cron-jobs/quickstart) muestra la configuración del cron en `vercel.json`; [Structured Outputs de OpenAI](https://platform.openai.com/docs/guides/structured-outputs) describe el formato restringido de respuestas, no la búsqueda web automática.

## 4. Orden de incorporación de fuentes

1. Mantener activas únicamente las extracciones que ya pasan pruebas y verifican fichas individuales.
2. Revisar los candidatos por lotes pequeños, empezando por agendas oficiales con fecha y ubicación estructuradas.
3. Registrar URL canónica, titular, acceso permitido, ciudad cubierta, método de consulta y fecha de última comprobación.
4. Automatizar una fuente solo tras verificar técnicamente su comportamiento y condiciones. Para redes sociales, preferir APIs y permisos oficiales; en su ausencia, revisión editorial manual.
5. Deduplicar por título, organizador/recinto y fecha; retirar o marcar rápidamente cambios, cancelaciones y fichas vencidas.
6. Revisar cada lista de candidatos antes de mostrarla como una actividad confirmada.
