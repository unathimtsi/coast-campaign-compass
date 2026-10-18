import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, CloudRain, MapPin, Navigation, AlertTriangle } from "lucide-react";
import logo from "@/assets/thirsti-logo.png.asset.json";
import { planForDate, WINDOW_END, WINDOW_START, ZONES } from "@/lib/plan";
import { RouteMap } from "@/components/RouteMap";
import { KIND_LABEL, PRIORITY_LABEL } from "@/components/kinds";
import { ProductCarousel } from "@/components/ProductCarousel";
import { OurStory } from "@/components/OurStory";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cruising The Coastline · Thirsti Activation Planner" },
      { name: "description", content: "Internal daily activation calendar and route map for the Thirsti KZN summer campaign." },
      { property: "og:title", content: "Cruising The Coastline · Thirsti Activation Planner" },
      { property: "og:description", content: "Where the Thirsti team activates each day along the KZN coast, with weather backups." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Index,
});

const MONTHS = [
  { y: 2026, m: 10 },
  { y: 2026, m: 11 },
  { y: 2027, m: 0 },
  { y: 2027, m: 1 },
];
const iso = (y: number, m: number, d: number) =>
  `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
const ZONE_SHORT: Record<string, string> = {
  south: "Toti", central: "Durban", north: "Dbn Nth", umhlanga: "Umhlanga", umdloti: "Umdloti", ballito: "Ballito",
};

function Index() {
  const [selected, setSelected] = useState(WINDOW_START);
  const [monthIdx, setMonthIdx] = useState(0);

  useEffect(() => {
    const t = new Date();
    const today = iso(t.getFullYear(), t.getMonth(), t.getDate());
    if (today >= WINDOW_START && today <= WINDOW_END) {
      setSelected(today);
      setMonthIdx(Math.max(0, MONTHS.findIndex((x) => x.y === t.getFullYear() && x.m === t.getMonth())));
    }
  }, []);

  const plan = useMemo(() => planForDate(selected), [selected]);
  const month = MONTHS[monthIdx];
  if (!plan || !month) return null;
  const { y, m } = month;
  const first = (new Date(y, m, 1).getDay() + 6) % 7;
  const days = new Date(y, m + 1, 0).getDate();
  const label = new Date(y, m, 1).toLocaleDateString("en-ZA", { month: "long", year: "numeric" });
  const selLabel = new Date(selected + "T00:00").toLocaleDateString("en-ZA", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
  const others = plan.events.filter((e) => e.zone !== plan.primary.id);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <a href="#planner" aria-label="THIRSTI activation planner"><img src={logo.url} alt="THIRSTI" className="h-10 w-auto md:h-12" /></a>
          <nav aria-label="Page sections" className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm" className="text-xs font-bold uppercase"><a href="#planner">Planner</a></Button>
            <Button asChild variant="ghost" size="sm" className="text-xs font-bold uppercase"><a href="#product-range">Our range</a></Button>
            <Button asChild variant="ghost" size="sm" className="text-xs font-bold uppercase"><a href="#our-story">Our story</a></Button>
          </nav>
        </div>
      </header>
      <div className="border-b-4 border-primary bg-brand-ink text-brand-ink-foreground">
        <div className="mx-auto max-w-7xl px-4 py-7 md:py-9">
          <p className="mb-2 text-xs font-bold uppercase text-brand-ink-foreground/65">THIRSTI · Summer on the KZN coast</p>
          <h1 className="font-display text-3xl font-extrabold uppercase leading-tight md:text-4xl">Cruising the coastline</h1>
          <p className="mt-3 text-sm text-brand-ink-foreground/80">28 Nov 2026 – 7 Feb 2027 <span className="mx-2">/</span> Internal activation planner</p>
        </div>
      </div>

      <main id="planner" className="mx-auto grid max-w-7xl items-start gap-6 px-4 py-7 lg:grid-cols-[340px_1fr] lg:gap-8">
        {/* Calendar */}
        <section aria-label="Activation calendar" className="border-t-4 border-primary bg-card pt-4">
          <div className="mb-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" title="Previous month" aria-label="Previous month" disabled={monthIdx === 0} onClick={() => setMonthIdx(monthIdx - 1)}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h2 className="font-display text-base font-bold uppercase">{label}</h2>
            <Button variant="ghost" size="icon" title="Next month" aria-label="Next month" disabled={monthIdx === MONTHS.length - 1} onClick={() => setMonthIdx(monthIdx + 1)}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-muted-foreground">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => <div key={d}>{d}</div>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: first }).map((_, i) => <div key={"e" + i} />)}
            {Array.from({ length: days }).map((_, i) => {
              const d = iso(y, m, i + 1);
              const p = planForDate(d);
              const active = d === selected;
              return (
                <Button
                  variant="ghost"
                  key={d}
                  aria-label={`Activate on ${d}`}
                  aria-pressed={active}
                  disabled={!p}
                  onClick={() => setSelected(d)}
                  className={`flex aspect-square h-auto w-full flex-col items-center justify-center gap-0 rounded-sm border p-0 text-sm transition-colors disabled:border-transparent disabled:opacity-25 ${
                    active ? "border-primary bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "border-border hover:border-primary"
                  }`}
                >
                  <span className="font-semibold">{i + 1}</span>
                  {p && <span className={`text-[9px] leading-tight ${active ? "" : "text-ocean"}`}>{ZONE_SHORT[p.primary.id]}</span>}
                </Button>
              );
            })}
          </div>
          <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
            <p className="mb-2 font-semibold text-foreground">Route zones (south → north)</p>
            <ul className="space-y-1">
              {ZONES.map((z) => (
                <li key={z.id}>{z.name} — {z.beach}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* Day detail */}
        <section className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-sm bg-primary p-5 text-primary-foreground">
              <p className="text-sm opacity-90">{selLabel}</p>
              <p className="mt-3 flex items-center gap-2 text-xs font-bold uppercase opacity-90">
                <Navigation className="h-4 w-4" /> Activate today
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold uppercase leading-tight">{plan.primary.name}</h2>
              <p className="font-medium">{plan.primary.beach}</p>
              <p className="mt-2 text-sm opacity-90">
                {plan.primaryEvents.length} listing{plan.primaryEvents.length === 1 ? "" : "s"} in this zone today.
              </p>
            </div>
            <div className="border-t-4 border-ocean bg-muted p-5">
              <p className="flex items-center gap-2 text-xs font-bold uppercase text-ocean">
                <CloudRain className="h-4 w-4" /> Weather Plan B
              </p>
              <h3 className="mb-2 mt-2 font-display text-xl font-bold uppercase leading-tight text-foreground">{plan.backup.name}</h3>
              <p className="text-sm text-foreground">
                If rain or strong wind is forecast for {plan.primary.name} today, activate at{" "}
                <strong>{plan.backup.beach}</strong> instead — about {plan.backupDistanceKm} km {plan.backupDirection} along the coast.
              </p>
              <a
                className="mt-2 inline-block text-sm font-semibold text-ocean underline"
                href={`https://www.google.com/search?q=weather+${encodeURIComponent(plan.primary.beach.split(" /")[0] ?? "")}+KZN`}
                target="_blank"
                rel="noreferrer"
              >
                Check today's forecast →
              </a>
            </div>
          </div>

          <div className="h-[440px] overflow-hidden rounded-sm border border-border">
            <RouteMap plan={plan} />
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
            {(["event", "parkrun", "market", "beach"] as const).map((k) => (
              <span key={k} className="flex items-center gap-1.5"><span className={`legend-dot pin-${k}`} />{KIND_LABEL[k]}</span>
            ))}
          </div>

          <div className="border-t-4 border-brand-ink bg-card">
            <h3 className="border-b border-border py-4 font-display text-base font-bold uppercase">What's happening today</h3>
            <ul className="divide-y divide-border">
              {[...plan.primaryEvents, ...others].map((e, i) => (
                <li key={i} className="flex gap-3 px-4 py-3">
                  <MapPin className={`mt-0.5 h-4 w-4 shrink-0 ${e.zone === plan.primary.id ? "text-primary" : "text-muted-foreground"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-foreground">{e.title}</span>
                      <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] uppercase text-muted-foreground">{KIND_LABEL[e.kind]}</span>
                      {e.priority === "C" && (
                        <span className="flex items-center gap-1 rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive">
                          <AlertTriangle className="h-3 w-3" /> High sponsor risk
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{e.venue} · {e.time}</p>
                    <p className="text-xs text-muted-foreground">{PRIORITY_LABEL[e.priority]} — {e.note}</p>
                  </div>
                </li>
              ))}
              {plan.events.length === 0 && <li className="px-4 py-3 text-sm text-muted-foreground">No listings for this day.</li>}
            </ul>
          </div>
          <p className="text-xs text-muted-foreground">
            Listed ≠ approved. Confirm permission and beverage exclusivity with the organiser, venue or municipality before deploying.
          </p>
        </section>
      </main>
      <ProductCarousel />
      <OurStory />
      <footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5"><img src={logo.url} alt="THIRSTI" className="h-7 w-auto" /><p className="text-xs text-muted-foreground">Cruising the coastline · Internal team use</p></div></footer>
    </div>
  );
}
