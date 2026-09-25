export const categories = ['all', 'shows', 'travel', 'food', 'culture', 'family', 'wellness'];
export const cities = ['all', 'Lima', 'Cusco', 'Ica', 'Piura', 'Iquitos'];

export function limaDate(date = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

export function dateOfSession(session) { return session.slice(0, 10); }

export function datesFor(item) {
  if (item.sessions) return item.sessions.map(dateOfSession);
  if (item.dates) return item.dates;
  if (!item.startDate) return [];
  const days = [];
  const cursor = new Date(`${item.startDate}T12:00:00Z`);
  const end = new Date(`${item.endDate || item.startDate}T12:00:00Z`);
  while (cursor <= end && days.length < 32) {
    days.push(cursor.toISOString().slice(0, 10));
    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }
  return days;
}

export function upcomingDate(item, today) {
  return datesFor(item).find(date => date >= today) || '';
}

export function filterActivities(items, { search = '', city = 'all', category = 'all', when = 'all', favoritesOnly = false, favorites = [] }, today) {
  const needle = search.trim().toLocaleLowerCase();
  const start = new Date(`${today}T12:00:00Z`);
  const weekEnd = new Date(start);
  weekEnd.setUTCDate(weekEnd.getUTCDate() + 6);
  const endOfWeek = weekEnd.toISOString().slice(0, 10);
  return items.filter(item => {
    if (city !== 'all' && item.city !== city) return false;
    if (category !== 'all' && item.category !== category) return false;
    if (favoritesOnly && !favorites.includes(item.id)) return false;
    const dates = datesFor(item);
    if (dates.length && !dates.some(date => date >= today)) return false;
    if (when === 'today' && !dates.includes(today)) return false;
    if (when === 'week' && !dates.some(date => date >= today && date <= endOfWeek)) return false;
    if (when === 'explore' && item.kind === 'event') return false;
    if (needle && ![item.title, item.titleEn, item.description, item.descriptionEn, item.city, item.district, item.venue, ...item.tags].join(' ').toLocaleLowerCase().includes(needle)) return false;
    return true;
  }).sort((a, b) => {
    const ad = upcomingDate(a, today) || '9999';
    const bd = upcomingDate(b, today) || '9999';
    return ad.localeCompare(bd) || a.title.localeCompare(b.title, 'es');
  });
}

export function safeSourceUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && ['mali.pe', 'granteatronacional.pe', 'peru.travel', 'serpar.gob.pe'].some(domain => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`));
  } catch { return false; }
}
