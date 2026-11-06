import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden animate-pulse">
      {/* Espacio de la imagen */}
      <div className="aspect-square w-full bg-slate-200 dark:bg-slate-800" />

      {/* Espacio de los textos */}
      <div className="p-5 flex flex-col gap-3">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-5 w-3/4 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="space-y-1.5 py-1">
          <div className="h-3 w-full bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-3 w-4/5 bg-slate-200 dark:bg-slate-800 rounded" />
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-2">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
          <div className="h-7 w-24 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;