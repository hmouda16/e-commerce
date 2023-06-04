import type { FiltersInterface } from "@/interface";

export const DEFAULT_FILTERS: FiltersInterface = {
  search: "",
  priceRange: [0, 10000],
  category: "all",
};
