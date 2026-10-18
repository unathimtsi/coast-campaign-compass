import rawEvents from "@/data/events.json";
import { rotationForDate } from "@/data/campaign";

export type Kind = "event" | "parkrun" | "market" | "beach";
export type CampaignEvent = {
  date: string;
  title: string;
  venue: string;
  zone: string;
  lat: number;
  lng: number;
  kind: Kind;
  priority: string;
  time: string;
  note: string;
  status?: "prospect";
};

export const events = rawEvents as CampaignEvent[];

export type Zone = { id: string; name: string; beach: string; km: number; lat: number; lng: number };

// Coastal activation zones, south to north. km = rough coastal distance north of Durban CBD.
export const ZONES: Zone[] = [
  { id: "south", name: "Amanzimtoti & South", beach: "Amanzimtoti Main Beach", km: -27, lat: -30.052, lng: 30.893 },
  { id: "central", name: "Durban Beachfront", beach: "Golden Mile / uShaka", km: 0, lat: -29.855, lng: 31.041 },
  { id: "north", name: "Durban North & La Lucia", beach: "Blue Lagoon / La Lucia", km: 9, lat: -29.78, lng: 31.05 },
  { id: "umhlanga", name: "Umhlanga", beach: "Umhlanga Main Beach & Promenade", km: 17, lat: -29.726, lng: 31.088 },
  { id: "umdloti", name: "Umdloti & Westbrook", beach: "Umdloti Main Beach", km: 25, lat: -29.672, lng: 31.118 },
  { id: "ballito", name: "Ballito & Salt Rock", beach: "Ballito Main Beach / Salt Rock", km: 45, lat: -29.54, lng: 31.22 },
];

export const zoneById = (id: string) => ZONES.find((z) => z.id === id);

export const WINDOW_START = "2026-11-28";
export const WINDOW_END = "2027-02-07";

// How strongly each listing pulls the team to its zone.
export function score(e: CampaignEvent): number {
  if (e.kind === "parkrun") return 5;
  if (e.kind === "beach") return 4;
  if (e.kind === "market") return 2;
  return 0; // Controlled events are permission-led exceptions, never core leads.
}

export type DayPlan = {
  date: string;
  primary: Zone;
  backup: Zone;
  backupDistanceKm: number;
  backupDirection: "north" | "south";
  events: CampaignEvent[];
  primaryEvents: CampaignEvent[];
};

const MIN_BACKUP_KM = 20;

export function planForDate(date: string, all: CampaignEvent[] = events): DayPlan | null {
  if (date < WINDOW_START || date > WINDOW_END) return null;
  const day = all.filter((e) => e.date === date);
  const totals = new Map<string, number>(ZONES.map((z) => [z.id, 0]));
  for (const e of day) if (totals.has(e.zone)) totals.set(e.zone, (totals.get(e.zone) ?? 0) + score(e));

  const ranked = [...ZONES].sort((a, b) => (totals.get(b.id) ?? 0) - (totals.get(a.id) ?? 0) || a.km - b.km);
  const rotation = rotationForDate(date);
  const primary = all === events ? zoneById(rotation?.zone ?? "south") : ranked[0];
  if (!primary) return null;
  const backup =
    ranked.find((z) => Math.abs(z.km - primary.km) >= MIN_BACKUP_KM) ?? ranked[1];
  if (!backup) return null;
  return {
    date,
    primary,
    backup,
    backupDistanceKm: Math.abs(backup.km - primary.km),
    backupDirection: backup.km > primary.km ? "north" : "south",
    events: day,
    primaryEvents: day.filter((e) => e.zone === primary.id),
  };
}
