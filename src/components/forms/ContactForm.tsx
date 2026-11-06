
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

function validateForm(
  form: ContactFormData
): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (form.name.trim().length < 2) {
    errors.name =
      'El nombre debe tener al menos 2 caracteres.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email.trim())) {
    errors.email =
      'Introduce un correo electrónico válido.';
  }

  if (form.message.trim().length < 10) {
    errors.message =
      'El mensaje debe tener al menos 10 caracteres.';
  }

  return errors;
}

export default function ContactForm() {
  const [form, setForm] =
    useState<ContactFormData>(initialForm);

  const [touched, setTouched] = useState<
    Record<keyof ContactFormData, boolean>
  >({
    name: false,
    email: false,
    message: false,
  });

  const [dialogOpen, setDialogOpen] = useState(false);

  const errors = validateForm(form);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(
    field: keyof ContactFormData,
    value: string
  ) {
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

  function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
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

    toast.info(
      'Demostración local: no se envió ningún mensaje.'
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block font-medium text-slate-700"
          >
            Nombre completo *
          </label>

          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(event) =>
              handleChange('name', event.target.value)
            }
            onBlur={() => handleBlur('name')}
            aria-invalid={
              touched.name && !!errors.name
            }
            aria-describedby={
              touched.name && errors.name
                ? 'contact-name-error'
                : undefined
            }
            placeholder="Tu nombre"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          {touched.name && errors.name && (
            <p
              id="contact-name-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block font-medium text-slate-700"
          >
            Correo electrónico *
          </label>

          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(event) =>
              handleChange('email', event.target.value)
            }
            onBlur={() => handleBlur('email')}
            aria-invalid={
              touched.email && !!errors.email
            }
            aria-describedby={
              touched.email && errors.email
                ? 'contact-email-error'
                : undefined
            }
            placeholder="correo@ejemplo.com"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          {touched.email && errors.email && (
            <p
              id="contact-email-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block font-medium text-slate-700"
          >
            Mensaje *
          </label>

          <textarea
            id="contact-message"
            rows={5}
            value={form.message}
            onChange={(event) =>
              handleChange('message', event.target.value)
            }
            onBlur={() => handleBlur('message')}
            aria-invalid={
              touched.message && !!errors.message
            }
            aria-describedby={
              touched.message && errors.message
                ? 'contact-message-error'
                : undefined
            }
            placeholder="Escribe tu mensaje..."
            className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          {touched.message && errors.message && (
            <p
              id="contact-message-error"
              className="mt-1 text-sm text-red-600"
            >
              {errors.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
        >
          Enviar mensaje
        </button>

        <p className="text-center text-xs text-slate-500">
          Formulario de demostración: no envía datos
          a ningún servidor.
        </p>
      </form>

      <ConfirmDialog
        open={dialogOpen}
        title="¿Confirmar formulario?"
        description="Los datos son válidos. ¿Quieres completar la demostración?"
        onConfirm={handleConfirm}
        onClose={() => setDialogOpen(false)}
        educationalDarkPattern
      />
    </>
  );
}
