
import { NavLink } from 'react-router';
import { useFavorites } from '../../context/FavoritesContext';


export default function Header() {
  const { favorites } = useFavorites();
  const links = [
    { to: '/', label: 'Inicio', end: true },
    { to: '/explore', label: 'Explorar' },
    {
      to: '/favorites',
      label: `Favoritos (${favorites.length})`,
    },
    { to: '/contact', label: 'Contacto' },
  ];

  return (
    <header className="border-b border-slate-200">
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4"
      >
        <NavLink to="/" className="text-xl font-bold">
          Explorador de Productos
        </NavLink>

        <div className="flex flex-wrap gap-4">
          {links.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                isActive
                  ? 'font-semibold text-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
