
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
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Categoría
      </label>

      <select
        id="category-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
      >
        <option value="all">Todas las categorías</option>

        {categories.map((category) => (
          <option key={category} value={category}>
            {category
              .split('-')
              .map((word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
              )
              .join(' ')}
          </option>
        ))}
      </select>
    </div>
  );
}
