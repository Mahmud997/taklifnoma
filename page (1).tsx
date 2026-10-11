"use client";

import { useEffect, useState } from "react";
import { getEvent } from "@/lib/events";
import { listRsvps } from "@/lib/rsvp";
import type { Rsvp } from "@/lib/types";

export default function HostPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const event = getEvent(id);
  const [list, setList] = useState<Rsvp[] | null>(null);

  const load = () => listRsvps(id).then(setList);
  useEffect(() => { load(); const t = setInterval(load, 5000); return () => clearInterval(t); }, [id]);

  if (!event) return <main className="p-8 text-center">Событие не найдено</main>;

  const confirmed = (list ?? []).filter((r) => r.coming);
  const totalPeople = confirmed.reduce((s, r) => s + r.guests, 0);
  const declined = (list ?? []).filter((r) => !r.coming);

  return (
    <main className="mx-auto max-w-md px-4 py-8">
      <div className="card-frame p-6">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-600">Панель хозяина</p>
        <h1 className="mt-1 font-serif text-2xl font-bold">{event.names.join(" & ")}</h1>
        <p className="text-sm text-gray-500">{event.venueName}</p>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-brand-500 py-4 text-white">
            <div className="font-serif text-3xl font-bold">{list ? totalPeople : "—"}</div>
            <div className="text-[11px] opacity-85">придут, чел.</div>
          </div>
          <div className="rounded-xl bg-ink py-4 text-white">
            <div className="font-serif text-3xl font-bold">{list ? confirmed.length : "—"}</div>
            <div className="text-[11px] opacity-85">ответов «да»</div>
          </div>
          <div className="rounded-xl bg-gray-300 py-4 text-ink">
            <div className="font-serif text-3xl font-bold">{list ? declined.length : "—"}</div>
            <div className="text-[11px] opacity-70">ответов «нет»</div>
          </div>
        </div>

        <p className="mt-3 text-xs text-gray-400">Обновляется автоматически каждые 5 секунд</p>

        <div className="mt-4 text-left">
          {list === null && <p className="text-sm text-gray-400">Загрузка…</p>}
          {list !== null && list.length === 0 && (
            <p className="text-sm text-gray-400">Пока никто не ответил. Отправьте ссылку гостям!</p>
          )}
          <ul className="divide-y divide-gray-100">
            {confirmed.map((r, i) => (
              <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                <span>✅ {r.name}{r.wishes ? <span className="block text-xs text-gray-400">«{r.wishes}»</span> : null}</span>
                <b className="text-brand-600">{r.guests} чел.</b>
              </li>
            ))}
            {declined.map((r, i) => (
              <li key={i} className="py-2.5 text-sm text-gray-400">❌ {r.name} — не придёт</li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
