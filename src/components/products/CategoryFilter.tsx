interface CategoryFilterProps {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function CategoryFilter({
  categories,
  value,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="category-filter"
        className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400"
      >
        Categoría
      </label>

      <div className="relative flex items-center">
        {/* Selector con apariencia limpia */}
        <select
          id="category-filter"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full appearance-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 pr-10 text-sm font-medium text-slate-900 dark:text-slate-100 outline-none transition-all focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xs cursor-pointer"
        >
          <option value="all" className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
            Todas las categorías
          </option>

          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
            >
              {category
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </option>
          ))}
        </select>

        {/* Icono de flecha personalizado */}
        <div className="pointer-events-none absolute right-3.5 text-slate-400 dark:text-slate-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export { CategoryFilter };