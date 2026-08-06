'use client';

import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CloseIcon } from './icons';

/**
 * Accessible video lightbox.
 *
 * Handles the four things a dialog has to get right: Escape closes it, focus
 * moves in on open and returns to the trigger on close, Tab is trapped inside,
 * and the page behind it cannot scroll.
 */
export default function VideoModal({
  open,
  onClose,
  name,
  title,
}: {
  open: boolean;
  onClose: () => void;
  name: string;
  title: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  // Element that had focus before opening, so we can hand it back.
  const restoreRef = useRef<HTMLElement | null>(null);

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], video, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', handleKey);
      restoreRef.current?.focus();
    };
  }, [open, handleKey]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-void/92 p-5 backdrop-blur-md"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-maroon/25 bg-ash-900 shadow-maroon-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-11 w-11 place-items-center rounded-full border border-bone/15 bg-void/70 text-lg text-bone/80 backdrop-blur transition-colors hover:border-maroon/60 hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
            >
              <CloseIcon />
              <span className="sr-only">Close video</span>
            </button>

            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <video
              controls
              autoPlay
              loop
              playsInline
              poster={`/media/${name}-poster.jpg`}
              className="aspect-video w-full bg-void"
            >
              <source src={`/media/${name}-1280.webm`} type="video/webm" />
              <source src={`/media/${name}-1280.mp4`} type="video/mp4" />
            </video>

            <p className="border-t border-bone/[0.08] px-6 py-4 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-bone/45">
              {title}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
