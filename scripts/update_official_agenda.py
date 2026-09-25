"""Refresh dated events from public, individual Gran Teatro Nacional pages.

Only single-date events are published automatically. Ambiguous ranges are reported
for editorial review and never expanded into guessed performances.
"""

import argparse
import concurrent.futures
import datetime as dt
import html
import json
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://granteatronacional.pe"
INDEX = f"{BASE}/eventos"
USER_AGENT = "RelaxPeruAgendaBot/1.0 (+https://www.relaxperu.com/)"
ROOT = Path(__file__).resolve().parents[1]
OUTPUTS = (ROOT / "src/data/auto-activities.json", ROOT / "relaxperu-main/src/data/auto-activities.json")
MONTHS = {"ENE": 1, "FEB": 2, "MAR": 3, "ABR": 4, "MAY": 5, "JUN": 6,
          "JUL": 7, "AGO": 8, "SET": 9, "SEP": 9, "OCT": 10, "NOV": 11, "DIC": 12}


def clean(markup):
    return " ".join(html.unescape(re.sub(r"<[^>]*>", " ", markup)).split())


def fetch(url):
    if not url.startswith(BASE + "/"):
        raise ValueError("Only official GTN pages are allowed")
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(req, timeout=18) as res:
        if urllib.parse.urlparse(res.url).hostname != "granteatronacional.pe":
            raise ValueError("Unexpected redirect")
        if "text/html" not in res.headers.get("Content-Type", ""):
            raise ValueError("Unexpected content type")
        return res.read(1_500_000).decode("utf-8", errors="replace")


def discover(markup):
    paths = dict.fromkeys(re.findall(r'href=["\'](/evento/[a-z0-9-]+)["\']', markup, re.I))
    return [BASE + path for path in paths][:80]


def parse_event(markup, url, today):
    title_match = re.search(r'<h1\b[^>]*class=["\'][^"\']*h1-interna[^"\']*["\'][^>]*>(.*?)</h1>', markup, re.S | re.I)
    date_match = re.search(r'<div\b[^>]*class=["\'][^"\']*\binfechas\b[^"\']*["\'][^>]*>(.*?)</div>', markup, re.S | re.I)
    if not title_match or not date_match:
        return None, "missing title or date"
    raw_date = clean(date_match.group(1)).upper()
    match = re.fullmatch(r"(\d{1,2})\s+([A-Z]{3})\s+(20\d{2})", raw_date)
    if not match or match.group(2) not in MONTHS:
        return None, f"multiple or ambiguous dates: {raw_date}"
    try:
        event_date = dt.date(int(match.group(3)), MONTHS[match.group(2)], int(match.group(1)))
    except ValueError:
        return None, "invalid date"
    if not today <= event_date <= today + dt.timedelta(days=120):
        return None, "outside 120-day window"
    title = clean(title_match.group(1))
    if not 5 <= len(title) <= 130:
        return None, "invalid title"
    if re.search(r"\b(cancelad[oa]|suspendid[oa]|reprogramad[oa])\b", title, re.I):
        return None, "changed or cancelled event"
    if re.search(r"^en proceso de montaje esc[eé]nico", title, re.I):
        return None, "theater operations, not a public event"
    category_match = re.search(r'<div\b[^>]*class=["\'][^"\']*\bcategoria\b[^"\']*["\'][^>]*>(.*?)</div>', markup, re.S | re.I)
    source_category = clean(category_match.group(1)).lower() if category_match else ""
    category = "shows" if source_category in ("música", "danza") else "culture"
    image_match = re.search(r'<meta\b[^>]*property=["\']og:image["\'][^>]*content=["\']([^"\']+)', markup, re.I)
    image = html.unescape(image_match.group(1)) if image_match else ""
    if image and (urllib.parse.urlparse(image).hostname or "").lower() != "granteatronacional.pe":
        image = ""
    entry = {
        "id": "gtn-" + url.rsplit("/", 1)[-1], "kind": "event", "category": category,
        "city": "Lima", "district": "San Borja", "title": title, "titleEn": title,
        "description": "Actividad en el Gran Teatro Nacional. Confirma horario, cupos y condiciones en su agenda oficial.",
        "descriptionEn": "Event at the National Grand Theater. Check time, availability and terms on its official calendar.",
        "venue": "Gran Teatro Nacional", "dates": [event_date.isoformat()],
        "source": "Gran Teatro Nacional", "url": url, "reviewedAt": today.isoformat(),
        "icon": "music" if category == "shows" else "art", "tone": "green",
        "tags": [source_category or "cultura"],
    }
    if image:
        entry["imageUrl"] = image
    return entry, None


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--date", help="Local YYYY-MM-DD in Peru (for reproducible checks)")
    args = parser.parse_args()
    today = dt.date.fromisoformat(args.date) if args.date else dt.datetime.now(dt.timezone(dt.timedelta(hours=-5))).date()
    listing = fetch(INDEX)
    urls = discover(listing)
    if len(urls) < 3:
        raise RuntimeError("Unexpectedly small official index; keeping existing catalog")
    # Curated entries take precedence over generated entries, including recurring performances.
    curated_text = (ROOT / "src/data/activities.js").read_text(encoding="utf-8")
    curated_urls = set(re.findall(r"url: '([^']+)'", curated_text))
    candidates = []
    unresolved = []
    successful = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
        future_urls = {pool.submit(fetch, url): url for url in urls}
        for future in concurrent.futures.as_completed(future_urls):
            url = future_urls[future]
            try:
                body = future.result()
                successful += 1
                event, reason = parse_event(body, url, today)
                if event and url not in curated_urls:
                    candidates.append(event)
                elif reason and reason.startswith("multiple"):
                    unresolved.append({"url": url, "reason": reason})
            except Exception as exc:
                unresolved.append({"url": url, "reason": f"fetch failed: {type(exc).__name__}"})
    if successful < max(3, len(urls) // 2):
        raise RuntimeError("Most event pages failed; keeping existing catalog")
    candidates.sort(key=lambda item: (item["dates"][0], item["id"]))
    # Do not wipe a healthy catalog on temporary source-side changes.
    previous = json.loads(OUTPUTS[0].read_text(encoding="utf-8")) if OUTPUTS[0].exists() else []
    if previous and not candidates:
        raise RuntimeError("No events parsed; keeping existing catalog")
    serialized = json.dumps(candidates, ensure_ascii=False, indent=2) + "\n"
    for path in OUTPUTS:
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(serialized, encoding="utf-8")
    print(f"GTN: {len(urls)} pages, {successful} fetched, {len(candidates)} newly listed, {len(unresolved)} pending")
    for item in unresolved[:12]:
        print(f"Review: {item['url']} — {item['reason']}")


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"Agenda not updated: {error}", file=sys.stderr)
        sys.exit(1)
