
import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
  educationalDarkPattern?: boolean;
}

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
      className="m-auto w-[calc(100%-2rem)] max-w-md rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-2xl backdrop:bg-slate-950/60"
    >
      <h2
        id="confirm-dialog-title"
        className="text-2xl font-bold"
      >
        {title}
      </h2>

      <p
        id="confirm-dialog-description"
        className="mt-3 text-slate-600"
      >
        {description}
      </p>

      {educationalDarkPattern && (
        <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          Demostración académica: este modal presenta
          un patrón de diseño oscuro educativo, no datos reales.
        </p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleConfirm}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Confirmar
        </button>

        <button
          type="button"
          autoFocus
          onClick={handleCancel}
          className="rounded-lg border border-slate-300 px-5 py-3 text-sm text-slate-600 hover:bg-slate-100"
        >
          Cancelar
        </button>
      </div>
    </dialog>
  );
}
