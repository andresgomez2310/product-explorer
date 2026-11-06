
import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-[75vh] items-center justify-center px-6 py-16">
      <div className="max-w-xl text-center">
        <p className="text-7xl font-extrabold text-blue-600 sm:text-8xl">
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Página no encontrada
        </h1>

        <p className="mt-4 leading-relaxed text-slate-600">
          La página que estás buscando no existe
          o la dirección ingresada es incorrecta.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Volver al inicio
          </Link>

          <Link
            to="/explore"
            className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
          >
            Explorar productos
          </Link>
        </div>
      </div>
    </section>
  );
}
