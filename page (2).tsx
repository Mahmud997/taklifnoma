"use client";

import { useEffect, useRef, useState } from "react";
import { getEvent } from "@/lib/events";
import { saveRsvp } from "@/lib/rsvp";
import type { Rsvp } from "@/lib/types";

function useCountdown(target: string) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, new Date(target).getTime() - Date.now());
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor(diff / 3600000) % 24,
        m: Math.floor(diff / 60000) % 60,
        s: Math.floor(diff / 1000) % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export default function InvitePage({ params }: { params: { id: string } }) {
  const id = params.id;
  const event = getEvent(id);
  const cd = useCountdown(event?.dateISO ?? new Date().toISOString());

  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [wishes, setWishes] = useState("");
  const [sent, setSent] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  if (!event) {
    return (
      <main className="flex min-h-screen items-center justify-center p-6 text-center">
        <div>
          <p className="font-serif text-2xl font-bold">Пригласительная не найдена</p>
          <a href="/" className="mt-4 inline-block text-brand-600 underline">На главную</a>
        </div>
      </main>
    );
  }

  const toggleMusic = () => {
    if (!event.musicUrl) return;
    if (!audioRef.current) audioRef.current = new Audio(event.musicUrl);
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying(!playing);
  };

  const send = (coming: boolean) => {
    if (!name.trim()) return alert("Напишите, пожалуйста, ваше имя");
    const rsvp: Rsvp = { name: name.trim(), guests: coming ? guests : 0, coming, wishes: wishes.trim() || undefined, at: Date.now() };
    saveRsvp(event.id, rsvp).finally(() => setSent(true));
  };

  const mapBtn = "rounded-full bg-ink px-4 py-2 text-sm text-white transition hover:opacity-85";

  return (
    <main className="mx-auto max-w-md px-4 py-8 pb-24">
      {/* Обложка */}
      <section className="card-frame p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-600">{event.title}</p>
        <div className="my-3 text-brand-400">❈ ❈ ❈</div>
        <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-4 border-brand-500 bg-brand-100 font-serif text-4xl font-bold text-brand-700">
          {event.names.map((n) => n[0]).join("")}
        </div>
        <h1 className="mt-4 font-serif text-3xl font-bold">{event.names.join(" & ")}</h1>
        <p className="mt-1 text-gray-500">
          {new Date(event.dateISO).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}
        </p>
        <p className="mt-4 text-sm italic text-gray-600">{event.greeting.kk}</p>
        <p className="mt-1 text-sm italic text-gray-600">{event.greeting.ru}</p>
        {event.musicUrl && (
          <button onClick={toggleMusic} className="mt-4 rounded-full bg-brand-500 px-6 py-2 text-white">
            {playing ? "🔇 Выключить музыку" : "🎵 Включить музыку"}
          </button>
        )}
      </section>

      {/* Отсчёт */}
      <section className="card-frame mt-5 p-6">
        <p className="text-sm text-gray-500">До торжества осталось</p>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {([["Дней", cd.d], ["Часов", cd.h], ["Минут", cd.m], ["Секунд", cd.s]] as const).map(([label, v]) => (
            <div key={label} className="rounded-xl bg-ink py-3 text-white">
              <div className="font-serif text-2xl font-bold text-brand-300">{String(v).padStart(2, "0")}</div>
              <div className="text-[11px] opacity-70">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Место */}
      <section className="card-frame mt-5 p-6">
        <p className="text-sm text-gray-500">Место проведения</p>
        <p className="mt-1 font-serif text-xl font-bold">{event.venueName}</p>
        <p className="text-sm text-gray-600">{event.venueAddress}</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {event.maps.twoGis && <a className={mapBtn} href={event.maps.twoGis} target="_blank" rel="noreferrer">2GIS</a>}
          {event.maps.yandex && <a className={mapBtn} href={event.maps.yandex} target="_blank" rel="noreferrer">Яндекс</a>}
          {event.maps.google && <a className={mapBtn} href={event.maps.google} target="_blank" rel="noreferrer">Google</a>}
        </div>
      </section>

      {/* RSVP */}
      <section className="card-frame mt-5 p-6">
        {!sent ? (
          <>
            <p className="font-serif text-xl font-bold">Подтвердите присутствие</p>
            <input
              value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Ваше имя и фамилия"
              className="mt-4 w-full rounded-xl border border-gray-200 p-3 text-base focus:border-brand-500 focus:outline-none"
            />
            <select
              value={guests} onChange={(e) => setGuests(Number(e.target.value))}
              className="mt-3 w-full rounded-xl border border-gray-200 p-3 text-base focus:border-brand-500 focus:outline-none"
            >
              <option value={1}>Приду один / одна</option>
              <option value={2}>Приду вдвоём (2 чел.)</option>
              <option value={3}>Приду с семьёй (3 чел.)</option>
              <option value={4}>Приду с семьёй (4 чел.)</option>
              <option value={5}>Приду с семьёй (5 чел.)</option>
            </select>
            <input
              value={wishes} onChange={(e) => setWishes(e.target.value)}
              placeholder="Пожелания (необязательно)"
              className="mt-3 w-full rounded-xl border border-gray-200 p-3 text-base focus:border-brand-500 focus:outline-none"
            />
            <button onClick={() => send(true)} className="mt-4 w-full rounded-xl bg-brand-500 py-3.5 font-medium text-white transition hover:bg-brand-600">
              ✓ Я приду!
            </button>
            <button onClick={() => send(false)} className="mt-2 w-full rounded-xl bg-ink py-3.5 font-medium text-white transition hover:opacity-85">
              К сожалению, не смогу
            </button>
          </>
        ) : (
          <div className="py-4">
            <p className="font-serif text-2xl font-bold text-green-700">Рақмет! Спасибо! 🙏</p>
            <p className="mt-2 text-sm text-gray-500">Ваш ответ сохранён. Ждём вас на празднике!</p>
            <a href={`/host/${event.id}`} className="mt-4 inline-block text-sm text-brand-600 underline">
              Открыть страницу хозяина (демо)
            </a>
          </div>
        )}
      </section>
    </main>
  );
}
