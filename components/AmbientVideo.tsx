'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { asset } from '@/lib/asset';

/**
 * Ambient background video.
 *
 * Bytes are deliberately deferred: `preload="none"` plus sources that are not
 * mounted until an IntersectionObserver says the element is near the viewport.
 * Until then the poster carries the frame, so a visitor who never scrolls to a
 * section never downloads its clip.
 *
 * Playback is also tied to visibility — offscreen clips are paused so we are
 * never decoding video the visitor cannot see.
 */
export type AmbientVideoProps = {
  /** Basename in /public/media, e.g. 'strength' → strength-1280.mp4 */
  name: string;
  /** Describes the footage for assistive tech. Omit only for pure decoration. */
  alt?: string;
  className?: string;
  /** CSS object-position, e.g. '50% 30%' to favour a subject's upper body. */
  objectPosition?: string;
  /** Extra filter applied to the video only (not the poster). */
  filter?: string;
  /** Skip the observer and load immediately — use for above-the-fold clips. */
  eager?: boolean;
};

export default function AmbientVideo({
  name,
  alt = '',
  className = '',
  objectPosition = '50% 50%',
  filter,
  eager = false,
}: AmbientVideoProps) {
  const prefersReducedMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(eager);
  const [ready, setReady] = useState(false);

  const poster = asset(`/media/${name}-poster.jpg`);

  useEffect(() => {
    if (prefersReducedMotion || active) return;
    const node = wrapRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      // Start fetching a little before the section arrives so the first frame
      // is decoded by the time it is actually on screen.
      { rootMargin: '300px 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [prefersReducedMotion, active]);

  // Pause while offscreen. Separate from the load observer above, which fires
  // once and disconnects.
  useEffect(() => {
    if (!active || prefersReducedMotion) return;
    const node = wrapRef.current;
    const video = videoRef.current;
    if (!node || !video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() rejects if the browser declines autoplay; nothing to do but
          // leave the poster visible.
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [active, prefersReducedMotion]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      {/* Poster sits underneath and cross-fades out once the video paints,
          so there is never a flash of empty box. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={poster}
        alt={alt}
        aria-hidden={alt ? undefined : true}
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
        style={{ objectPosition, opacity: ready ? 0 : 1 }}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />

      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay={eager}
          preload="none"
          poster={poster}
          aria-hidden
          tabIndex={-1}
          onCanPlay={() => setReady(true)}
          className="relative h-full w-full object-cover transition-opacity duration-700"
          style={{ objectPosition, filter, opacity: ready ? 1 : 0 }}
        >
          {active && (
            <>
              <source
                media="(max-width: 768px)"
                src={asset(`/media/${name}-720.webm`)}
                type="video/webm"
              />
              <source
                media="(max-width: 768px)"
                src={asset(`/media/${name}-720.mp4`)}
                type="video/mp4"
              />
              <source src={asset(`/media/${name}-1280.webm`)} type="video/webm" />
              <source src={asset(`/media/${name}-1280.mp4`)} type="video/mp4" />
            </>
          )}
        </video>
      )}
    </div>
  );
}
