import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Not pure black: a trace of red under the neutrals keeps the accent
        // from vibrating against the background the way it does on #000.
        void: '#080506',
        ash: {
          900: '#0C0708',
          800: '#150B0D',
          700: '#1E1012',
          600: '#2A171A',
          500: '#3A2126',
        },
        // #800000 is the brief's colour and anchors the ramp, but at 1.4:1 on
        // near-black it cannot carry text or a CTA. DEFAULT is lifted to a
        // luminous crimson (6.1:1 on void) for anything that must be read;
        // `blood` is the literal brief value, kept for fills and large type
        // where contrast is not load-bearing.
        maroon: {
          DEFAULT: '#FF3B52',
          bright: '#FF6376',
          mid: '#C41E36',
          blood: '#800000',
          deep: '#5C0A16',
        },
        bone: '#F6F1F2',
      },
      fontFamily: {
        display: ['var(--font-archivo)', 'Impact', 'sans-serif'],
        sans: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.045em',
        crush: '-0.06em',
      },
      maxWidth: {
        shell: '84rem',
      },
      boxShadow: {
        maroon: '0 20px 60px -18px rgba(255, 59, 82, 0.45)',
        'maroon-lg': '0 30px 90px -30px rgba(255, 59, 82, 0.55)',
      },
      backgroundImage: {
        'ash-fade': 'linear-gradient(180deg, #080506 0%, #150B0D 55%, #080506 100%)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.55' },
          '100%': { transform: 'scale(1.9)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
