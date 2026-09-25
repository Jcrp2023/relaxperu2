// Reviewed editorial entries. A source page is not proof of availability or organizer identity.
// Add only dates confirmed on the linked page; recheck before changing reviewedAt.
export const activities = [
  {
    id: 'jueves-patitas-anillos', kind: 'experience', category: 'family', city: 'Lima', district: 'Ate',
    title: 'Jueves de Patitas · Parque Los Anillos', titleEn: 'Pet Thursdays · Los Anillos Park',
    description: 'Un paseo con tu perro los jueves. Revisa las normas de correa, limpieza y bozal antes de ir.',
    descriptionEn: 'A Thursday walk with your dog. Check leash, cleanup and muzzle rules before visiting.',
    venue: 'Parque de Los Anillos', source: 'SERPAR', url: 'https://www.serpar.gob.pe/parques-metropolitanos/parque-de-los-anillos/',
    reviewedAt: '2026-09-25', icon: 'leaf', tone: 'green', tags: ['mascotas', 'perros', 'parques']
  },
  {
    id: 'mali-familia-septiembre-2026', kind: 'event', category: 'family', city: 'Lima', district: 'Cercado de Lima',
    title: 'Taller Arte que transforma · MALI en Familia', titleEn: 'Art that transforms · MALI for families',
    description: 'Talleres del fin de semana para crear con materiales cotidianos. Consulta el programa de cada fecha.',
    descriptionEn: 'Weekend workshops to make art from everyday materials. Check the program for each date.',
    venue: 'Museo de Arte de Lima', sessions: ['2026-09-26T11:00:00-05:00', '2026-09-27T15:00:00-05:00'],
    source: 'MALI', url: 'https://mali.pe/es/activity/mali-en-familia-edicion-septiembre/',
    reviewedAt: '2026-09-25', icon: 'art', tone: 'peach', tags: ['familia', 'talleres']
  },
  {
    id: 'ballet-vivaldi-gtn-2026', kind: 'event', category: 'shows', city: 'Lima', district: 'San Borja',
    title: 'Ballet Nacional: Las cuatro estaciones', titleEn: 'National Ballet: The Four Seasons',
    description: 'Danza neoclásica inspirada en la música de Vivaldi. Consulta la función y la disponibilidad antes de comprar.',
    descriptionEn: 'Neoclassical dance inspired by Vivaldi. Check the performance and availability before buying.',
    venue: 'Gran Teatro Nacional',
    sessions: ['2026-09-25T20:00:00-05:00', '2026-09-26T20:00:00-05:00', '2026-09-27T17:30:00-05:00', '2026-09-29T20:00:00-05:00'],
    source: 'Gran Teatro Nacional', url: 'https://granteatronacional.pe/evento/ballet-nacional-del-peru-las-cuatro-estaciones-de-antonio-vivaldi',
    reviewedAt: '2026-09-25', icon: 'ballet', tone: 'lilac', tags: ['cultura', 'danza']
  },
  {
    id: 'noche-mali-septiembre-2026', kind: 'event', category: 'culture', city: 'Lima', district: 'Cercado de Lima',
    title: 'Noche MALI · edición septiembre', titleEn: 'MALI Night · September edition',
    description: 'Visitas mediadas, talleres creativos y presentaciones en vivo en el museo.',
    descriptionEn: 'Guided visits, creative workshops and live performances at the museum.',
    venue: 'Museo de Arte de Lima', sessions: ['2026-09-25T18:00:00-05:00'],
    source: 'MALI', url: 'https://mali.pe/es/activity/noche-mali-edicion-septiembre/',
    reviewedAt: '2026-09-25', icon: 'art', tone: 'coral', tags: ['museo', 'talleres']
  },
  {
    id: 'suncine-mali-2026', kind: 'event', category: 'culture', city: 'Lima', district: 'Cercado de Lima',
    title: 'SUNCINE en el MALI', titleEn: 'SUNCINE at MALI',
    description: 'Festival de cine y actividades culturales. Revisa los horarios de cada sesión en la fuente.',
    descriptionEn: 'Film festival and cultural activities. Check individual screening times at the source.',
    venue: 'Museo de Arte de Lima', dates: ['2026-09-26', '2026-09-27'],
    source: 'MALI', url: 'https://mali.pe/es/activity/31-festival-suncine-innovacion-accesibilidad-y-cooperacion-internacional-en-el-mali/', reviewedAt: '2026-09-25', icon: 'film', tone: 'blue', tags: ['cine', 'familia']
  },
  {
    id: 'mali-colecciones', kind: 'experience', category: 'culture', city: 'Lima', district: 'Cercado de Lima',
    title: 'MALI · colecciones y exposiciones', titleEn: 'MALI · collections and exhibitions',
    description: 'Explora el museo y sus exposiciones temporales. Elige fecha y entrada en el sitio del MALI.',
    descriptionEn: 'Explore the museum and temporary exhibitions. Choose a date and ticket on the MALI site.',
    venue: 'Museo de Arte de Lima', source: 'MALI', url: 'https://mali.pe/es/visitas/',
    reviewedAt: '2026-09-25', icon: 'museum', tone: 'peach', tags: ['museo', 'familia']
  },
  {
    id: 'agenda-gran-teatro', kind: 'guide', category: 'shows', city: 'Lima', district: 'San Borja',
    title: 'Agenda del Gran Teatro Nacional', titleEn: 'National Grand Theater calendar',
    description: 'Conciertos, danza y teatro: consulta la programación actual directamente en la agenda del recinto.',
    descriptionEn: 'Concerts, dance and theater: browse the venue’s current official calendar.',
    venue: 'Gran Teatro Nacional', source: 'Gran Teatro Nacional', url: 'https://granteatronacional.pe/calendario',
    reviewedAt: '2026-09-25', icon: 'music', tone: 'gold', tags: ['conciertos', 'teatro']
  },
  {
    id: 'lima-gastronomia', kind: 'guide', category: 'food', city: 'Lima', district: 'Varios distritos',
    title: 'Sabores y rutas de Lima', titleEn: 'Lima food routes',
    description: 'Ideas de recorridos y experiencias gastronómicas desde el portal oficial de turismo.',
    descriptionEn: 'Food routes and experience ideas from Peru’s official tourism portal.',
    venue: 'Lima', source: 'Perú Travel', url: 'https://www.peru.travel/es/destinos/lima',
    reviewedAt: '2026-09-25', icon: 'food', tone: 'peach', tags: ['gastronomía', 'turismo']
  },
  {
    id: 'ica-escapadas', kind: 'guide', category: 'travel', city: 'Ica', district: 'Ica y Pisco',
    title: 'Ica, Pisco y Paracas', titleEn: 'Ica, Pisco and Paracas',
    description: 'Inspírate con rutas por el desierto y el litoral; contrata solo tras comprobar el operador y las condiciones.',
    descriptionEn: 'Explore desert and coastal routes; verify the operator and terms before booking.',
    venue: 'Región Ica', source: 'Perú Travel', url: 'https://www.peru.travel/es/destinos/ica',
    reviewedAt: '2026-09-25', icon: 'sun', tone: 'gold', tags: ['naturaleza', 'pisco']
  },
  {
    id: 'cusco-rutas', kind: 'guide', category: 'travel', city: 'Cusco', district: 'Cusco y alrededores',
    title: 'Cusco para explorar a tu ritmo', titleEn: 'Explore Cusco at your pace',
    description: 'Patrimonio, caminatas y cultura andina desde la guía turística oficial.',
    descriptionEn: 'Heritage, hikes and Andean culture from the official tourism guide.',
    venue: 'Cusco', source: 'Perú Travel', url: 'https://www.peru.travel/es/destinos/cusco',
    reviewedAt: '2026-09-25', icon: 'mountain', tone: 'green', tags: ['naturaleza', 'historia']
  },
  {
    id: 'piura-costa', kind: 'guide', category: 'wellness', city: 'Piura', district: 'Región Piura',
    title: 'Playas y descanso en Piura', titleEn: 'Beaches and rest in Piura',
    description: 'Descubre paisajes costeros y gastronomía regional; consulta clima, acceso y operadores antes de viajar.',
    descriptionEn: 'Discover coastal scenery and local food; check weather, access and operators before traveling.',
    venue: 'Región Piura', source: 'Perú Travel', url: 'https://www.peru.travel/es/destinos/piura',
    reviewedAt: '2026-09-25', icon: 'waves', tone: 'blue', tags: ['mar', 'descanso']
  },
  {
    id: 'iquitos-amazonia', kind: 'guide', category: 'travel', city: 'Iquitos', district: 'Loreto',
    title: 'Iquitos y la Amazonía', titleEn: 'Iquitos and the Amazon',
    description: 'Punto de partida para conocer la región amazónica. Confirma las condiciones de cada tour con su operador.',
    descriptionEn: 'A starting point to explore the Amazon. Confirm tour details with the operator.',
    venue: 'Loreto', source: 'Perú Travel', url: 'https://www.peru.travel/es/destinos/loreto',
    reviewedAt: '2026-09-25', icon: 'leaf', tone: 'green', tags: ['naturaleza', 'selva']
  }
];
