import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { DayPlan } from "@/lib/plan";
import { KIND_LABEL } from "./kinds";

export function RouteMap({ plan }: { plan: DayPlan }) {
  const el = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      if (cancelled || !el.current) return;
      if (!mapRef.current) {
        mapRef.current = L.map(el.current, { scrollWheelZoom: false }).setView([-29.8, 31.05], 9);
        L.tileLayer("https://{s}.basemap.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
          attribution: "&copy; OpenStreetMap &copy; CARTO",
        }).addTo(mapRef.current);
        layerRef.current = L.layerGroup().addTo(mapRef.current);
      }
      const layer = layerRef.current!;
      layer.clearLayers();
      const pin = (cls: string, label: string) =>
        L.divIcon({ className: "", html: `<div class="map-pin ${cls}">${label}</div>`, iconSize: [0, 0] });

      for (const e of plan.events) {
        L.marker([e.lat, e.lng], { icon: pin(`pin-${e.kind}`, "") })
          .bindPopup(`<strong>${e.title}</strong><br/>${KIND_LABEL[e.kind]} · ${e.venue}<br/><em>${e.time}</em>`)
          .addTo(layer);
      }
      L.marker([plan.backup.lat, plan.backup.lng], { icon: pin("pin-zone pin-backup", "Plan B") })
        .bindPopup(`<strong>Weather backup:</strong> ${plan.backup.beach}`)
        .addTo(layer);
      L.marker([plan.primary.lat, plan.primary.lng], { icon: pin("pin-zone pin-primary", "Activate") })
        .bindPopup(`<strong>Main activation:</strong> ${plan.primary.beach}`)
        .addTo(layer);
      L.polyline(
        [
          [plan.primary.lat, plan.primary.lng],
          [plan.backup.lat, plan.backup.lng],
        ],
        { className: "route-line" },
      ).addTo(layer);
    })();
    return () => {
      cancelled = true;
    };
  }, [plan]);

  useEffect(() => () => void mapRef.current?.remove(), []);

  return <div ref={el} className="h-full min-h-[420px] w-full rounded-lg" />;
}
