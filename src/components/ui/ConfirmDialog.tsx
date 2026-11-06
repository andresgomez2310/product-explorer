import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  educationalDarkPattern?: boolean;
}

/* =========================================================================
   DARK PATTERN INTENCIONAL (REQUISITO ACADÉMICO #17)
   
   Técnica: "Visual Interference / Misdirection" & "Preselection"
   Explicación pedagógica:
   El botón de 'Confirmar' se presenta con un tamaño prominente, color índigo
   saturado y sombra elevada, atrayendo inmediatamente el foco visual del
   usuario. Por el contrario, el botón de 'Cancelar' (salida neutral) se 
   minimiza con borde tenue y menor peso visual, induciendo psicológicamente
   a completar la acción deseada por la plataforma en lugar de abortarla.
   ========================================================================= */

export default function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onClose,
  educationalDarkPattern = false,
}: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    }

    if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  function handleConfirm() {
    dialogRef.current?.close();
    onConfirm();
  }

  function handleCancel() {
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 text-slate-900 dark:text-slate-100 shadow-2xl backdrop:bg-slate-950/70 backdrop:backdrop-blur-sm"
    >
      {/* Icono de verificación */}
      <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <h2 id="confirm-dialog-title" className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>

      <p id="confirm-dialog-description" className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        {description}
      </p>

      {/* Nota educativa del Dark Pattern */}
      {educationalDarkPattern && (
        <div className="mt-4 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-950/40 p-3.5 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong className="font-semibold block mb-0.5">Demostración académica:</strong>
          Este diálogo ejemplifica un patrón de diseño intencional donde la acción de confirmar tiene una preponderancia visual sobre cancelar.
        </div>
      )}

      {/* Acciones del Modal */}
      <div className="mt-6 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-600/20 hover:-translate-y-0.5 transition-all"
        >
          Confirmar y continuar
        </button>

        <button
          type="button"
          autoFocus
          onClick={handleCancel}
          className="w-full rounded-xl border border-slate-200 dark:border-slate-800 px-5 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Cancelar
        </button>
      </div>
    </dialog>
  );
}

export { ConfirmDialog };