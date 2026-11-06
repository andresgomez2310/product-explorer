
import ContactForm from '../components/forms/ContactForm';

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900">
            Contáctanos
          </h1>

          <p className="mt-3 text-slate-600">
            ¿Tienes alguna pregunta o sugerencia?
            Completa el siguiente formulario.
          </p>
        </header>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
