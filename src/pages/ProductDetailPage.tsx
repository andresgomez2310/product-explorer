import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useProduct } from '../hooks/UseProduct';
import FavoriteButton from '../components/products/FavoriteButton';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productId = Number(id);
  const validId =
    id !== undefined &&
    /^[1-9]\d*$/.test(id) &&
    Number.isSafeInteger(productId);

  const { product, loading, error } = useProduct(validId ? productId : 0);

  // =========================================================================
  // CASO 1: ID NO VÁLIDO
  // =========================================================================
  if (!validId) {
    return (
      <main className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
        <div className="rounded-3xl border border-rose-200 dark:border-rose-900/60 bg-white dark:bg-slate-900/60 p-10 shadow-sm max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Identificador no válido
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            El ID proporcionado en la ruta no corresponde a un formato numérico válido.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
          >
            ← Volver al catálogo
          </Link>
        </div>
      </main>
    );
  }

  // =========================================================================
  // CASO 2: CARGANDO
  // =========================================================================
  if (loading) {
    return (
      <div
        role="status"
        aria-label="Cargando detalles del producto..."
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 animate-pulse"
      >
        <div className="h-4 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-8" />
        <div className="grid gap-12 md:grid-cols-2">
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="space-y-5">
            <div className="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-10 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="space-y-2 pt-4">
              <div className="h-4 w-full bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-5/6 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
            <div className="h-12 w-48 bg-slate-200 dark:bg-slate-800 rounded-xl pt-4" />
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // CASO 3: ERROR O PRODUCTO INEXISTENTE
  // =========================================================================
  if (error || !product) {
    return (
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-16 text-center">
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-10 shadow-sm max-w-lg mx-auto">
          <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No se encontró el producto
          </h1>
          <p role="alert" className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            {error ?? 'El artículo solicitado no existe o fue retirado.'}
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-md shadow-indigo-600/20"
          >
            ← Volver a explorar productos
          </Link>
        </div>
      </section>
    );
  }

  // Galería de imágenes (si vienen múltiples o fallback)
  const displayImages = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail];

  // =========================================================================
  // CASO 4: VISTA DE DETALLE COMPLETO
  // =========================================================================
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* Migas de pan (Breadcrumbs) accesibles */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Inicio
        </Link>
        <span>/</span>
        <Link to="/explore" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Explorar
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1 max-w-[200px] sm:max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Grid de 2 Columnas */}
      <div className="grid gap-10 md:grid-cols-2 lg:gap-14 items-start">
        
        {/* COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-8 flex items-center justify-center overflow-hidden shadow-xs">
            <img
              src={displayImages[selectedImageIndex] ?? product.thumbnail}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-all duration-300"
            />
          </div>

          {/* Miniaturas en caso de existir más de 1 imagen */}
          {displayImages.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {displayImages.map((imgUrl, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`Ver imagen ${index + 1} de ${product.title}`}
                  className={`relative w-20 h-20 rounded-xl border-2 p-2 flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 transition-all ${
                    selectedImageIndex === index
                      ? 'border-indigo-600 dark:border-indigo-400 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt=""
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* COLUMNA DERECHA: INFORMACIÓN Y ACCIONES */}
        <div className="flex flex-col space-y-6">
          
          {/* Categoría y Marca */}
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50">
                {product.category.replace('-', ' ')}
              </span>
              {product.brand && (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Marca: <strong className="text-slate-700 dark:text-slate-200">{product.brand}</strong>
                </span>
              )}
            </div>

            {/* Título */}
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
              {product.title}
            </h1>
          </div>

          {/* Calificación y Disponibilidad */}
          <div className="flex flex-wrap items-center gap-4 pb-4 border-b border-slate-200/80 dark:border-slate-800">
            {/* Rating */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-sm font-bold">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-400">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
              </svg>
              <span>{product.rating.toFixed(1)} / 5.0</span>
            </div>

            {/* Stock Pill */}
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border ${
                product.stock > 0
                  ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                  : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  product.stock > 0 ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {product.stock > 0
                ? `${product.stock} unidades en stock`
                : 'Agotado'}
            </span>
          </div>

          {/* Precio */}
          <div>
            <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block mb-1">
              Precio actual
            </span>
            <p className="text-4xl font-black text-slate-900 dark:text-white">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Descripción del producto
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              {product.description}
            </p>
          </div>

          {/* Botón de Acción Principal: Favorito */}
          <div className="pt-4">
            <FavoriteButton
              productId={product.id}
              variant="button"
              className="w-full sm:w-auto"
            />
          </div>

        </div>
      </div>
    </section>
  );
}