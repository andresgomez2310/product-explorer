
import { useEffect, useState } from 'react';

import { getProducts } from '../services//ProductsApi';
import type { Product } from '../types/Product';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export function useProducts(): ProductsState {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = await getProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProducts(data.products);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudieron cargar los productos'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProducts();

    return () => controller.abort();
  }, []);

  return { products, loading, error };
}
