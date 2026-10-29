
import { useEffect, useState } from 'react';

import { getProductById } from '../services/ProductsApi';
import type { Product } from '../types/Product';

interface ProductState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

export function useProduct(id: number): ProductState {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProduct() {
      setProduct(null);
      setLoading(true);
      setError(null);

      try {
        const data = await getProductById(
          id,
          controller.signal
        );

        if (!controller.signal.aborted) {
          setProduct(data);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error
              ? err.message
              : 'No se pudo cargar el producto'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void loadProduct();

    return () => controller.abort();
  }, [id]);

  return { product, loading, error };
}
