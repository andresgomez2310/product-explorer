
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useProducts } from '../hooks/UseProducts';
import ProductGrid from '../components/products/ProductGrid';
import SearchBar from '../components/products/SearchBar';
import CategoryFilter from '../components/products/CategoryFilter';

export default function ExplorePage() {
  const { products, loading, error } = useProducts();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  
  useEffect(() => {
    if (error) {
      toast.error('No se pudieron cargar los productos.');
    }
  }, [error]);

  const categories = useMemo(() => {
    return [...new Set(
      products.map((product) => product.category)
    )].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm);

      const matchesCategory =
        category === 'all' ||
        product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Explorar productos
        </h1>

        <p className="mt-2 text-slate-600">
          Encuentra productos según tus preferencias.
        </p>
      </div>

      {loading ? (
        <p role="status">Cargando productos...</p>
      ) : error ? (
        <p role="alert" className="text-red-600">
          Error: {error}
        </p>
      ) : (
        <>
          <div className="mb-8 grid gap-4 md:grid-cols-2">
            <SearchBar
              value={search}
              onChange={setSearch}
            />

            <CategoryFilter
              categories={categories}
              value={category}
              onChange={setCategory}
            />
          </div>

          <p
            role="status"
            aria-live="polite"
            className="mb-6 text-sm text-slate-500"
          >
            {filteredProducts.length} productos encontrados
          </p>

          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-10 text-center">
              <h2 className="text-xl font-semibold">
                No se encontraron productos
              </h2>

              <p className="mt-2 text-slate-600">
                Intenta otra búsqueda o categoría.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch('');
                  setCategory('all');
                }}
                className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <ProductGrid products={filteredProducts} />
          )}
        </>
      )}
    </section>
  );
}
