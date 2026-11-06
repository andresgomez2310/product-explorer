import { useMemo, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useProducts } from '../hooks/UseProducts';
import ProductGrid from '../components/products/ProductGrid';
import ProductCardSkeleton from '../components/products/ProductcardSkeleton';
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
    return [...new Set(products.map((product) => product.category))].sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm);

      const matchesCategory =
        category === 'all' || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  const handleResetFilters = () => {
    setSearch('');
    setCategory('all');
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      
      {/* Encabezado de la Página */}
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Catálogo completo
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Explorar productos
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Descubre nuestra selección de artículos. Filtra por categoría o busca en tiempo real lo que necesitas.
        </p>
      </div>

      {/* =======================================================================
          ESTADO 1: CARGANDO (SKELETONS)
          ======================================================================= */}
      {loading ? (
        <div>
          {/* Skeleton de la barra de filtros */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 animate-pulse">
            <div className="h-20 bg-slate-200/70 dark:bg-slate-800/60 rounded-xl" />
            <div className="h-20 bg-slate-200/70 dark:bg-slate-800/60 rounded-xl" />
          </div>

          <div
            role="status"
            aria-label="Cargando productos..."
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : error ? (
        /* =======================================================================
           ESTADO 2: ERROR
           ======================================================================= */
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/30 p-8 text-center max-w-xl mx-auto my-12"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-900/60 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Ocurrió un error al cargar el catálogo
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            {error}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 rounded-xl font-semibold text-sm bg-rose-600 hover:bg-rose-500 text-white shadow-sm transition-all"
          >
            Reintentar recargando la página
          </button>
        </div>
      ) : (
        /* =======================================================================
           ESTADO 3: CONTENIDO CARGADO CON FILTROS Y GRID
           ======================================================================= */
        <>
          {/* Controles de búsqueda y filtros */}
          <div className="mb-8 grid gap-4 md:grid-cols-2 p-5 rounded-2xl bg-white dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 shadow-xs">
            <SearchBar value={search} onChange={setSearch} />
            <CategoryFilter
              categories={categories}
              value={category}
              onChange={setCategory}
            />
          </div>

          {/* Contador accesible de resultados */}
          <div className="mb-6 flex items-center justify-between">
            <p
              role="status"
              aria-live="polite"
              className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400"
            >
              Mostrando{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {filteredProducts.length}
              </span>{' '}
              {filteredProducts.length === 1 ? 'producto' : 'productos'}
              {(search || category !== 'all') && ' para tu búsqueda'}
            </p>

            {(search || category !== 'all') && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Restablecer filtros
              </button>
            )}
          </div>

          {/* ===================================================================
              ESTADO 4: EMPTY STATE (Sin resultados)
              =================================================================== */}
          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-12 text-center max-w-xl mx-auto my-8">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center mb-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                No encontramos productos coincidentes
              </h2>

              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
                No hay artículos que coincidan con los filtros aplicados. Intenta con otros términos o limpia tus filtros.
              </p>

              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 hover:-translate-y-0.5 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.451a.75.75 0 0 0 0-1.5H4.5a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 1.5 0v-2.19l.37.37a7 7 0 0 0 11.942-3.136.75.75 0 0 0-1.25-.85ZM4.688 8.576a5.5 5.5 0 0 1 9.201-2.466l.312.311h-2.451a.75.75 0 0 0 0 1.5H15.5a.75.75 0 0 0 .75-.75V3.375a.75.75 0 0 0-1.5 0v2.19l-.37-.37A7 7 0 0 0 2.438 8.331a.75.75 0 0 0 1.25.85Z"
                    clipRule="evenodd"
                  />
                </svg>
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