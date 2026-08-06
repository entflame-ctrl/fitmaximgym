'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowIcon } from './icons';

/**
 * Signature element: the headline is a window onto the gym floor.
 *
 * "community" is filled with a still frame of the room, clipped to the
 * letterforms with background-clip:text and tinted maroon so it still reads as
 * brand colour. The frame is a real background-image, which is the only thing
 * background-clip can actually clip — a <video> cannot be an element's
 * background, so an earlier attempt to park one behind the type just painted a
 * visible rectangle. Motion lives in the ambient backdrop instead.
 *
 * Fallback: no background-clip support → solid maroon type (globals.css).
 */
export default function CommunityCta() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  // Defer the backdrop video's sources until the section is near the viewport.
  useEffect(() => {
    if (prefersReducedMotion) return;
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="community"
      className="edge-fade relative isolate overflow-hidden bg-void py-32 md:py-48"
    >
      {/* Ambient backdrop. Held well below the type: the room should be legible
          as a place, never competing with the words in front of it. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {prefersReducedMotion ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/media/machines-poster.jpg"
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <video
            muted
            loop
            playsInline
            autoPlay
            preload="none"
            poster="/media/machines-poster.jpg"
            className="h-full w-full object-cover"
          >
            {active && (
              <>
                <source src="/media/machines-1280.webm" type="video/webm" />
                <source src="/media/machines-1280.mp4" type="video/mp4" />
              </>
            )}
          </video>
        )}

        {/* Flat scrim first, then a vertical fade into the neighbouring
            sections, then a centre vignette so the copy sits on the darkest
            part of the frame. Stacked rather than one gradient because each is
            doing a different job. */}
        <div className="absolute inset-0 bg-void/[0.82]" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-void/60 to-void" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(8,5,6,0.72) 0%, rgba(8,5,6,0.35) 55%, transparent 100%)',
          }}
        />
      </div>

      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -z-10 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maroon/[0.07] blur-[150px]"
      />

      <div className="grain" />

      <div className="shell relative z-20 text-center">
        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-9 flex w-fit items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-maroon"
        >
          <span className="h-px w-8 bg-maroon/50" />
          Set 06 · Cooldown
          <span className="h-px w-8 bg-maroon/50" />
        </motion.p>

        {/* No max-width here: the shell already constrains the line, and a
            narrower cap clipped the longest word once Archivo went expanded. */}
        <motion.h2
          initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-[clamp(2.25rem,10.5vw,9rem)] leading-[0.84]"
        >
          <span className="block text-bone">Join our</span>
          <span
            className="video-type block"
            style={{
              // Maroon wash over the still frame; first background paints on
              // top. Kept opaque enough that the glyphs read as brand colour
              // with the room as texture — at lower alpha the dark parts of the
              // frame swallowed the letterforms against the dark section behind
              // them. Brighter than #800000 because at this size the type is
              // the page's focal point and has to carry.
              backgroundImage:
                'linear-gradient(180deg, rgba(255,74,94,0.92), rgba(196,30,54,0.88)), url(/media/strength-poster.jpg)',
              backgroundSize: 'cover, cover',
              backgroundPosition: 'center, center 40%',
              backgroundRepeat: 'no-repeat, no-repeat',
            }}
          >
            community
          </span>
        </motion.h2>

        <motion.p
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-10 max-w-lg text-lg leading-relaxed text-bone/70"
        >
          Twelve thousand people train here. Not one of them started stronger
          than the day they walked in.
        </motion.p>

        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-3.5"
        >
          <Link href="#pricing" className="btn-primary">
            Join now
            <ArrowIcon className="text-base" />
          </Link>
          <Link href="#why" className="btn-ghost">
            Book a tour
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
