'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AmbientVideo from './AmbientVideo';
import VideoModal from './VideoModal';
import { ArrowIcon, PlayIcon, StarIcon } from './icons';

type Review = {
  name: string;
  role: string;
  initials: string;
  rating: number;
  quote: string;
};

/**
 * PLACEHOLDER COPY — replace with the real Google reviews for Fit Maxim Nepal.
 * Google Maps serves its review list from JS, so it cannot be scraped from the
 * place URL; paste the review text in and swap these entries one for one.
 * Names below are illustrative, not real members.
 */
const REVIEWS: Review[] = [
  {
    name: 'Aayush Shrestha',
    role: 'Member since 2021',
    initials: 'AS',
    rating: 5,
    quote:
      'I came in barely able to hold a plank. Two years later I deadlift 120kg. Nobody rushed me and nobody let me coast.',
  },
  {
    name: 'Bibek Gurung',
    role: 'Powerlifter',
    initials: 'BG',
    rating: 5,
    quote:
      'The calibrated plates and the platforms are the real reason I moved gyms. My numbers finally mean the same thing week to week.',
  },
  {
    name: 'Sneha Maharjan',
    role: 'Classes three times a week',
    initials: 'SM',
    rating: 5,
    quote:
      'The dance studio is where I stopped thinking of training as a chore. I book Tuesday and Thursday before I book anything else.',
  },
  {
    name: 'Prakash Tamang',
    role: 'Early shift, 5am regular',
    initials: 'PT',
    rating: 4,
    quote:
      'I train at 5am and the floor is clean, restocked, and staffed. That sounds small until you have been let down by every other gym.',
  },
  {
    name: 'Anjali Rai',
    role: 'Postnatal return',
    initials: 'AR',
    rating: 5,
    quote:
      'My coach rebuilt my programme around what my body could actually do that month. That patience is the whole reason I stayed.',
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5 text-sm">
      <span className="sr-only">{rating} out of 5 stars</span>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} className={i < rating ? 'text-maroon' : 'text-bone/15'} />
      ))}
    </span>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLUListElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  // Native scroll-snap does the sliding; the buttons just nudge it. Keeps
  // keyboard, trackpad, and touch behaviour identical for free.
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      el.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [sync]);

  const nudge = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector('li');
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({
      left: step * direction,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  return (
    <>
      {/* overflow-hidden clips the decorative glow below; without it the glow
          is wider than a phone viewport and stretches the whole document. */}
      <section
        id="members"
        className="edge-fade relative overflow-hidden bg-void py-28 md:py-40"
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/4 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-maroon/[0.05] blur-[150px]"
        />

        <div className="relative z-20">
          <div className="shell">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <div className="max-w-xl">
                <p className="set-label mb-6">Set 04 · Proof</p>
                <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[0.92] text-bone">
                  What our members
                  <br />
                  are saying
                </h2>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => nudge(-1)}
                  disabled={atStart}
                  className="grid h-12 w-12 place-items-center rounded-full border border-bone/15 text-bone/70 transition-all duration-300 hover:border-maroon/50 hover:text-maroon disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                >
                  <ArrowIcon className="rotate-180 text-lg" />
                  <span className="sr-only">Previous reviews</span>
                </button>
                <button
                  type="button"
                  onClick={() => nudge(1)}
                  disabled={atEnd}
                  className="grid h-12 w-12 place-items-center rounded-full border border-bone/15 text-bone/70 transition-all duration-300 hover:border-maroon/50 hover:text-maroon disabled:pointer-events-none disabled:opacity-30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                >
                  <ArrowIcon className="text-lg" />
                  <span className="sr-only">More reviews</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
            {/* Video testimonial: the classes clip, opening the lightbox. */}
            <div className="shell lg:pr-0">
              <motion.button
                type="button"
                onClick={() => setModalOpen(true)}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative block h-full min-h-[22rem] w-full overflow-hidden rounded-3xl border border-bone/10 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
              >
                <AmbientVideo
                  name="classes"
                  alt="Members in a group dance class at the Fitmaxim studio"
                  objectPosition="50% 45%"
                  className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-void via-void/45 to-void/10" />

                <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                  <span className="block">
                    <span className="block font-mono text-[0.62rem] uppercase tracking-[0.2em] text-maroon">
                      Video review
                    </span>
                    <span className="mt-2 block font-display text-xl font-black uppercase leading-[1] tracking-crush text-bone">
                      Thursday
                      <br />
                      dance class
                    </span>
                    <span className="mt-2 block text-[0.82rem] text-bone/55">
                      Jodie on why she books it first
                    </span>
                  </span>

                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-maroon text-void transition-transform duration-300 group-hover:scale-105">
                    <PlayIcon className="ml-0.5 text-base" />
                    {!prefersReducedMotion && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-maroon animate-pulse-ring"
                      />
                    )}
                  </span>
                </span>
              </motion.button>
            </div>

            {/* Card slider. Bleeds to the right edge so it reads as continuing. */}
            <ul
              ref={trackRef}
              className="scrollbar-none flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2"
              style={{
                paddingInlineStart: 'var(--shell-pad)',
                paddingInlineEnd: 'var(--shell-pad)',
              }}
            >
              {REVIEWS.map((review, i) => (
                <li
                  key={review.name}
                  className="w-[min(21rem,78vw)] shrink-0 snap-start"
                >
                  <motion.figure
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{
                      duration: 0.65,
                      delay: Math.min(i, 3) * 0.09,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="glass flex h-full flex-col rounded-3xl p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-maroon/25"
                  >
                    <Stars rating={review.rating} />

                    <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-bone/70">
                      {review.quote}
                    </blockquote>

                    <figcaption className="mt-7 flex items-center gap-3.5 border-t border-bone/[0.08] pt-5">
                      <span
                        aria-hidden
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-full font-mono text-[0.7rem] font-bold text-void"
                        style={{ background: `hsl(352 ${76 - i * 6}% ${76 - i * 3}%)` }}
                      >
                        {review.initials}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate font-mono text-[0.8rem] font-bold uppercase tracking-[0.1em] text-bone">
                          {review.name}
                        </span>
                        <span className="mt-1 block truncate text-[0.78rem] text-bone/45">
                          {review.role}
                        </span>
                      </span>
                    </figcaption>
                  </motion.figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <VideoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        name="classes"
        title="Thursday dance class at Fitmaxim"
      />
    </>
  );
}
