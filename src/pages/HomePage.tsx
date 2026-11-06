
import { Link } from 'react-router';

export default function HomePage() {
  return (
    <div>
      {/* Hero principal */}
      <section className="bg-slate-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="inline-block rounded-full bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-300">
            Descubre productos de diferentes categorías
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Encuentra productos que se adaptan a ti
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">
            Explora nuestro catálogo, consulta información
            detallada y guarda tus productos favoritos
            en un solo lugar.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/explore"
              className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Explorar productos
            </Link>

            <Link
              to="/favorites"
              className="rounded-lg border border-slate-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver mis favoritos
            </Link>
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            Todo lo que necesitas para explorar
          </h2>

          <p className="mt-3 text-slate-600">
            Descubre las funcionalidades de Product Explorer.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-xl border border-slate-200 p-8">
            <span aria-hidden="true" className="text-3xl">
              🔎
            </span>

            <h3 className="mt-5 text-xl font-semibold">
              Búsqueda inteligente
            </h3>

            <p className="mt-3 text-slate-600">
              Encuentra productos fácilmente mediante
              búsquedas y filtros por categoría.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 p-8">
            <span aria-hidden="true" className="text-3xl">
              ♡
            </span>

            <h3 className="mt-5 text-xl font-semibold">
              Tus favoritos
            </h3>

            <p className="mt-3 text-slate-600">
              Guarda los productos que te interesan
              para consultarlos cuando quieras.
            </p>
          </article>

          <article className="rounded-xl border border-slate-200 p-8">
            <span aria-hidden="true" className="text-3xl">
              📦
            </span>

            <h3 className="mt-5 text-xl font-semibold">
              Información detallada
            </h3>

            <p className="mt-3 text-slate-600">
              Consulta imágenes, precios, valoraciones
              y disponibilidad de cada producto.
            </p>
          </article>
        </div>
      </section>

      {/* Llamada a la acción */}
      <section className="bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900">
            ¿Listo para descubrir algo nuevo?
          </h2>

          <p className="mt-4 text-slate-600">
            Explora el catálogo y encuentra tus próximos favoritos.
          </p>

          <Link
            to="/explore"
            className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Comenzar a explorar
          </Link>
        </div>
      </section>
    </div>
  );
}
