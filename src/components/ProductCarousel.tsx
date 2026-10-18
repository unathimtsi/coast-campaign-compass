import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

export function ProductCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const update = () => setCurrent(api.selectedScrollSnap());
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => { api.off("select", update); api.off("reInit", update); };
  }, [api]);

  return (
    <section id="product-range" aria-labelledby="product-range-title" className="border-t border-border bg-secondary">
      <Carousel setApi={setApi} opts={{ loop: true }} aria-label="Thirsti product range" className="mx-auto max-w-7xl px-4 py-9 md:py-12">
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-primary">Meet the range</p>
            <h2 id="product-range-title" className="font-display text-2xl font-extrabold uppercase md:text-3xl">THIRSTI product range</h2>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <span className="mr-1 text-sm tabular-nums text-muted-foreground" aria-live="polite">{current + 1} / {PRODUCTS.length}</span>
            <CarouselPrevious className="static translate-y-0 rounded-md" title="Previous product range" />
            <CarouselNext className="static translate-y-0 rounded-md" title="Next product range" />
          </div>
        </div>
        <CarouselContent>
          {PRODUCTS.map((product, index) => (
            <CarouselItem key={product.id} aria-label={`${product.name}, ${index + 1} of ${PRODUCTS.length}`} aria-hidden={index !== current} inert={index !== current}>
              <div className="grid min-h-[460px] gap-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-10">
                <div className="flex h-[280px] items-center justify-center bg-card p-5 md:h-[460px]">
                  <img src={product.image} alt={`Thirsti ${product.name} product range`} className="h-full w-full object-contain" loading="lazy" draggable={false} />
                </div>
                <div className="min-w-0 py-2 md:py-6">
                  <h3 className="font-display text-3xl font-extrabold uppercase text-foreground md:text-4xl">{product.name}</h3>
                  <p className="mt-1 text-sm font-medium text-ocean">{product.type}</p>
                  <dl className="mt-5 space-y-4">
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Flavours / variants</dt>
                      <dd className="text-sm leading-relaxed">{product.flavours.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Sizes</dt>
                      <dd className="font-bold text-primary">{product.sizes.join(" · ")}</dd>
                    </div>
                    <div>
                      <dt className="mb-1 text-xs font-semibold uppercase text-muted-foreground">Purpose</dt>
                      <dd className="text-sm leading-relaxed">{product.purpose}</dd>
                    </div>
                  </dl>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{product.note}</p>
                  <a href={product.source} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-ocean underline" tabIndex={index === current ? 0 : -1}>Official product details <ExternalLink className="h-3 w-3" /></a>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-5 flex justify-center gap-1">
          {PRODUCTS.map((product, index) => (
            <Button key={product.id} variant="ghost" size="icon" className="h-8 w-8" aria-label={`Show ${product.name}`} aria-pressed={index === current} title={product.name} onClick={() => api?.scrollTo(index)}>
              <span className={`h-2 w-2 rounded-full ${index === current ? "bg-primary" : "bg-muted-foreground/40"}`} />
            </Button>
          ))}
        </div>
      </Carousel>
    </section>
  );
}