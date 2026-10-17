import { createFileRoute } from "@tanstack/react-router";

// Raw PNG responses are required by Leaflet; no credentials reach the browser.
export const Route = createFileRoute("/api/map-tiles")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const query = new URL(request.url).searchParams;
        const values = ["z", "x", "y"].map((name) => query.get(name));
        if (values.some((value) => value === null || !/^\d{1,7}$/.test(value))) {
          return new Response("Invalid tile coordinates", { status: 400 });
        }
        const [z, x, y] = values.map(Number);
        if (z === undefined || x === undefined || y === undefined || z > 20 || x >= 2 ** z || y >= 2 ** z) {
          return new Response("Invalid tile coordinates", { status: 400 });
        }
        const key = process.env["CARTO_API_KEY"];
        if (!key) return new Response("Map imagery is not configured", { status: 503 });
        const url = new URL(`https://basemaps.cartocdn.com/rastertiles/voyager/${z}/${x}/${y}.png`);
        url.searchParams.set("key", key);
        try {
          const tile = await fetch(url, { signal: AbortSignal.timeout(15000) });
          if (!tile.ok) {
            // Provider error bodies may echo credentials, so never forward them.
            console.error("CARTO tile request failed", tile.status);
            return new Response("CARTO map imagery unavailable", { status: tile.status });
          }
          if (!tile.headers.get("content-type")?.includes("image/png")) {
            return new Response("CARTO returned invalid imagery", { status: 502 });
          }
          return new Response(tile.body, {
            headers: {
              "Content-Type": "image/png",
              "Cache-Control": "private, max-age=86400",
              "X-Content-Type-Options": "nosniff",
            },
          });
        } catch {
          return new Response("CARTO map imagery unavailable", { status: 502 });
        }
      },
    },
  },
});