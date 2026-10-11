import type { Rsvp } from "./types";

/**
 * Слой хранения RSVP.
 * - Если задан NEXT_PUBLIC_FIREBASE_DB_URL → пишем в Firebase Realtime DB через REST.
 * - Иначе → localStorage (работает без бэкенда, для демо).
 */

const DB_URL = process.env.NEXT_PUBLIC_FIREBASE_DB_URL;
const LS_KEY = (id: string) => `taklif:rsvp:${id}`;

async function firebaseSave(eventId: string, rsvp: Rsvp): Promise<void> {
  await fetch(`${DB_URL}/events/${eventId}/guests.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rsvp),
  });
}

async function firebaseList(eventId: string): Promise<Rsvp[]> {
  const res = await fetch(`${DB_URL}/events/${eventId}/guests.json`, { cache: "no-store" });
  const data = await res.json();
  if (!data) return [];
  return Object.values(data) as Rsvp[];
}

function localSave(eventId: string, rsvp: Rsvp): Promise<void> {
  const all = localList(eventId);
  all.push(rsvp);
  localStorage.setItem(LS_KEY(eventId), JSON.stringify(all));
  return Promise.resolve();
}

function localList(eventId: string): Rsvp[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY(eventId)) ?? "[]");
  } catch {
    return [];
  }
}

export function saveRsvp(eventId: string, rsvp: Rsvp): Promise<void> {
  return DB_URL ? firebaseSave(eventId, rsvp) : localSave(eventId, rsvp);
}

export function listRsvps(eventId: string): Promise<Rsvp[]> {
  return DB_URL ? firebaseList(eventId) : Promise.resolve(localList(eventId));
}
