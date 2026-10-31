export async function fetchItems() {
  const response = await fetch('https://dummyjson.com/products?limit=12');
  if (!response.ok) throw new Error('Could not load API data');
  const payload = await response.json();
  return payload.products || [];
}
