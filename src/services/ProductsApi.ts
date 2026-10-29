
import type {
  Product,
  ProductsResponse,
} from '../types/Product';

const API_URL = 'https://dummyjson.com/products';

async function fetchJson<T>(
  url: string,
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(
      `Error al consultar la API: ${response.status}`
    );
  }

  return (await response.json()) as T;
}

export function getProducts(
  signal?: AbortSignal
): Promise<ProductsResponse> {
  return fetchJson<ProductsResponse>(
    `${API_URL}?limit=0`,
    signal
  );
}

export function getProductById(
  id: number,
  signal?: AbortSignal
): Promise<Product> {
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new Error('El ID del producto no es válido');
  }

  return fetchJson<Product>(
    `${API_URL}/${id}`,
    signal
  );
}
