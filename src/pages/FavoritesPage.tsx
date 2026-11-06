import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useProducts } from '../hooks/UseProducts';
import ProductGrid from '../components/products/ProductGrid';
import ProductCardSkeleton from '../components/products/ProductcardSkeleton';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { products, loading, error } = useProducts();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
      
      {/* Encabezado */}
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
          Tu lista de deseos
        </span>
        <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          Mis favoritos
        </h1>
        <p className="mt-2 text-base text-slate-600 dark:text-slate-400">
          Aquí tienes reunidos los artículos que has guardado para consultar en cualquier momento.
        </p>
      </div>

      {/* =========================================================================
          CASO 1: NO HAY FAVORITOS GUARDADOS
          ========================================================================= */}
      {favorites.length === 0 ? (
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/40 p-12 text-center max-w-md mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/40 text-rose-500 dark:text-rose-400 mx-auto flex items-center justify-center mb-5">
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
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </div>

          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
            Todavía no tienes favoritos
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
            Explora nuestro catálogo y presiona el corazón en los artículos que más te gusten para guardarlos aquí.
          </p>

          <Link
            to="/explore"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/20 hover:-translate-y-0.5 transition-all"
          >
            Explorar productos
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      ) : loading ? (
        /* =========================================================================
           CASO 2: CARGANDO PRODUCTOS (SKELETONS)
           ========================================================================= */
        <div
          role="status"
          aria-label="Cargando productos favoritos..."
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: favorites.length || 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        /* =========================================================================
           CASO 3: ERROR DE RED
           ========================================================================= */
        <div
          role="alert"
          className="rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/30 p-8 text-center max-w-lg mx-auto"
        >
          <p className="text-sm font-semibold text-rose-600 dark:text-rose-400">
            Error al consultar el catálogo: {error}
          </p>
        </div>
      ) : favoriteProducts.length === 0 ? (
        /* =========================================================================
           CASO 4: FAVORITOS GUARDADOS NO COINCIDEN CON LA API
           ========================================================================= */
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center max-w-lg mx-auto">
          <p className="text-slate-500 dark:text-slate-400">
            No se encontraron los productos guardados en el catálogo actual.
          </p>
        </div>
      ) : (
        /* =========================================================================
           CASO 5: LISTADO DE PRODUCTOS FAVORITOS
           ========================================================================= */
        <>
          <div className="mb-6 flex items-center justify-between">
            <p
              role="status"
              className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400"
            >
              Tienes{' '}
              <span className="font-bold text-slate-900 dark:text-white">
                {favoriteProducts.length}
              </span>{' '}
              {favoriteProducts.length === 1
                ? 'artículo guardado'
                : 'artículos guardados'}
            </p>

            <Link
              to="/explore"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              + Agregar más productos
            </Link>
          </div>

          <ProductGrid products={favoriteProducts} />
        </>
      )}
    </section>
  );
}