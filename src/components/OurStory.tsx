import { ArrowUpRight, Mountain, Droplets, MapPin } from "lucide-react";

export function OurStory() {
  return (
    <section id="our-story" aria-labelledby="our-story-title" className="bg-brand-ink text-brand-ink-foreground">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-7 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div>
            <p className="mb-3 text-xs font-bold uppercase text-brand-ink-foreground/70">Our story</p>
            <h2 id="our-story-title" className="font-display text-3xl font-extrabold uppercase leading-tight md:text-4xl">Born of mountains.<br />Bottled at source.</h2>
          </div>
          <div className="max-w-2xl">
            <p className="text-sm leading-7 text-brand-ink-foreground/85">Proudly locally owned and South African, THIRSTI began at a natural spring on Normandien farm in the foothills of KwaZulu-Natal’s Klein Drakensberg. Founder Rob Hoatson built the first bottling plant in 2015. The brand later expanded to Tulbagh in the Western Cape, bringing a second mountain source into its story. Its natural spring water is mineral-rich and bottled at source — a connection to nature that sits at the heart of the brand.</p>
            <a href="https://www.thirsti.co.za/our-story" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 border-b border-brand-ink-foreground/50 pb-1 text-xs font-bold uppercase">THIRSTI’s story <ArrowUpRight className="h-4 w-4" /></a>
          </div>
        </div>
        <div className="mt-9 grid gap-5 border-t border-brand-ink-foreground/20 pt-6 sm:grid-cols-3">
          <div className="flex items-center gap-3"><Mountain className="h-6 w-6 shrink-0 text-primary" /><div><p className="text-sm font-bold">Klein Drakensberg</p><p className="mt-1 text-xs text-brand-ink-foreground/65">Our KwaZulu-Natal roots</p></div></div>
          <div className="flex items-center gap-3"><MapPin className="h-6 w-6 shrink-0 text-primary" /><div><p className="text-sm font-bold">Tulbagh</p><p className="mt-1 text-xs text-brand-ink-foreground/65">Our Western Cape source</p></div></div>
          <div className="flex items-center gap-3"><Droplets className="h-6 w-6 shrink-0 text-primary" /><div><p className="text-sm font-bold">Bottled at source</p><p className="mt-1 text-xs text-brand-ink-foreground/65">Naturally mineral-rich spring water</p></div></div>
        </div>
      </div>
    </section>
  );
}