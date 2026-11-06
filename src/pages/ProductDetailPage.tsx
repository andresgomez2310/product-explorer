
import { Link, useParams } from 'react-router';
import { useProduct } from '../hooks/UseProduct';
import FavoriteButton from '../components/products/FavoriteButton';
export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  const productId = Number(id);
  const validId =
    id !== undefined &&
    /^[1-9]\d*$/.test(id) &&
    Number.isSafeInteger(productId);

  const { product, loading, error } = useProduct(
    validId ? productId : 0
  );

  if (!validId) {
    return (
      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-bold">
          Producto no válido
        </h1>
        <p className="mt-3 text-slate-600">
          El identificador del producto no es válido.
        </p>
        <Link to="/explore" className="mt-6 inline-block text-blue-600">
          Volver al catálogo
        </Link>
      </main>
    );
  }

  if (loading) {
    return (
      <div role="status" className="p-12 text-center">
        Cargando producto...
      </div>
    );
  }

  if (error || !product) {
    return (
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-2xl font-bold">
          No se pudo mostrar el producto
        </h1>

        <p role="alert" className="mt-3 text-red-600">
          {error ?? 'Producto no encontrado'}
        </p>

        <Link to="/explore" className="mt-6 inline-block text-blue-600">
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <Link
        to="/explore"
        className="mb-8 inline-block text-blue-600 hover:underline"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex aspect-square items-center justify-center rounded-xl bg-slate-100 p-6">
          <img
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            className="max-h-full w-full object-contain"
          />
        </div>

        <div className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium uppercase text-slate-500">
              {product.category}
            </p>

            <h1 className="text-3xl font-bold text-slate-900">
              {product.title}
            </h1>

            {product.brand && (
              <p className="mt-2 text-slate-500">
                Marca: {product.brand}
              </p>
            )}
          </div>

          <p className="text-3xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-amber-700">
            ★ {product.rating.toFixed(1)} / 5
          </p>

          <div>
            <h2 className="mb-2 text-lg font-semibold">
              Descripción
            </h2>

            <p className="leading-relaxed text-slate-600">
              {product.description}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-lg font-semibold">
              Disponibilidad
            </h2>
            <p
              className={
                product.stock > 0
                  ? 'font-medium text-green-700'
                  : 'font-medium text-red-600'
              }
            >
              {product.stock > 0
                ? `${product.stock} unidades disponibles`
                : 'Agotado'}
            </p>
            <FavoriteButton productId={product.id} />
          </div>
        </div>
      </div>
    </section>
  );
}
