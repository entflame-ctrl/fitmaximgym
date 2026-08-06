import { Reveal } from './ParallaxSection';

export default function Contact() {
  return (
    <section
      id="contact"
      className="edge-fade relative overflow-hidden bg-ash-900 py-28 md:py-40"
    >
      <div
        aria-hidden
        className="absolute right-1/4 top-1/3 h-[28rem] w-[28rem] rounded-full bg-maroon/[0.06] blur-[140px]"
      />

      <div className="grain" />

      <div className="shell relative z-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="set-label mb-6 justify-center">Set 07 · Connect</p>
          <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[0.92] text-bone">
            Visit us in Tokha
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-bone/55">
            Drop by for a tour, ask about trial passes, or speak with one of the
            coaches. We're here seven days a week.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-[1fr_0.92fr] lg:gap-12">
          {/* Map embed */}
          <Reveal className="order-2 lg:order-1">
            <div className="glass overflow-hidden rounded-3xl">
              {/* `ftid` is the listing's own feature ID, so the pin lands on the
                  gym itself rather than on whatever Google guesses the address
                  string means. The `q` alongside it supplies the label text. */}
              <iframe
                src="https://maps.google.com/maps?q=Fit+Maxim+Nepal&ftid=0x39eb1fc4ef99e5a7:0x94b534c80e5bb20d&z=17&hl=en&output=embed"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Fit Maxim Nepal on the map — Tokha-03, Kathmandu"
                className="w-full"
              />
              {/* Some browsers and privacy extensions block third-party map
                  frames outright, which would leave a silent grey box. The
                  link keeps directions reachable when that happens. */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=Fit%20Maxim%20Nepal&query_place_id=0x39eb1fc4ef99e5a7:0x94b534c80e5bb20d"
                target="_blank"
                rel="noreferrer noopener"
                className="flex items-center justify-center gap-2 border-t border-bone/10 py-4 font-mono text-[0.7rem] font-bold uppercase tracking-[0.16em] text-bone/70 transition-colors hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-maroon"
              >
                Open in Google Maps
              </a>
            </div>
          </Reveal>

          {/* Contact details */}
          <div className="order-1 space-y-8 lg:order-2">
            <Reveal delay={0.1}>
              <div className="glass rounded-3xl p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                  Address
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-bone/70">
                  Tokha-03, Kathmandu 44608
                  <br />
                  Nepal
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="glass rounded-3xl p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                  Hours
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-bone/70">
                  Monday – Sunday
                  <br />
                  Open 24 hours
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="glass rounded-3xl p-8">
                <h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-maroon">
                  Get in touch
                </h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-bone/70">
                  <a
                    href="tel:+9779714181993"
                    className="transition-colors hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                  >
                    +977 9714181993
                  </a>
                  <br />
                  <a
                    href="mailto:hello@fitmaxim.com"
                    className="transition-colors hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                  >
                    hello@fitmaxim.com
                  </a>
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
