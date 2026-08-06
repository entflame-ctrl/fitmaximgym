'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';
import { ParallaxSection, ParallaxLayer } from './ParallaxSection';
import AmbientVideo from './AmbientVideo';
import VideoModal from './VideoModal';
import { ArrowIcon, PlayIcon, StarIcon, SOCIALS } from './icons';

const STATS = [
  { value: '12,400', label: 'Members' },
  { value: '40', label: 'Coaches' },
  { value: '24/7', label: 'Access' },
];

/** Stagger container — children inherit the timeline, so one transition tunes all. */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.085, delayChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ParallaxSection
        id="top"
        intensity={22}
        className="flex min-h-[100svh] items-center bg-void"
      >
        {/* ---- Layer 1 · background · 0.35x ---- */}
        <ParallaxLayer speed={0.35} fill>
          <div className="absolute inset-0 bg-ash-fade" />
          {/* Rack uprights. Wider gaps than a generic grid so they read as
              structure in a room, not graph paper. */}
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(90deg, rgba(246,241,242,0.045) 1px, transparent 1px)',
              backgroundSize: 'clamp(90px, 12vw, 170px) 100%',
              maskImage:
                'linear-gradient(to bottom, transparent, black 28%, black 72%, transparent)',
            }}
          />
        </ParallaxLayer>

        {/* ---- Layer 2 · midground glow · 0.6x ---- */}
        <ParallaxLayer speed={0.6} fill>
          <div className="absolute -left-40 top-1/4 h-[34rem] w-[34rem] rounded-full bg-maroon/[0.09] blur-[150px]" />
          <div className="absolute -right-20 bottom-0 h-[26rem] w-[26rem] rounded-full bg-maroon-mid/[0.07] blur-[130px]" />
        </ParallaxLayer>

        <div className="grain" />

        {/* ---- Layer 3 · foreground · 1x ---- */}
        <ParallaxLayer speed={1} className="relative z-30 w-full">
          <div className="shell grid items-center gap-14 py-32 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-24">
            <motion.div variants={container} initial="hidden" animate="show">
              <motion.p variants={item} className="set-label mb-7">
                Tokha-03, Kathmandu · Est. 2020
              </motion.p>

              <motion.h1
                variants={item}
                className="text-[clamp(2.75rem,7.6vw,6.5rem)] leading-[0.87] text-bone"
              >
                Transform
                <br />
                your body,
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 text-maroon">elevate</span>
                  <motion.span
                    aria-hidden
                    initial={prefersReducedMotion ? false : { scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.85,
                      delay: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="absolute inset-x-0 bottom-[0.08em] z-0 h-[0.09em] origin-left bg-maroon/45"
                  />
                </span>{' '}
                your life.
              </motion.h1>

              <motion.p
                variants={item}
                className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-bone/55"
              >
                Show up three times a week. We handle the programming, the
                coaching, and the room that makes it stick.
              </motion.p>

              <motion.div variants={item} className="mt-10 flex flex-wrap gap-3.5">
                <Link href="#pricing" className="btn-primary">
                  Join now
                  <ArrowIcon className="text-base" />
                </Link>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="btn-ghost"
                >
                  <span className="relative grid h-6 w-6 place-items-center rounded-full bg-maroon text-void">
                    <PlayIcon className="ml-[1px] text-[0.6rem]" />
                    {!prefersReducedMotion && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-maroon animate-pulse-ring"
                      />
                    )}
                  </span>
                  Watch video
                </button>
              </motion.div>

              {/* Ratings: avatars are initials on tinted chips — honest about
                  being placeholders rather than faking stock headshots. */}
              <motion.div
                variants={item}
                className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-4"
              >
                <ul className="flex -space-x-2.5">
                  {['AR', 'MK', 'JT', 'DP'].map((initials, i) => (
                    <li
                      key={initials}
                      className="grid h-9 w-9 place-items-center rounded-full border-2 border-void font-mono text-[0.6rem] font-bold tracking-tight text-void"
                      style={{
                        // Rose steps down the maroon hue. Lightness stays high
                        // enough that the void initials clear AA on every chip.
                        background: `hsl(352 ${78 - i * 8}% ${76 - i * 4}%)`,
                        zIndex: 4 - i,
                      }}
                    >
                      {initials}
                    </li>
                  ))}
                </ul>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span aria-hidden className="flex gap-0.5 text-sm text-maroon">
                      {Array.from({ length: 5 }, (_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </span>
                    <span className="font-mono text-xs font-bold text-bone">
                      4.9
                    </span>
                  </div>
                  <p className="mt-1 text-[0.8rem] text-bone/45">
                    From 2,180 member reviews
                  </p>
                </div>
              </motion.div>

              <motion.dl
                variants={item}
                className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-bone/10 pt-7"
              >
                {STATS.map((stat) => (
                  <div key={stat.label}>
                    <dd className="font-mono text-2xl font-bold tracking-tight text-bone">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-bone/40">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </motion.dl>
            </motion.div>

            {/* ---- Right: the footage itself, in a tall arch ---- */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.05, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="relative mx-auto aspect-[4/5] w-full max-w-[30rem] overflow-hidden rounded-[14rem_14rem_1.5rem_1.5rem] border border-bone/10 lg:aspect-[3/4]">
                <AmbientVideo
                  name="strength"
                  eager
                  alt="A member training on the leg press in the Fitmaxim strength hall"
                  objectPosition="58% 42%"
                  className="h-full w-full"
                />
                {/* Bottom scrim so the floating pass card stays readable. */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/85 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 rounded-[14rem_14rem_1.5rem_1.5rem] ring-1 ring-inset ring-maroon/10" />
              </div>

              {/* Floating trial pass — glass, overlapping the arch corner. */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                className="glass absolute -left-2 bottom-6 w-[15rem] rounded-2xl p-5 sm:-left-6 lg:-left-10"
              >
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-maroon">
                  Open this week
                </p>
                <p className="mt-2.5 font-display text-xl font-black uppercase leading-[0.95] tracking-crush text-bone">
                  7-day trial pass
                </p>
                <p className="mt-2 text-[0.8rem] leading-relaxed text-bone/50">
                  Full floor, one coached session. No card required.
                </p>
                <Link
                  href="#pricing"
                  className="mt-4 inline-flex items-center gap-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.14em] text-maroon transition-colors hover:text-bone focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                >
                  Claim pass
                  <ArrowIcon className="text-sm" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </ParallaxLayer>

        {/* ---- Vertical social rail ---- */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.9 }}
          className="absolute left-[max(1.25rem,calc((100vw-84rem)/2+1rem))] top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-5 xl:flex"
        >
          <span aria-hidden className="h-14 w-px bg-gradient-to-b from-transparent to-bone/20" />
          {SOCIALS.map(({ name, href, Icon }) => (
            <li key={name}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                className="block text-base text-bone/35 transition-colors duration-300 hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
              >
                <Icon />
                <span className="sr-only">Fitmaxim on {name}</span>
              </a>
            </li>
          ))}
          <span aria-hidden className="h-14 w-px bg-gradient-to-t from-transparent to-bone/20" />
        </motion.ul>

        {/* ---- Scroll cue ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.9 }}
          className="absolute bottom-7 left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
        >
          <span className="font-mono text-[0.6rem] uppercase tracking-[0.28em] text-bone/30">
            Scroll
          </span>
          <span className="relative block h-12 w-px overflow-hidden bg-bone/15">
            <motion.span
              animate={prefersReducedMotion ? {} : { y: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 block h-1/2 bg-maroon"
            />
          </span>
        </motion.div>
      </ParallaxSection>

      <VideoModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        name="machines"
        title="Inside Fitmaxim — the strength floor"
      />
    </>
  );
}
