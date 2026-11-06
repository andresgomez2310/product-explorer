import ContactForm from '../components/forms/ContactForm';

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Luz ambiental de fondo */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[500px] h-[300px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-cyan-500/10 blur-3xl rounded-full pointer-events-none" 
      />

      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Atención y consultas
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Contáctanos
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            ¿Tienes alguna duda sobre los productos o sugerencia para NovaCatalog? Completa el siguiente formulario.
          </p>
        </header>

        {/* Tarjeta del Formulario */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-6 sm:p-10 shadow-xl shadow-slate-900/5 backdrop-blur-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}