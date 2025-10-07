import React from "react";
import { createPortal } from "react-dom";
import { cn } from "../../utils/cn";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlay?: boolean;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  size = "md",
  closeOnOverlay = true,
}: ModalProps) {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  } as const;

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (!closeOnOverlay) return;
          if (e.target === overlayRef.current) onClose?.();
        }}
      />
      <div
        className={cn(
          "relative mx-4 w-full rounded-lg border border-line bg-card text-foreground shadow-xl",
          sizeClasses[size],
          className
        )}
      >
        {(title || description) && (
          <div className="px-5 pt-5">
            {title && (
              <h3 className="text-lg font-semibold leading-6">{title}</h3>
            )}
            {description && (
              <p className="mt-1 text-sm text-muted">{description}</p>
            )}
          </div>
        )}
        <div className="px-5 py-5">{children}</div>
      </div>
    </div>
  );

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  return portalTarget ? createPortal(modalContent, portalTarget) : modalContent;
}

export default Modal;
