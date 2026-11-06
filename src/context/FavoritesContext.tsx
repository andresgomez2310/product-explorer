
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface FavoritesContextType {
  favorites: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<
  FavoritesContextType | undefined
>(undefined);

const STORAGE_KEY = 'product-explorer-favorites';

function loadFavorites(): number[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);

    if (!Array.isArray(parsed)) return [];

    return [
      ...new Set(
        parsed.filter(
          (id): id is number =>
            typeof id === 'number' &&
            Number.isSafeInteger(id) &&
            id > 0
        )
      ),
    ];
  } catch {
    return [];
  }
}

export function FavoritesProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favorites, setFavorites] =
    useState<number[]>(loadFavorites);

  function updateFavorites(ids: number[]) {
    setFavorites(ids);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(ids)
      );
    } catch {
      // La aplicación sigue funcionando si el almacenamiento falla.
    }
  }

  function addFavorite(id: number) {
    if (!favorites.includes(id)) {
      updateFavorites([...favorites, id]);
    }
  }

  function removeFavorite(id: number) {
    updateFavorites(
      favorites.filter((favoriteId) => favoriteId !== id)
    );
  }

  function isFavorite(id: number) {
    return favorites.includes(id);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error(
      'useFavorites debe utilizarse dentro de FavoritesProvider'
    );
  }

  return context;
}

