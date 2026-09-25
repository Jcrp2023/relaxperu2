import React, { useEffect, useMemo, useState } from 'react';
import { activities } from './data/activities';
import autoActivities from './data/auto-activities.json';
import vaopeActivities from './data/vaope-activities.json';
import { categories, cities, filterActivities, limaDate, safeSourceUrl, safePosterUrl, upcomingDate } from './catalog';

const catalogActivities = [...activities, ...autoActivities, ...vaopeActivities];

const copy = {
  es: {
    explore: 'Explorar', favorites: 'Guardados', how: 'Cómo funciona', eyebrow: 'TU PRÓXIMO PLAN EMPIEZA AQUÍ', heading: 'Sal de la rutina.', highlight: 'Encuentra tu plan.',
    intro: 'Conciertos, cultura, escapadas y momentos para desconectar. Descubre actividades en el Perú desde un solo lugar.', search: 'Busca un concierto, lugar o experiencia', city: 'Ciudad', date: 'Fecha', exactDate: 'Fecha exacta',
    today: 'Hoy', week: 'Próximos 7 días', anytime: 'Todos los planes', exploreAnytime: 'Para explorar', all: 'Todos', shows: 'Conciertos y espectáculos', travel: 'Turismo y escapadas',
    food: 'Gastronomía', culture: 'Cultura y talleres', family: 'Familia y mascotas', wellness: 'Bienestar y naturaleza', sports: 'Deportes', featured: 'Ideas para salir', results: 'planes encontrados', source: 'Fuente',
    reviewed: 'Enlace revisado', guide: 'Guía de destino', experience: 'Experiencia permanente', event: 'Evento con fecha', view: 'Ver fuente oficial', verify: 'Confirma horarios, cupos y condiciones en la fuente antes de pagar.',
    noResults: 'Aún no hay planes confirmados para esta búsqueda.', noResultsText: 'Prueba otra ciudad, fecha o categoría. No mostramos eventos sin fecha comprobada.', clear: 'Limpiar filtros',
    saved: 'Guardado', save: 'Guardar', remove: 'Quitar de guardados', savedEmpty: 'Todavía no has guardado planes.', savedEmptyText: 'Pulsa el corazón en una ficha para encontrarla después en este navegador.',
    details: 'Ver detalles', close: 'Cerrar', next: 'Próximas funciones', available: 'Consulta disponibilidad', section: 'UN PLAN PARA CADA MOMENTO', trustTitle: 'Descubre con criterio.',
    trustText: 'Cada ficha indica su fuente y cuándo se revisó. Los precios, cupos y condiciones se confirman con el organizador.', trust1: 'Explora sin cuenta', trust2: 'Filtra por ciudad, interés y fecha', trust3: 'Continúa en la fuente original',
    update: 'Catálogo editorial: la información puede cambiar.', legal: 'RelaxPerú ayuda a descubrir planes. La compra o reserva se realiza con el proveedor enlazado; comprueba su identidad, condiciones y medios de pago.', contact: 'Contacto y sugerencias', terms: 'Términos', privacy: 'Privacidad',
    aboutText: 'Los eventos aparecen solo cuando una fuente indica sus fechas. Las guías y experiencias son ideas para explorar y no garantizan atención ni cupos para hoy.',
    language: 'Idioma', share: 'Compartir', copied: 'Enlace copiado', missing: 'Esta ficha ya no está disponible.', back: 'Volver al catálogo', allCities: 'Todas las ciudades', interest: 'Encuentra algo que te guste'
  },
  en: {
    explore: 'Explore', favorites: 'Saved', how: 'How it works', eyebrow: 'YOUR NEXT PLAN STARTS HERE', heading: 'Break the routine.', highlight: 'Find your plan.',
    intro: 'Concerts, culture, short trips and moments to unwind. Discover activities in Peru from one place.', search: 'Search concerts, places or experiences', city: 'City', date: 'Date', exactDate: 'Exact date',
    today: 'Today', week: 'Next 7 days', anytime: 'All plans', exploreAnytime: 'Explore anytime', all: 'All', shows: 'Concerts & shows', travel: 'Trips & getaways',
    food: 'Food & tastings', culture: 'Culture & workshops', family: 'Family & pets', wellness: 'Wellness & nature', sports: 'Sports', featured: 'Ideas to go out', results: 'plans found', source: 'Source',
    reviewed: 'Link reviewed', guide: 'Destination guide', experience: 'Ongoing experience', event: 'Dated event', view: 'Visit official source', verify: 'Confirm times, availability and terms at the source before paying.',
    noResults: 'No confirmed plans match this search yet.', noResultsText: 'Try another city, date or category. We do not display events without confirmed dates.', clear: 'Clear filters',
    saved: 'Saved', save: 'Save', remove: 'Remove saved plan', savedEmpty: 'You have no saved plans yet.', savedEmptyText: 'Tap the heart on a card to find it later in this browser.',
    details: 'View details', close: 'Close', next: 'Upcoming shows', available: 'Check availability', section: 'A PLAN FOR EVERY MOOD', trustTitle: 'Explore with confidence.',
    trustText: 'Each listing names its source and review date. Check prices, availability and terms with the organizer.', trust1: 'Explore without an account', trust2: 'Filter by city, interest and date', trust3: 'Continue at the original source',
    update: 'Editorial catalog: information can change.', legal: 'RelaxPerú helps you discover plans. Purchases and bookings take place with the linked provider; check its identity, terms and payment methods.', contact: 'Contact and suggestions', terms: 'Terms', privacy: 'Privacy',
    aboutText: 'Dated events appear only when a source states their dates. Guides and ongoing experiences are ideas to explore and do not guarantee availability today.',
    language: 'Language', share: 'Share', copied: 'Link copied', missing: 'This listing is no longer available.', back: 'Back to catalog', allCities: 'All cities', interest: 'Find something you like'
  }
};
const glyphs = { shows: '♫', travel: '✳', food: '✦', culture: '◈', family: '♡', wellness: '☼', sports: '⚑', all: '✧' };
function illustration(item) {
  if (item.category === 'family' && item.tags?.includes('mascotas')) return '/illustrations/wellness.webp';
  const category = item.category === 'family' || item.category === 'sports' ? 'culture' : item.category;
  return `/illustrations/${category}.webp`;
}
function EventImage({ item, lang, loading = 'lazy' }) {
  const [failed, setFailed] = useState(false);
  const official = item.imageUrl && safePosterUrl(item.imageUrl) && !failed;
  return <><img src={official ? item.imageUrl : illustration(item)} alt={official ? (lang === 'es' ? `Imagen oficial de ${item.title}` : `Official image for ${item.titleEn}`) : ''} loading={loading} onError={official ? () => setFailed(true) : undefined}/><span className="image-caption">{official ? (lang === 'es' ? `Imagen: ${item.source}` : `Image: ${item.source}`) : (lang === 'es' ? 'Ilustración referencial' : 'Illustrative image')}</span></>;
}
function readSaved() {
  try { const value = JSON.parse(localStorage.getItem('relaxperu:favorites') || '[]'); return Array.isArray(value) ? value.filter(x => typeof x === 'string') : []; }
  catch { return []; }
}
function formatDay(iso, lang) { return new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-US', { timeZone: 'America/Lima', day: 'numeric', month: 'short' }).format(new Date(`${iso}T12:00:00-05:00`)); }
function formatSession(iso, lang) { return new Intl.DateTimeFormat(lang === 'es' ? 'es-PE' : 'en-US', { timeZone: 'America/Lima', weekday: 'long', day: 'numeric', month: 'long', hour: 'numeric', minute: '2-digit' }).format(new Date(iso)); }

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('relaxperu:lang') === 'en' ? 'en' : 'es');
  const [search, setSearch] = useState('');
  const [city, setCity] = useState('all');
  const [category, setCategory] = useState('all');
  const [when, setWhen] = useState('all');
  const [exactDate, setExactDate] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [favorites, setFavorites] = useState(readSaved);
  const [selected, setSelected] = useState(() => new URLSearchParams(location.search).get('plan'));
  const [toast, setToast] = useState('');
  const t = copy[lang]; const today = limaDate();
  const visible = useMemo(() => filterActivities(catalogActivities, { search, city, category, when, exactDate, favoritesOnly, favorites }, today), [search, city, category, when, exactDate, favoritesOnly, favorites, today]);
  const detail = catalogActivities.find(item => item.id === selected);
  useEffect(() => { localStorage.setItem('relaxperu:lang', lang); document.documentElement.lang = lang; }, [lang]);
  useEffect(() => { localStorage.setItem('relaxperu:favorites', JSON.stringify(favorites)); }, [favorites]);
  useEffect(() => { const sync = () => setSelected(new URLSearchParams(location.search).get('plan')); window.addEventListener('popstate', sync); return () => window.removeEventListener('popstate', sync); }, []);
  useEffect(() => {
    if (!selected) return;
    const onEsc = event => { if (event.key === 'Escape') openDetail(null); };
    document.addEventListener('keydown', onEsc); document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onEsc); document.body.style.overflow = ''; };
  }, [selected]);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 2500); return () => clearTimeout(timer); }, [toast]);
  function openDetail(id) { const url = new URL(location.href); if (id) url.searchParams.set('plan', id); else url.searchParams.delete('plan'); history.pushState({}, '', url); setSelected(id); }
  function toggleSaved(id) { setFavorites(previous => previous.includes(id) ? previous.filter(x => x !== id) : [...previous, id]); }
  function reset() { setSearch(''); setCity('all'); setCategory('all'); setWhen('all'); setExactDate(''); setFavoritesOnly(false); }
  async function share(item) {
    const url = new URL(location.href); url.searchParams.set('plan', item.id);
    try { if (navigator.share) await navigator.share({ title: item.title, url: url.href }); else { await navigator.clipboard.writeText(url.href); setToast(t.copied); } }
    catch (error) { if (error.name !== 'AbortError') setToast(lang === 'es' ? 'No se pudo compartir' : 'Could not share'); }
  }
  const kindLabel = item => item.kind === 'event' ? t.event : item.kind === 'guide' ? t.guide : t.experience;
  function Card({ item }) {
    const date = upcomingDate(item, today); const title = lang === 'en' ? item.titleEn : item.title;
    return <article className="plan-card"><div className={`card-art ${item.imageUrl ? 'poster-real' : ''}`}><EventImage item={item} lang={lang}/><span className="kind-pill">{kindLabel(item)}</span><button className={`save-button ${favorites.includes(item.id) ? 'is-saved' : ''}`} onClick={() => toggleSaved(item.id)} aria-label={favorites.includes(item.id) ? t.remove : t.save} title={favorites.includes(item.id) ? t.remove : t.save}>♥</button></div><div className="card-content"><p className="card-kicker">{t[item.category]} <span>·</span> {item.city}</p><h3>{title}</h3><p className="card-description">{lang === 'en' ? item.descriptionEn : item.description}</p><div className="card-meta"><span>⌖ {item.district}</span><span>◷ {date ? formatDay(date, lang) : t.available}</span></div><div className="card-bottom"><span className="source-name">{t.source}: {item.source}</span><button className="card-link" onClick={() => openDetail(item.id)}>{t.details} <span aria-hidden="true">↗</span></button></div></div></article>;
  }
  return <>
    <header className="site-header"><div className="container header-inner"><a className="brand" href="/" onClick={event => { event.preventDefault(); reset(); openDetail(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="RelaxPerú"><span className="brand-mark">✳</span><span>relax<span>perú</span><i>.</i></span></a><nav aria-label="Principal"><a href="#planes" onClick={() => setFavoritesOnly(false)}>{t.explore}</a><a href="#planes" onClick={() => setFavoritesOnly(true)}>{t.favorites}{favorites.length > 0 && <span className="nav-count">{favorites.length}</span>}</a><a className="nav-how" href="#como-funciona">{t.how}</a></nav><button className="lang-button" onClick={() => setLang(lang === 'es' ? 'en' : 'es')} aria-label={t.language}>{lang === 'es' ? 'EN' : 'ES'} ↗</button></div></header>
    <main><section className="hero"><div className="container hero-grid"><div className="hero-copy"><p className="eyebrow"><span className="eyebrow-dot"/>{t.eyebrow}</p><h1>{t.heading}<br/><em>{t.highlight}</em></h1><p className="hero-intro">{t.intro}</p><a className="primary-button" href="#planes">{t.explore} <span aria-hidden="true">→</span></a><div className="hero-proof"><span className="proof-icons">✦ ✳ ✺</span><span>{t.trust1}</span></div></div><div className="hero-visual" aria-hidden="true"><img src="/illustrations/hero.webp" alt="" fetchPriority="high"/><span className="hero-illustration-caption">{lang === 'es' ? 'Ilustración referencial' : 'Illustrative image'}</span></div></div></section>
    <section id="planes" className="catalog container"><div className="catalog-top"><div><p className="eyebrow small">{t.section}</p><h2>{favoritesOnly ? t.favorites : t.featured}<span className="heading-dot">.</span></h2></div><p className="catalog-subtitle">{t.trustText}</p></div><div className="filter-panel"><label className="search-field"><span className="sr-only">{t.search}</span><span aria-hidden="true">⌕</span><input value={search} onChange={event => setSearch(event.target.value)} placeholder={t.search}/>{search && <button onClick={() => setSearch('')} aria-label={t.clear}>×</button>}</label><label className="select-field"><span aria-hidden="true">⌖</span><span className="sr-only">{t.city}</span><select value={city} onChange={event => setCity(event.target.value)}><option value="all">{t.allCities}</option>{cities.slice(1).map(value => <option key={value} value={value}>{value === 'Ica' ? 'Ica / Pisco' : value}</option>)}</select></label><label className="select-field"><span aria-hidden="true">◷</span><span className="sr-only">{t.date}</span><select value={when} onChange={event => { setWhen(event.target.value); setExactDate(''); }}><option value="all">{t.anytime}</option><option value="today">{t.today}</option><option value="week">{t.week}</option><option value="explore">{t.exploreAnytime}</option></select></label><label className="date-field"><span>{t.exactDate}</span><input type="date" min={today} value={exactDate} onChange={event => { setExactDate(event.target.value); if (event.target.value) setWhen('all'); }} aria-label={t.exactDate}/>{exactDate && <button type="button" onClick={() => setExactDate('')} aria-label={t.clear}>×</button>}</label></div><div className="category-list" aria-label={t.interest}>{categories.map(value => <button key={value} className={category === value ? 'category active' : 'category'} onClick={() => setCategory(value)} aria-pressed={category === value}><span aria-hidden="true">{glyphs[value]}</span>{t[value]}</button>)}</div><div className="results-header"><p><strong>{visible.length}</strong> {t.results}</p>{favoritesOnly && <button className="text-button" onClick={() => setFavoritesOnly(false)}>{t.back}</button>}</div>{visible.length ? <div className="cards-grid">{visible.map(item => <Card key={item.id} item={item}/>)}</div> : <div className="empty-state"><span className="empty-icon">{favoritesOnly ? '♡' : '⌕'}</span><h3>{favoritesOnly && favorites.length === 0 ? t.savedEmpty : t.noResults}</h3><p>{favoritesOnly && favorites.length === 0 ? t.savedEmptyText : t.noResultsText}</p><button className="outline-button" onClick={reset}>{t.clear} →</button></div>}</section>
    <section id="como-funciona" className="trust-section"><div className="container trust-grid"><div><p className="eyebrow small">RELAXPERÚ</p><h2>{t.trustTitle}</h2><p>{t.aboutText}</p></div><div className="steps"><div><span>01</span><p>{t.trust1}</p></div><div><span>02</span><p>{t.trust2}</p></div><div><span>03</span><p>{t.trust3}</p></div></div></div></section></main>
    <footer className="site-footer"><div className="container footer-inner"><div><span className="footer-brand">relaxperú<span>.</span></span><p>{t.update}</p><p className="footer-links"><a href="/contacto.html">{t.contact}</a><a href="/terminos.html">{t.terms}</a><a href="/privacidad.html">{t.privacy}</a></p></div><p>{t.legal}</p><span>© {new Date().getFullYear()} RelaxPerú</span></div></footer>
    {selected && <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) openDetail(null); }}><div className="modal" role="dialog" aria-modal="true" aria-label={detail ? (lang === 'en' ? detail.titleEn : detail.title) : t.missing}><button className="modal-close" onClick={() => openDetail(null)} aria-label={t.close}>×</button>{detail ? <><div className={`modal-art ${detail.imageUrl ? 'poster-real' : ''}`}><EventImage key={detail.id} item={detail} lang={lang} loading="eager"/></div><div className="modal-body"><p className="card-kicker">{t[detail.category]} · {detail.city}</p><h2>{lang === 'en' ? detail.titleEn : detail.title}</h2><p className="modal-description">{lang === 'en' ? detail.descriptionEn : detail.description}</p><div className="detail-facts"><div><span>⌖</span><p><strong>{detail.venue}</strong><small>{detail.district}, {detail.city}</small></p></div><div><span>◷</span><p><strong>{detail.sessions ? t.next : kindLabel(detail)}</strong><small>{detail.sessions ? detail.sessions.filter(x => x.slice(0, 10) >= today).map(x => formatSession(x, lang)).join(' · ') : detail.dates ? detail.dates.filter(x => x >= today).map(x => formatDay(x, lang)).join(' · ') : detail.startDate ? `${formatDay(detail.startDate, lang)} – ${formatDay(detail.endDate, lang)}` : t.available}</small></p></div><div><span>↗</span><p><strong>{t.source}: {detail.source}</strong><small>{t.reviewed}: {formatDay(detail.reviewedAt, lang)}</small></p></div></div><p className="detail-notice">{t.verify}</p><div className="modal-actions">{safeSourceUrl(detail.url) && <a href={detail.url} target="_blank" rel="noopener noreferrer" className="primary-button">{t.view} ↗</a>}<button className="outline-button" onClick={() => toggleSaved(detail.id)}>♡ {favorites.includes(detail.id) ? t.saved : t.save}</button><button className="icon-action" onClick={() => share(detail)} aria-label={t.share} title={t.share}>↗</button></div></div></> : <div className="modal-body"><h2>{t.missing}</h2><button className="primary-button" onClick={() => openDetail(null)}>{t.back}</button></div>}</div></div>}
    {toast && <div role="status" className="toast">{toast}</div>}
  </>;
}
