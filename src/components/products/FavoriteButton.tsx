
import { useFavorites } from '../../context/FavoritesContext';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  productId: number;
}

export default function FavoriteButton({
  productId,
}: FavoriteButtonProps) {
  const {
    isFavorite,
    addFavorite,
    removeFavorite,
  } = useFavorites();

  const saved = isFavorite(productId);

 
function handleClick() {
  if (saved) {
    removeFavorite(productId);
    toast.info('Producto eliminado de favoritos.');
  } else {
    addFavorite(productId);
    toast.success('Producto agregado a favoritos.');
  }
}


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
      className={`rounded-lg border px-4 py-2 font-medium transition-colors ${
        saved
          ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
      }`}
    >
      {saved ? '♥ En favoritos' : '♡ Agregar a favoritos'}
    </button>
  );
}
