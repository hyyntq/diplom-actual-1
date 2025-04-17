export async function searchService(query: string) {
  try {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    const data = await res.json();
    return data.products || [];
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}
