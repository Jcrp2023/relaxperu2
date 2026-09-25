"""Import confirmed single-day activities from VAOPE's public homepage and event pages.

The detail page's Event JSON-LD supplies the date and place. A homepage card alone
never establishes an activity's date. Existing data is preserved on source failure.
"""

import argparse
import concurrent.futures
import datetime as dt
import hashlib
import html
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://vaope.com"
ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (ROOT / "src/data/vaope-activities.json", ROOT / "relaxperu-main/src/data/vaope-activities.json")
HEADERS = {"User-Agent": "RelaxPeruAgendaBot/1.0 (+https://www.relaxperu.com/)"}
CATEGORIES = {"futbol": "sports", "deportes": "sports", "conciertos": "shows",
              "folklore": "shows", "cumbia": "shows", "salsa": "shows", "rock": "shows",
              "teatro": "culture", "turismo-y-aventura": "travel", "cursos-y-talleres": "culture",
              "entretenimiento": "shows"}


def fetch(url):
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme != "https" or parsed.hostname not in ("vaope.com", "www.vaope.com"):
        raise ValueError("Not a VAOPE address")
    with urllib.request.urlopen(urllib.request.Request(url, headers=HEADERS), timeout=18) as response:
        if urllib.parse.urlparse(response.url).hostname not in ("vaope.com", "www.vaope.com"):
            raise ValueError("Unexpected redirect")
        if "text/html" not in response.headers.get("Content-Type", ""):
            raise ValueError("Unexpected content type")
        return response.read(2_000_000).decode("utf-8", errors="replace")


def discover(markup):
    urls = dict.fromkeys(html.unescape(url) for url in
                         re.findall(r'href=["\'](https://(?:www\.)?vaope\.com/eventos/[^"\']+)["\']', markup, re.I))
    return [url for url in urls if len(urllib.parse.urlparse(url).path.strip("/").split("/")) == 3
            and urllib.parse.urlparse(url).path.split("/")[2] in CATEGORIES][:70]


def city_from_address(address):
    upper = address.upper()
    if "IQUITOS" in upper:
        return "Iquitos"
    if "PISCO" in upper or re.search(r"\bICA\b", upper):
        return "Ica"
    if "CUSCO" in upper:
        return "Cusco"
    if "PIURA" in upper:
        return "Piura"
    if "CALLAO" in upper or "LA PERLA" in upper:
        return "Lima"
    if "LIMA" in upper or any(d in upper for d in ("MIRAFLORES", "BARRANCO", "SAN BORJA", "SAN MIGUEL", "SURCO", "COMAS", "CHORRILLOS", "LA MOLINA", "LOS OLIVOS")):
        return "Lima"
    return None


def district_from_address(address, city):
    if city != "Lima":
        return city
    known = ("La Perla", "San Borja", "San Miguel", "Los Olivos", "La Molina", "Santa Anita",
             "Chorrillos", "Miraflores", "Barranco", "Comas", "Surco", "Independencia")
    return next((district for district in known if district.upper() in address.upper()), "Lima")


def parse_event(markup, url, today):
    matching = []
    for raw in re.findall(r'<script\b[^>]*type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', markup, re.S | re.I):
        try:
            data = json.loads(raw)
            entries = data if isinstance(data, list) else [data]
            matching.extend(item for item in entries if isinstance(item, dict) and item.get("@type") == "Event")
        except (ValueError, TypeError):
            continue
    if not matching:
        return None, "No event metadata"
    event = matching[0]
    if event.get("eventStatus") != "https://schema.org/EventScheduled":
        return None, "Event is not scheduled"
    start, end = event.get("startDate", ""), event.get("endDate", "")
    if not isinstance(start, str) or not re.fullmatch(r"20\d\d-\d\d-\d\d", start) or start != end:
        return None, "Date is ambiguous or spans multiple days"
    try:
        date = dt.date.fromisoformat(start)
    except ValueError:
        return None, "Invalid date"
    if not today <= date <= today + dt.timedelta(days=120):
        return None, "Outside date window"
    place = event.get("location") or {}
    if not isinstance(place, dict):
        return None, "Missing place"
    addr = place.get("address") or {}
    if not isinstance(addr, dict):
        return None, "Missing address"
    location = str(addr.get("addressLocality") or "")
    city = city_from_address(location)
    if not city:
        return None, "Outside supported cities or missing locality"
    title = html.unescape(str(event.get("name") or "")).strip()
    if not 5 <= len(title) <= 150 or re.search(r"cancelad[oa]|suspendid[oa]|reprogramad[oa]", title, re.I):
        return None, "Invalid or changed event"
    category_slug = urllib.parse.urlparse(url).path.split("/")[2]
    category = CATEGORIES.get(category_slug)
    if not category:
        return None, "Unknown category"
    venue = html.unescape(str(place.get("name") or "")).strip()[:130]
    if not venue:
        return None, "Missing venue"
    image = event.get("image") or ""
    if isinstance(image, list):
        image = image[0] if image else ""
    if not isinstance(image, str) or urllib.parse.urlparse(image).hostname not in ("cdn-r2.vaope.com", "static.vaope.com"):
        image = ""
    entry = {"id": "vaope-" + hashlib.sha1(url.encode()).hexdigest()[:12], "kind": "event",
             "category": category, "city": city, "district": district_from_address(location, city),
             "title": title, "titleEn": title,
             "description": "Actividad publicada por VAOPE. Confirma horario, entradas y condiciones en la ficha original.",
             "descriptionEn": "Activity listed by VAOPE. Confirm time, tickets and terms on the original listing.",
             "venue": venue, "dates": [start], "source": "VAOPE", "url": url,
             "reviewedAt": today.isoformat(), "icon": "music" if category == "shows" else "art",
             "tone": "blue", "tags": [category_slug.replace("-", " ")]}
    if image:
        entry["imageUrl"] = image
    return entry, None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", help="YYYY-MM-DD in Peru")
    args = parser.parse_args()
    today = dt.date.fromisoformat(args.date) if args.date else dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).date()
    urls = discover(fetch(BASE + "/"))
    if len(urls) < 5:
        raise RuntimeError("Unexpectedly small homepage; preserving previous agenda")
    candidates, errors = [], []
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        futures = {pool.submit(fetch, url): url for url in urls}
        for future in concurrent.futures.as_completed(futures):
            url = futures[future]
            try:
                entry, reason = parse_event(future.result(), url, today)
                if entry:
                    candidates.append(entry)
                elif reason and reason not in ("Outside date window", "Outside supported cities or missing locality", "Date is ambiguous or spans multiple days"):
                    errors.append((url, reason))
            except Exception as exc:
                errors.append((url, f"Fetch failed: {type(exc).__name__}"))
    if len(errors) > len(urls) // 2:
        raise RuntimeError("Most detail pages failed; preserving previous agenda")
    previous = json.loads(OUTPUTS[0].read_text(encoding="utf-8")) if OUTPUTS[0].exists() else []
    if previous and not candidates:
        raise RuntimeError("No events parsed; preserving previous agenda")
    candidates.sort(key=lambda item: (item["dates"][0], item["id"]))
    serialized = json.dumps(candidates, ensure_ascii=False, indent=2) + "\n"
    for path in OUTPUTS:
        path.write_text(serialized, encoding="utf-8")
    print(f"VAOPE: {len(urls)} pages checked, {len(candidates)} dated activities in covered cities, {len(errors)} review")
    for url, reason in errors[:8]:
        print(f"Review: {url} — {reason}")


if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        print(f"VAOPE agenda not updated: {exc}", file=sys.stderr)
        sys.exit(1)
