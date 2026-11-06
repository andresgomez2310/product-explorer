import { Link } from 'react-router-dom';
import type { Product } from '../../types/Product';
import FavoriteButton from './FavoriteButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-indigo-300/80 dark:hover:border-indigo-700/80 hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1.5 transition-all duration-300">
      
      {/* Contenedor Superior: Imagen + Badges Flotantes */}
      <div className="relative aspect-square w-full bg-slate-100/70 dark:bg-slate-800/40 p-5 flex items-center justify-center overflow-hidden">
        
        {/* Badge de Rating Flotante (Izquierda) */}
        <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3.5 h-3.5 text-amber-400"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
              clipRule="evenodd"
            />
          </svg>
          <span>{product.rating.toFixed(1)}</span>
        </div>

        {/* Botón de Favorito Flotante (Derecha) */}
        <div className="absolute top-3 right-3 z-10">
          <FavoriteButton productId={product.id} variant="icon" />
        </div>

        {/* Imagen del Producto */}
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain group-hover:scale-108 transition-transform duration-300 ease-out"
        />
      </div>

      {/* Contenedor Inferior: Información y Enlace */}
      <div className="flex flex-col flex-1 p-5">
        
        {/* Categoría */}
        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1.5">
          {product.category.replace('-', ' ')}
        </span>

        {/* Título */}
        <h2 className="line-clamp-1 text-base font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
          {product.title}
        </h2>

        {/* Descripción corta si existe */}
        {product.description && (
          <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 flex-1">
            {product.description}
          </p>
        )}

        {/* Footer: Precio + Botón Ver Detalle */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">
              Precio
            </span>
            <span className="text-lg font-black text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </span>
          </div>

          <Link
            to={`/products/${product.id}`}
            aria-label={`Ver detalles de ${product.title}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 dark:hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Ver detalle
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export { ProductCard };