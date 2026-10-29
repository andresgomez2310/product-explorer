
import { Link } from 'react-router';
import type { Product } from '../../types/Product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.id}`}
        className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        aria-label={`Ver detalles de ${product.title}`}
      >
        <div className="aspect-square bg-slate-100">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain p-4"
          />
        </div>

        <div className="space-y-3 p-4">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {product.category}
          </span>

          <h2 className="line-clamp-2 min-h-12 text-lg font-semibold text-slate-900">
            {product.title}
          </h2>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>

            <span
              className="text-sm text-amber-700"
              aria-label={`Valoración: ${product.rating} de 5`}
            >
              ★ {product.rating.toFixed(1)}
            </span>
          </div>

          <span className="block rounded-lg bg-blue-600 px-4 py-2 text-center font-medium text-white">
            Ver detalles
          </span>
        </div>
      </Link>
    </article>
  );
}
