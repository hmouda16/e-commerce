import type { FiltersInterface, ProductInterface } from "../../interface";

export async function fetchProduct(
  filter: FiltersInterface,
  page: number
): Promise<ProductInterface[] | ProductInterface> {
  const query = new URLSearchParams();

  if (filter.category !== "all") {
    query.append("category", filter.category);
  }

  query.append("limit", "20");
  const priceRangeQuery = `{"$lte":${filter.priceRange[1]},"$gte":${filter.priceRange[0]}}`;
  query.append("price", priceRangeQuery);

  console.log("URL:", `https://restapi.fr/api/vueprojectproducts?${query}`);

  const products = await (
    await fetch(`https://restapi.fr/api/vueprojectproducts?${query}`)
  ).json();

  console.log("API Response:", products);
  return products;
}
