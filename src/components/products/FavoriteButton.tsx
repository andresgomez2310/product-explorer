import React from 'react';
import { useFavorites } from '../../context/FavoritesContext';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  productId: number;
  /** 'icon' para tarjetas flotantes, 'button' para barra de detalle con texto */
  variant?: 'icon' | 'button';
  className?: string;
}

export default function FavoriteButton({
  productId,
  variant = 'icon',
  className = '',
}: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const saved = isFavorite(productId);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Evita que el clic dispare enlaces padres (<Link>)
    e.preventDefault();
    e.stopPropagation();

    if (saved) {
      removeFavorite(productId);
      toast.info('Producto eliminado de favoritos.');
    } else {
      addFavorite(productId);
      toast.success('Producto agregado a favoritos.');
    }
  };

  // 1. Variante botón con texto (para la vista de detalle de producto)
  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-pressed={saved}
        aria-label={
          saved
            ? 'Quitar producto de favoritos'
            : 'Agregar producto a favoritos'
        }
        className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 shadow-sm ${
          saved
            ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/60 hover:bg-rose-100 dark:hover:bg-rose-950/80 shadow-rose-500/10'
            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-800 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50/40 dark:hover:bg-rose-950/20'
        } ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={saved ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-5 h-5 transition-transform duration-200 ${
            saved ? 'scale-110 text-rose-500' : ''
          }`}
        >
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
        </svg>
        <span>{saved ? 'En favoritos' : 'Agregar a favoritos'}</span>
      </button>
    );
  }

  // 2. Variante icono flotante circular (para la tarjeta de producto)
  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={
        saved
          ? 'Quitar producto de favoritos'
          : 'Agregar producto a favoritos'
      }
      title={saved ? 'Quitar de favoritos' : 'Guardar en favoritos'}
      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 backdrop-blur-md shadow-xs ${
        saved
          ? 'bg-rose-50/95 dark:bg-rose-950/90 text-rose-500 border border-rose-200 dark:border-rose-900/60 shadow-rose-500/10'
          : 'bg-white/90 dark:bg-slate-900/90 text-slate-400 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 border border-slate-200/80 dark:border-slate-700/60 hover:border-rose-200 dark:hover:border-rose-800'
      } ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`w-4 h-4 transition-all duration-200 ${
          saved ? 'scale-110 fill-rose-500 text-rose-500' : 'hover:scale-110'
        }`}
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}

export { FavoriteButton };