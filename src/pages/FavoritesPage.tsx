
import { Link } from 'react-router';

import { useFavorites } from '../context/FavoritesContext';
import { useProducts } from '../hooks/UseProducts';
import ProductGrid from '../components/products/ProductGrid';

export default function FavoritesPage() {
  const { favorites } = useFavorites();
  const { products, loading, error } = useProducts();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product.id)
  );

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-2 text-3xl font-bold">
        Mis favoritos
      </h1>

      <p className="mb-8 text-slate-600">
        Consulta los productos que has guardado.
      </p>

      {favorites.length === 0 ? (
        <div className="rounded-xl bg-slate-50 p-10 text-center">
          <h2 className="text-xl font-semibold">
            Todavía no tienes favoritos
          </h2>

          <p className="mt-2 text-slate-600">
            Explora el catálogo para guardar productos.
          </p>

          <Link
            to="/explore"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-medium text-white"
          >
            Explorar productos
          </Link>
        </div>
      ) : loading ? (
        <p role="status">Cargando favoritos...</p>
      ) : error ? (
        <p role="alert" className="text-red-600">
          Error: {error}
        </p>
      ) : favoriteProducts.length === 0 ? (
        <p>No se encontraron los productos guardados.</p>
      ) : (
        <>
          <p className="mb-6 text-slate-500">
            {favoriteProducts.length} productos favoritos
          </p>

          <ProductGrid products={favoriteProducts} />
        </>
      )}
    </section>
  );
}
