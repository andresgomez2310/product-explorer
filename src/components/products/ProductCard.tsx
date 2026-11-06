
import { Link } from 'react-router';

import type { Product } from '../../types/Product';
import FavoriteButton from './FavoriteButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <Link
        to={`/products/${product.id}`}
        aria-label={`Ver detalles de ${product.title}`}
        className="block flex-1 focus-visible:outline-2 focus-visible:outline-blue-600"
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
          <p className="text-xs font-medium uppercase text-slate-500">
            {product.category}
          </p>

          <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
            {product.title}
          </h2>

          <div className="flex items-center justify-between gap-2">
            <span className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </span>

            <span className="text-sm text-amber-700">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <FavoriteButton productId={product.id} />
      </div>
    </article>
  );
}
