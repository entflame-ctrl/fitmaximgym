'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import logo from '@/public/brand/logo.png';

const LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Habits', href: '#habits' },
  { label: 'Why us', href: '#why' },
  { label: 'Members', href: '#members' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
];

/**
 * The supplied lockup already contains the "Fit Maxim" wordmark in white with a
 * flexing figure at each end, so it replaces the type as well as the mark —
 * setting the name again beside it would double the brand name.
 * `priority` because it sits in the header, above the fold on every route.
 */
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Image
      src={logo}
      alt="Fitmaxim"
      priority
      sizes="(max-width: 640px) 180px, 230px"
      className={`h-10 w-auto sm:h-11 ${className}`}
    />
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
        scrolled
          ? 'border-b border-bone/[0.07] bg-void/70 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="shell flex h-[4.5rem] items-center justify-between gap-6"
      >
        <Link
          href="#top"
          className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
        >
          <Wordmark />
          <span className="sr-only">Fitmaxim home</span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="relative font-mono text-[0.7rem] uppercase tracking-[0.18em] text-bone/55 transition-colors duration-300 hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="#pricing" className="hidden !px-6 !py-3 btn-primary sm:inline-flex">
            Join now
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="grid h-11 w-11 place-items-center rounded-full border border-bone/15 text-bone md:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden className="relative block h-3 w-5">
              <span
                className={`absolute inset-x-0 block h-[2px] rounded-full bg-current transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute inset-x-0 block h-[2px] rounded-full bg-current transition-all duration-300 ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-bone/[0.07] bg-void/95 backdrop-blur-xl md:hidden"
          >
            <ul className="shell flex flex-col gap-1 py-5">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-2 py-3.5 font-display text-2xl font-black uppercase tracking-crush text-bone/80 transition-colors hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="mt-3">
                <Link
                  href="#pricing"
                  onClick={() => setOpen(false)}
                  className="btn-primary w-full"
                >
                  Join now
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
