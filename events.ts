import type { EventData } from "./types";

/**
 * Демо-события. В проде заменяется на Firestore/Realtime DB.
 * Добавить новое событие = добавить объект в этот массив.
 */
export const events: EventData[] = [
  {
    id: "arman-aruzhan",
    kind: "toy",
    title: "Той",
    names: ["Арман", "Аружан"],
    dateISO: "2026-10-25T18:00:00+05:00",
    venueName: 'Ресторан «Firdavs»',
    venueAddress: "г. Шымкент, ул. Байдибек би, 15",
    maps: {
      twoGis: "https://2gis.kz/shymkent/search/Firdavs",
      yandex: "https://yandex.ru/maps/?text=Шымкент ул. Байдибек би 15",
      google: "https://maps.google.com/?q=Шымкент+ул.+Байдибек+би+15",
    },
    greeting: {
      kk: "Құрметті қонақтар! Бақытты сәтімізбен бөлісуге шақырамыз.",
      ru: "Дорогие гости! Приглашаем вас разделить с нами радость этого дня.",
    },
  },
  {
    id: "sundet-demo",
    kind: "sundet-toy",
    title: "Сундет-той",
    names: ["Ерали"],
    dateISO: "2026-11-08T12:00:00+05:00",
    venueName: 'Ресторан «Сарай»',
    venueAddress: "г. Шымкент, пр. Республики, 4",
    maps: {
      twoGis: "https://2gis.kz/shymkent/search/Сарай",
      yandex: "https://yandex.ru/maps/?text=Шымкент проспект Республики 4",
    },
    greeting: {
      kk: "Сыңыры мықты, дені сау ұлды болсың!",
      ru: "Приглашаем вас на сундет-той нашего сынка!",
    },
  },
];

export function getEvent(id: string): EventData | undefined {
  return events.find((e) => e.id === id);
}
