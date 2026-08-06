/**
 * Inline SVG icon set. Stroke-based and sized in `em` so every icon inherits
 * the surrounding font-size and colour — no icon dependency, no runtime cost.
 */
type IconProps = { className?: string };

const base = 'h-[1em] w-[1em] shrink-0';

export function PlayIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.3-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export function CheckIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <path d="m4 12.5 5.2 5.2L20 6.9" />
    </svg>
  );
}

export function StarIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M12 2.6l2.9 5.88 6.5.95-4.7 4.58 1.11 6.47L12 17.42 6.19 20.48 7.3 14.01 2.6 9.43l6.5-.95L12 2.6Z" />
    </svg>
  );
}

export function ArrowIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <path d="M5 12h14m-6-7 7 7-7 7" />
    </svg>
  );
}

export function CloseIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

/* --- Equipment / benefit glyphs, drawn to match the brief's four points --- */

export function DumbbellIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <path d="M2 9v6M5 7v10M19 7v10M22 9v6M8 12h8" />
      <rect x="5" y="7" width="3" height="10" rx="1" />
      <rect x="16" y="7" width="3" height="10" rx="1" />
    </svg>
  );
}

export function WhistleIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <circle cx="12" cy="7" r="3.4" />
      <path d="M12 10.4c-3.6.7-6.2 3.6-6.2 7.1V20h12.4v-2.5c0-3.5-2.6-6.4-6.2-7.1Z" />
    </svg>
  );
}

export function PulseIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <path d="M2 12.5h4l2.5-6 3.5 12 3-8 2 2h5" />
    </svg>
  );
}

export function ShieldIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <path d="M12 2.8l7.5 2.8v6c0 4.6-3.1 8.6-7.5 10-4.4-1.4-7.5-5.4-7.5-10v-6L12 2.8Z" />
      <path d="m8.8 12.2 2.2 2.2 4.2-4.4" />
    </svg>
  );
}

/* --- Social --- */

export function InstagramIcon({ className = '' }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      aria-hidden
      className={`${base} ${className}`}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.2 6.9h.01" strokeWidth={2.4} />
    </svg>
  );
}

export function XIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M17.5 3h3.2l-7 8 7.3 10h-5.6l-4.4-6-5 6H2.8l7.3-8.6L3 3h5.7l4 5.5L17.5 3Zm-1.1 16h1.8L7.5 4.9H5.6L16.4 19Z" />
    </svg>
  );
}

export function YouTubeIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.75-1.77C18.25 5 12 5 12 5s-6.25 0-7.85.43A2.5 2.5 0 0 0 2.4 7.2C2 8.82 2 12 2 12s0 3.18.4 4.8a2.5 2.5 0 0 0 1.75 1.77C5.75 19 12 19 12 19s6.25 0 7.85-.43a2.5 2.5 0 0 0 1.75-1.77C22 15.18 22 12 22 12s0-3.18-.4-4.8ZM10 15.2V8.8l5.4 3.2-5.4 3.2Z" />
    </svg>
  );
}

export function StravaIcon({ className = '' }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={`${base} ${className}`}>
      <path d="M9.8 2 4 13.4h3.4L9.8 8.7l2.4 4.7h3.4L9.8 2Zm5.9 11.4-1.7 3.3-1.7-3.3h-2.6L14 22l3.7-8.6h-2Z" />
    </svg>
  );
}

export const SOCIALS = [
  { name: 'Instagram', href: 'https://instagram.com', Icon: InstagramIcon },
  { name: 'X', href: 'https://x.com', Icon: XIcon },
  { name: 'YouTube', href: 'https://youtube.com', Icon: YouTubeIcon },
  { name: 'Strava', href: 'https://strava.com', Icon: StravaIcon },
] as const;
