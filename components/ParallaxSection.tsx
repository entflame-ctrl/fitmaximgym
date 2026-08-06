'use client';

import {
  createContext,
  useContext,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';

/**
 * Parallax engine
 * ---------------
 * One `useScroll` observer per section (scoped to the section's own ref) rather
 * than a single global scrollY. That keeps each layer's math independent of page
 * length, so adding or reordering sections never re-tunes the effect.
 *
 * Everything below is driven by MotionValues, which write straight to the
 * compositor. No React state is touched during scroll, so a full page of layers
 * costs zero re-renders.
 */

type ParallaxContextValue = {
  /** 0 → 1 as the section travels from just-below the viewport to just-above it. */
  progress: MotionValue<number>;
  /** Global amplitude multiplier, in % of layer height. */
  intensity: number;
};

const ParallaxContext = createContext<ParallaxContextValue | null>(null);

function useParallaxContext(component: string) {
  const ctx = useContext(ParallaxContext);
  if (!ctx) {
    throw new Error(`<${component}> must be rendered inside a <ParallaxSection>.`);
  }
  return ctx;
}

/**
 * Tight, non-floaty smoothing. High damping relative to stiffness keeps the
 * layer glued to the scroll position instead of oscillating past it, which is
 * what turns raw scroll deltas (jittery on trackpads and smooth-scroll mice)
 * into continuous motion.
 */
const SPRING = { stiffness: 140, damping: 32, mass: 0.28, restDelta: 0.001 };

/** speed 1 = moves with the page. < 1 lags behind. > 1 outruns it. */
function amplitudeFor(speed: number, intensity: number) {
  return (1 - speed) * intensity;
}

type ParallaxSectionProps = {
  children: ReactNode;
  className?: string;
  /** Amplitude in % of layer height at speed 0. Larger = more dramatic depth. */
  intensity?: number;
  as?: ElementType;
  id?: string;
};

export function ParallaxSection({
  children,
  className = '',
  intensity = 22,
  as: Tag = 'section',
  id,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    // Full pass: section's top hits the viewport bottom → section's bottom hits
    // the viewport top. Guarantees progress spans 0→1 for any section height.
    offset: ['start end', 'end start'],
  });

  return (
    <ParallaxContext.Provider value={{ progress: scrollYProgress, intensity }}>
      {/* isolate: creates a stacking context so layer z-indexes stay section-local. */}
      <Tag
        ref={ref}
        id={id}
        className={`relative isolate overflow-hidden ${className}`}
      >
        {children}
      </Tag>
    </ParallaxContext.Provider>
  );
}

type ParallaxLayerProps = {
  children: ReactNode;
  /** 0.3 = background, 0.6 = midground, 1 = foreground (no transform). */
  speed?: number;
  /**
   * `fill` absolutely positions the layer and over-sizes it by exactly the
   * distance it will travel, so a slow layer can never expose an edge.
   */
  fill?: boolean;
  className?: string;
  style?: CSSProperties;
  /** Disable spring smoothing for layers that should track scroll 1:1. */
  raw?: boolean;
};

export function ParallaxLayer({
  children,
  speed = 1,
  fill = false,
  className = '',
  style,
  raw = false,
}: ParallaxLayerProps) {
  const { progress, intensity } = useParallaxContext('ParallaxLayer');
  const prefersReducedMotion = useReducedMotion();

  const amplitude = amplitudeFor(speed, intensity);

  // Keep the spring on plain numbers. Handing it a unit string ("-14%") makes it
  // parse the number, discard the unit, and then sit at that first value forever —
  // the layer renders a static translateY(-14px) and never tracks scroll again.
  // Units are re-attached in a final transform, after the smoothing.
  const rawPercent = useTransform(progress, [0, 1], [-amplitude, amplitude]);
  const smoothPercent = useSpring(rawPercent, SPRING);
  const y = useTransform(raw ? rawPercent : smoothPercent, (v) => `${v}%`);

  // Over-size by the full travel distance (2 × amplitude) plus a 1% safety margin.
  const overscale = 100 + Math.abs(amplitude) * 2 + 1;

  const fillStyle: CSSProperties = fill
    ? {
        position: 'absolute',
        left: 0,
        right: 0,
        height: `${overscale}%`,
        top: `${-(overscale - 100) / 2}%`,
      }
    : {};

  return (
    <motion.div
      aria-hidden={fill || undefined}
      className={`${fill ? 'gpu' : ''} ${className}`}
      style={{
        ...fillStyle,
        ...style,
        // A zero-amplitude layer gets no transform at all — nothing to composite.
        ...(prefersReducedMotion || amplitude === 0 ? {} : { y }),
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Content that lifts and fades as it enters the viewport. Uses `whileInView`
 * with `once` so it fires a single time and then stops observing.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default ParallaxSection;
