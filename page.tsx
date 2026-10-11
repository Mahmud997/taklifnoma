import Link from "next/link";
import { events } from "@/lib/events";

const features = [
  { icon: "✅", title: "RSVP в реальном времени", text: "Гость открывает ссылку и в один тап подтверждает присутствие — вы видите точное число гостей." },
  { icon: "🗺️", title: "Карты в один клик", text: "2GIS, Яндекс и Google Maps — гость не заблудится и не будет спрашивать «где это?»" },
  { icon: "⏳", title: "Обратный отсчёт", text: "Красивый таймер до события создаёт ожидание." },
  { icon: "🎵", title: "Музыка", text: "Любимая песня пары звучит по кнопке на самой пригласительной." },
  { icon: "📱", title: "Идеально на телефоне", text: "99% гостей откроют пригласительную со смартфона — дизайн заточен под это." },
  { icon: "🙅", title: "Никаких кривых картинок", text: "Вместо сжатой картинки из WhatsApp — красивая страница с вашими именами." },
];

const pricing = [
  { name: "Старт", price: "2 000 ₸", items: ["Готовый шаблон", "Карта и таймер", "RSVP гостей"] },
  { name: "Стандарт", price: "5 000 ₸", items: ["Всё из «Старт»", "Фото и музыка", "Персональный текст"], hot: true },
  { name: "Премиум", price: "12 000 ₸", items: ["Всё из «Стандарт»", "Дизайн под заказ", "Срочное изготовление (2 часа)"] },
];

export default function LandingPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-100 to-brand-50 px-4 py-16 text-center">
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-brand-600">Taklif Pro • Шақырунама</p>
        <h1 className="font-serif text-4xl font-bold text-ink md:text-5xl">
          Электронные пригласительные<br className="hidden md:block" /> для тоев
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-gray-600">
          Гость открывает ссылку — видит красивую страницу, карту, музыку и кнопку
          «Я приду». Вы видите, сколько человек реально приедет.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href={`/invite/${events[0].id}`}
            className="rounded-full bg-brand-500 px-8 py-3 font-medium text-white transition hover:bg-brand-600">
            Смотреть живое демо
          </Link>
          <a href="https://wa.me/77001234567" target="_blank" rel="noreferrer"
            className="rounded-full border-2 border-brand-500 px-8 py-3 font-medium text-brand-600 transition hover:bg-brand-100">
            Заказать пригласительную
          </a>
        </div>
      </section>

      {/* Демо-события */}
      <section className="mx-auto max-w-3xl px-4 py-14">
        <h2 className="mb-6 text-center font-serif text-2xl font-bold">Живые примеры</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {events.map((e) => (
            <Link key={e.id} href={`/invite/${e.id}`}
              className="card-frame p-6 transition hover:shadow-lg">
              <p className="text-xs uppercase tracking-widest text-brand-600">{e.title}</p>
              <p className="mt-1 font-serif text-xl font-bold">{e.names.join(" & ")}</p>
              <p className="mt-1 text-sm text-gray-500">
                {new Date(e.dateISO).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-4 text-center text-sm text-gray-400">
          Демо работает без регистрации: отправьте RSVP и откройте страницу хозяина — данные сохранятся.
        </p>
      </section>

      {/* Возможности */}
      <section className="bg-white px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold">Что умеет пригласительная</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-brand-100 bg-brand-50 p-5">
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-2 font-semibold">{f.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Тарифы */}
      <section className="px-4 py-14">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center font-serif text-2xl font-bold">Сколько стоит</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {pricing.map((p) => (
              <div key={p.name}
                className={`rounded-2xl border-2 p-6 text-center ${p.hot ? "border-brand-500 bg-white shadow-lg" : "border-brand-100 bg-white"}`}>
                {p.hot && <p className="mb-1 text-xs font-bold uppercase tracking-widest text-brand-600">Популярный</p>}
                <h3 className="font-serif text-xl font-bold">{p.name}</h3>
                <p className="mt-2 font-serif text-3xl font-bold text-brand-600">{p.price}</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  {p.items.map((i) => <li key={i}>✓ {i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink px-4 py-8 text-center text-sm text-gray-400">
        <p>Taklif Pro • Шымкент / Сайрам • toy@taklif.kz</p>
        <p className="mt-1">Той • Сундет-той • Құдалық • Туған күн</p>
      </footer>
    </main>
  );
}
