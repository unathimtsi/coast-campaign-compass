<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Campaign listings live in src/data/events.json (generated from the prospectus PDF); daily main/backup spots are computed in src/lib/plan.ts so the calendar and map stay in sync.
- Leaflet loads CARTO PNGs through the same-origin map-tiles server route, which validates coordinates and reads the CARTO credential only inside its handler to keep it out of browser requests.
