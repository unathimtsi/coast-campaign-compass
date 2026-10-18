// Revised prospectus, section 4. Weekly dates are a suggested rotation,
// starting with cluster 1 on campaign launch, not confirmed bookings.
export const ROUTE_ROTATION = [
  { zone: "south", locations: "Amanzimtoti → Warner Beach → Winklespruit" },
  { zone: "central", locations: "Durban Golden Mile → Addington → South Beach" },
  { zone: "north", locations: "North Beach → Blue Lagoon → Durban North" },
  { zone: "umhlanga", locations: "La Lucia → Umhlanga → Umdloti" },
  { zone: "ballito", locations: "Westbrook → Salt Rock → Ballito" },
] as const;

export function rotationForDate(date: string) {
  const elapsed = Date.parse(`${date}T00:00:00Z`) - Date.parse("2026-11-28T00:00:00Z");
  const week = Math.floor(elapsed / (7 * 86400000));
  return ROUTE_ROTATION[((week % ROUTE_ROTATION.length) + ROUTE_ROTATION.length) % ROUTE_ROTATION.length];
}