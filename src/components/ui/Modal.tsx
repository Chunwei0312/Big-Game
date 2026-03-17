import type { ReactNode } from "react";
import Button from "./Button";

interface ModalProps {
  children: ReactNode;
  footer?: ReactNode;
  onClose?: () => void;
  open: boolean;
  size?: "medium" | "large";
  title: string;
}

export default function Modal({ children, footer, onClose, open, size = "medium", title }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose} role="presentation">
      <div
        aria-modal="true"
        className={`modal-card modal-card--${size}`}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="modal-card__header">
          <h2>{title}</h2>
          {onClose ? (
            <Button aria-label="Close modal" onClick={onClose} variant="ghost">
              Close
            </Button>
          ) : null}
        </div>
        <div className="modal-card__body">{children}</div>
        {footer ? <div className="modal-card__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
