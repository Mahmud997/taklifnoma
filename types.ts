export interface EventMaps {
  twoGis?: string;
  yandex?: string;
  google?: string;
}

export interface EventData {
  id: string;
  /** "toy" | "sundet-toy" | "kudalyk" | "birthday" */
  kind: string;
  title: string;
  names: string[];
  dateISO: string;
  venueName: string;
  venueAddress: string;
  maps: EventMaps;
  musicUrl?: string;
  photoUrl?: string;
  greeting: { kk: string; ru: string };
}

export interface Rsvp {
  name: string;
  guests: number;
  coming: boolean;
  wishes?: string;
  at: number;
}
