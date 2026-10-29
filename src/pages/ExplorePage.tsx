
import { useProducts } from '../hooks/UseProducts';
import ProductGrid from '../components/products/ProductGrid';

export default function ExplorePage() {
  const { products, loading, error } = useProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Explorar productos
        </h1>

        <p className="mt-2 text-slate-600">
          Descubre nuestra selección de productos.
        </p>
      </div>

      {loading ? (
        <p role="status">Cargando productos...</p>
      ) : error ? (
        <p role="alert" className="text-red-600">
          Error: {error}
        </p>
      ) : products.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <>
          <p className="mb-6 text-sm text-slate-500">
            {products.length} productos encontrados
          </p>

          <ProductGrid products={products} />
        </>
      )}
    </section>
  );
}

