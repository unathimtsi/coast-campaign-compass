import still from "@/assets/thirsti_still_2026.png.asset.json";
import sparkling from "@/assets/thirsti_sparkling_2026.png.asset.json";
import sport from "@/assets/thirsti_sport_2026.png.asset.json";
import flavours from "@/assets/thirsti_flavours.png.asset.json";
import plus from "@/assets/thirsti_flavours_plus.png.asset.json";
import mixers from "@/assets/thirsti_mixers.png.asset.json";

// Range-level facts from THIRSTI's official product pages, checked 18 October 2026.
// Sizes are not a promise that every flavour is available in every format.
export const PRODUCTS = [
  {
    id: "still", name: "Still", image: still.url,
    type: "Natural spring water",
    flavours: ["Unflavoured"],
    sizes: ["330 ml", "500 ml", "750 ml", "1.5 L", "5 L"],
    purpose: "Everyday hydration with still natural spring water, bottled at source.",
    note: "330 ml options include flip-cap, Barbie and Paw Patrol bottles.",
    source: "https://www.thirsti.co.za/ranges/still",
  },
  {
    id: "sparkling", name: "Sparkling", image: sparkling.url,
    type: "Carbonated spring water",
    flavours: ["Unflavoured"],
    sizes: ["500 ml", "1.5 L"],
    purpose: "A bubbly alternative to still water, with no sugar or added flavours.",
    note: "Natural spring water with carbonation.",
    source: "https://www.thirsti.co.za/ranges/sparkling",
  },
  {
    id: "sport", name: "Sport", image: sport.url,
    type: "Flavoured sports drink",
    flavours: ["Naartjie", "Blueberry", "Lemon Lime", "Mixed Berry"],
    sizes: ["500 ml"],
    purpose: "For active occasions: formulated with electrolytes and carbohydrates to help replenish electrolytes lost through sweat.",
    note: "A sports drink, not plain spring water.",
    source: "https://www.thirsti.co.za/ranges/sport",
  },
  {
    id: "flavours", name: "Flavours", image: flavours.url,
    type: "Sparkling flavoured spring water",
    flavours: ["Naartjie", "Pineapple", "Lemon", "Berry", "Granadilla", "Litchi"],
    sizes: ["500 ml", "1.5 L"],
    purpose: "A fruit-flavoured, sparkling refreshment for people who prefer a flavoured drink.",
    note: "Six fruit flavours in the range.",
    source: "https://www.thirsti.co.za/ranges/flavours",
  },
  {
    id: "flavours-plus", name: "Flavours Plus", image: plus.url,
    type: "Sugar-free sparkling flavoured spring water",
    flavours: ["Watermelon & Strawberry", "Grapefruit & Guava", "Berry & Pomegranate", "Peach & Ginger"],
    sizes: ["500 ml"],
    purpose: "Sugar-free flavoured refreshment with added vitamins and minerals.",
    note: "Watermelon & Strawberry and Grapefruit & Guava: vitamin C + zinc. Berry & Pomegranate: B6 + B12. Peach & Ginger: B3 + B5 + B6.",
    source: "https://www.thirsti.co.za/ranges/flavours-plus",
  },
  {
    id: "mixers", name: "Mixers", image: mixers.url,
    type: "Carbonated spring-water mixers",
    flavours: ["Spring Soda", "Lemonade", "Tonic Water", "Blood Orange", "Ginger Ale", "Strawberry Lemonade", "Pink Tonic", "Sugar-Free Pink Tonic", "Sugar-Free Tonic Water"],
    sizes: ["250 ml cans", "1 L bottles"],
    purpose: "To complement mixed drinks, or to enjoy on their own as a sparkling refreshment.",
    note: "Sizes are listed for the range; availability varies by flavour. THIRSTI also mentions Dry Lemon, but it is not pictured here or listed among the page’s flavour links.",
    source: "https://www.thirsti.co.za/ranges/mixers",
  },
];