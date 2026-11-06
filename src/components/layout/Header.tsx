import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { ThemeToggle } from '../ui/ThemeToogle';
import logoImg from '../../assets/download.svg';

export const Header = () => {
  const { favorites } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const favoritesCount = favorites.length;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/80 dark:bg-indigo-950/40'
        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/50'
    }`;

  const getMobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center justify-between px-4 py-3 text-base font-medium rounded-xl transition-colors ${
      isActive
        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo NovaCatalog */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1 group"
          >
            {/* Isotipo SVG Nova */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <img
                src={logoImg}
                alt="NovaCatalog Logo"
                className="w-10 h-10 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
            {/* Texto de Marca */}
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Nova<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500 dark:from-indigo-400 dark:to-cyan-400">Catalog</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500 mt-0.5">
                Product Explorer
              </span>
            </div>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navegación principal">
            <NavLink to="/" className={getNavLinkClass} end>
              Inicio
            </NavLink>
            <NavLink to="/explore" className={getNavLinkClass}>
              Explorar
            </NavLink>
            <NavLink to="/favorites" className={getNavLinkClass}>
              <span className="flex items-center gap-2">
                Favoritos
                {favoritesCount > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white dark:bg-indigo-500 shadow-sm animate-in fade-in zoom-in duration-200">
                    {favoritesCount}
                  </span>
                )}
              </span>
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contacto
            </NavLink>
          </nav>

          {/* Acciones Derecha (Theme Toggle + Menú Móvil) */}
          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {/* Botón hamburguesa móvil */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-expanded={isMobileMenuOpen}
              aria-label="Abrir menú de navegación"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                {isMobileMenuOpen ? (
                  <path d="M18 6 6 18M6 6l12 12" />
                ) : (
                  <path d="M4 12h16M4 6h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5" aria-label="Navegación móvil">
            <NavLink to="/" onClick={closeMobileMenu} className={getMobileNavLinkClass} end>
              Inicio
            </NavLink>
            <NavLink to="/explore" onClick={closeMobileMenu} className={getMobileNavLinkClass}>
              Explorar Catálogo
            </NavLink>
            <NavLink to="/favorites" onClick={closeMobileMenu} className={getMobileNavLinkClass}>
              <span>Favoritos</span>
              {favoritesCount > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-indigo-600 text-white">
                  {favoritesCount}
                </span>
              )}
            </NavLink>
            <NavLink to="/contact" onClick={closeMobileMenu} className={getMobileNavLinkClass}>
              Contacto
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;