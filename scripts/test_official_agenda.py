import datetime as dt
import unittest

from update_official_agenda import discover, parse_event


class OfficialAgendaTests(unittest.TestCase):
    today = dt.date(2026, 9, 25)
    url = "https://granteatronacional.pe/evento/concierto-ejemplo"

    def markup(self, date="03 OCT 2026", title="Concierto de ejemplo"):
        return (f'<h1 class="h1-interna">{title}</h1>'
                f'<div class="col-lg-4 infechas">{date}</div>'
                '<div class="categoria col-6">Música</div>'
                '<meta property="og:image" content="https://granteatronacional.pe/poster.jpg">')

    def test_exact_single_date(self):
        event, reason = parse_event(self.markup(), self.url, self.today)
        self.assertIsNone(reason)
        self.assertEqual(event["dates"], ["2026-10-03"])
        self.assertEqual(event["category"], "shows")
        self.assertEqual(event["url"], self.url)

    def test_ranges_do_not_invent_performances(self):
        event, reason = parse_event(self.markup("25-27 SET 2026 / 29 SET 2026"), self.url, self.today)
        self.assertIsNone(event)
        self.assertIn("ambiguous", reason)

    def test_cancelled_event_and_expired_event(self):
        self.assertIsNone(parse_event(self.markup(title="Concierto cancelado"), self.url, self.today)[0])
        self.assertIsNone(parse_event(self.markup(date="24 SET 2026"), self.url, self.today)[0])
        self.assertIsNone(parse_event(self.markup(title="En proceso de montaje escénico"), self.url, self.today)[0])

    def test_index_deduplicates(self):
        links = '<a href="/evento/concierto-ejemplo">A</a>' * 2
        self.assertEqual(discover(links), [self.url])


if __name__ == "__main__":
    unittest.main()
