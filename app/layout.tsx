import type { Metadata, Viewport } from 'next';
import { Archivo, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import { asset } from '@/lib/asset';
import './globals.css';

/* Display: Archivo carries a variable width axis, which is what lets the
   headlines sit wide and heavy without a condensed-caps cliché. */
const archivo = Archivo({
  subsets: ['latin'],
  display: 'swap',
  weight: ['700', '800', '900'],
  variable: '--font-archivo',
});

const interTight = Inter_Tight({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter-tight',
});

/* Mono is the utility voice: set labels, prices, stats, button text. */
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '700'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fitmaxim.com'),
  title: {
    default: 'Fitmaxim — Transform Your Body, Elevate Your Life',
    template: '%s | Fitmaxim',
  },
  description:
    'Fitmaxim is a premium strength and conditioning club. Modern equipment, qualified trainers, a full class timetable, and a floor that is spotless at 6am and 6pm.',
  keywords: [
    'gym',
    'strength training',
    'personal training',
    'fitness classes',
    'gym membership',
  ],
  openGraph: {
    title: 'Fitmaxim — Transform Your Body, Elevate Your Life',
    description:
      'Modern equipment, qualified trainers, and a room that expects your best. Seven-day trial pass, no card required.',
    type: 'website',
    siteName: 'Fitmaxim',
    locale: 'en_US',
    images: [
      {
        url: asset('/media/strength-poster.jpg'),
        width: 1280,
        height: 720,
        alt: 'A member training on the leg press at Fitmaxim',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fitmaxim — Transform Your Body, Elevate Your Life',
    description: 'Modern equipment, qualified trainers, zero contracts.',
    images: [asset('/media/strength-poster.jpg')],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#080506',
  colorScheme: 'dark',
};

/* Structured data helps the club surface correctly in local search. */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: 'Fitmaxim',
  description:
    'Premium strength and conditioning club with modern equipment, qualified trainers, and a full class timetable.',
  url: 'https://fitmaxim.com',
  telephone: '+977 9714181993',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Tokha-03',
    addressLocality: 'Kathmandu',
    addressRegion: 'Bagmati',
    postalCode: '44608',
    addressCountry: 'NP',
  },
  /* Coordinates from the club's own Google Business listing, so local search
     resolves the pin to the storefront rather than the postcode centroid. */
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 27.7535669,
    longitude: 85.325077,
  },
  hasMap:
    'https://www.google.com/maps/search/?api=1&query=Fit%20Maxim%20Nepal&query_place_id=0x39eb1fc4ef99e5a7:0x94b534c80e5bb20d',
  openingHours: 'Mo-Su 00:00-23:59',
  priceRange: 'NPR 4990-18990',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${interTight.variable} ${jetbrains.variable}`}
    >
      <body className="bg-void font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-maroon focus:px-6 focus:py-3 focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-void"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">{children}</main>
        <script
          type="application/ld+json"
          // Serialized from a local literal — no user input reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
