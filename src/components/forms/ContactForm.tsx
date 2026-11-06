import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import ConfirmDialog from '../ui/ConfirmDialog';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const initialForm: ContactFormData = {
  name: '',
  email: '',
  message: '',
};

function validateForm(form: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (form.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email.trim())) {
    errors.email = 'Introduce un correo electrónico válido.';
  }

  if (form.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(initialForm);
  const [touched, setTouched] = useState<Record<keyof ContactFormData, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const errors = validateForm(form);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(field: keyof ContactFormData, value: string) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function handleBlur(field: keyof ContactFormData) {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValid) {
      toast.error('Revisa los campos del formulario.');
      return;
    }

    setDialogOpen(true);
  }

  function handleConfirm() {
    setDialogOpen(false);
    setForm(initialForm);
    setTouched({
      name: false,
      email: false,
      message: false,
    });

    toast.success('Confirmación completada.');
    toast.info('Demostración local: no se envió ningún mensaje.');
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        
        {/* Campo 1: Nombre */}
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Nombre completo *
          </label>

          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) => handleChange('name', event.target.value)}
            onBlur={() => handleBlur('name')}
            aria-invalid={touched.name && !!errors.name}
            aria-describedby={touched.name && errors.name ? 'contact-name-error' : undefined}
            placeholder="Ej. Nicolas Pérez"
            className={`w-full rounded-xl border bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${
              touched.name && errors.name
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
            }`}
          />

          {touched.name && errors.name && (
            <p id="contact-name-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo 2: Correo electrónico */}
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Correo electrónico *
          </label>

          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) => handleChange('email', event.target.value)}
            onBlur={() => handleBlur('email')}
            aria-invalid={touched.email && !!errors.email}
            aria-describedby={touched.email && errors.email ? 'contact-email-error' : undefined}
            placeholder="correo@ejemplo.com"
            className={`w-full rounded-xl border bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${
              touched.email && errors.email
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
            }`}
          />

          {touched.email && errors.email && (
            <p id="contact-email-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo 3: Mensaje */}
        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
          >
            Mensaje *
          </label>

          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(event) => handleChange('message', event.target.value)}
            onBlur={() => handleBlur('message')}
            aria-invalid={touched.message && !!errors.message}
            aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
            placeholder="Escribe tu mensaje con al menos 10 caracteres..."
            className={`w-full resize-y rounded-xl border bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${
              touched.message && errors.message
                ? 'border-rose-400 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10'
                : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'
            }`}
          />

          {touched.message && errors.message && (
            <p id="contact-message-error" role="alert" className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
                <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5A.75.75 0 0 1 10 5Zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
              </svg>
              {errors.message}
            </p>
          )}
        </div>

        {/* Botón de Envío */}
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isValid
              ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 hover:-translate-y-0.5 cursor-pointer'
              : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
          }`}
        >
          Enviar mensaje
        </button>

        <p className="text-center text-xs text-slate-400 dark:text-slate-500">
          Formulario de demostración académica: no envía datos a ningún servidor real.
        </p>
      </form>

      {/* Modal de confirmación con Dark Pattern pedagógico */}
      <ConfirmDialog
        open={dialogOpen}
        title="¿Confirmar envío del formulario?"
        description="Has completado todos los campos válidos. ¿Deseas finalizar la demostración?"
        onConfirm={handleConfirm}
        onClose={() => setDialogOpen(false)}
        educationalDarkPattern
      />
    </>
  );
}