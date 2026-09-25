import datetime as dt
import json
import unittest

from update_vaope_agenda import city_from_address, discover, parse_event


class VaopeAgendaTests(unittest.TestCase):
    url = "https://vaope.com/eventos/conciertos/concierto-en-iquitos"
    today = dt.date(2026, 9, 25)

    def markup(self, start="2026-09-26", end="2026-09-26", status="https://schema.org/EventScheduled"):
        data = {"@type": "Event", "eventStatus": status, "name": "Concierto en Iquitos",
                "startDate": start, "endDate": end,
                "location": {"name": "Mr Pardo", "address": {"addressLocality": "IQUITOS - LORETO"}},
                "image": "https://cdn-r2.vaope.com/test.jpg"}
        return '<script type="application/ld+json">' + json.dumps(data) + "</script>"

    def test_exact_date_and_regional_city(self):
        event, reason = parse_event(self.markup(), self.url, self.today)
        self.assertIsNone(reason)
        self.assertEqual(event["city"], "Iquitos")
        self.assertEqual(event["dates"], ["2026-09-26"])
        self.assertEqual(event["url"], self.url)

    def test_cancellation_and_ambiguous_range_are_excluded(self):
        self.assertIsNone(parse_event(self.markup(status="https://schema.org/EventCancelled"), self.url, self.today)[0])
        self.assertIsNone(parse_event(self.markup(end="2026-09-27"), self.url, self.today)[0])

    def test_unknown_city_and_category_are_excluded(self):
        self.assertIsNone(city_from_address("AREQUIPA"))
        self.assertIsNone(parse_event(self.markup(), "https://vaope.com/eventos/unknown/test", self.today)[0])

    def test_only_event_details_are_discovered(self):
        markup = '<a href="https://vaope.com/eventos/conciertos">A</a>'
        markup += f'<a href="{self.url}">B</a>' * 2
        self.assertEqual(discover(markup), [self.url])


if __name__ == "__main__":
    unittest.main()
