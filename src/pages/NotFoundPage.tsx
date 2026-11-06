import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="relative flex min-h-[75vh] items-center justify-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Luz cósmica de fondo */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-violet-500/10 to-cyan-500/15 blur-3xl rounded-full pointer-events-none" 
      />

      <div className="max-w-xl text-center">
        {/* Badge 404 */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200/60 dark:border-indigo-800/60 bg-indigo-50/80 dark:bg-indigo-950/50 backdrop-blur-sm text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span>Error 404 • Ruta inexistente</span>
        </div>

        {/* 404 con degradado */}
        <p className="text-7xl sm:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 select-none">
          404
        </p>

        {/* Título y Mensaje */}
        <h1 className="mt-4 text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Página no encontrada
        </h1>

        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-400 max-w-md mx-auto">
          La dirección que ingresaste no corresponde a ninguna página existente o fue trasladada a otra ubicación.
        </p>

        {/* Botones de Retorno */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-indigo-600 hover:bg-indigo-500 shadow-md shadow-indigo-600/25 hover:-translate-y-0.5 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
            </svg>
            Volver al inicio
          </Link>

          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800/60 shadow-xs transition-all"
          >
            Explorar catálogo
          </Link>
        </div>
      </div>
    </section>
  );
}

export { NotFoundPage };