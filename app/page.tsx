import Link from 'next/link';
import Hero from '@/components/Hero';
import Testimonials from '@/components/Testimonials';
import CommunityCta from '@/components/CommunityCta';
import Contact from '@/components/Contact';
import AmbientVideo from '@/components/AmbientVideo';
import { Wordmark } from '@/components/Navbar';
import {
  ParallaxSection,
  ParallaxLayer,
  Reveal,
} from '@/components/ParallaxSection';
import {
  ArrowIcon,
  CheckIcon,
  DumbbellIcon,
  PulseIcon,
  ShieldIcon,
  WhistleIcon,
  SOCIALS,
} from '@/components/icons';

/* A real week, not abstract "habits" — each card is a slot you can book. */
const HABITS = [
  {
    day: 'Mon / Wed / Fri',
    title: 'Lift heavy',
    body: 'Two lower, one upper. Progressive overload tracked against last week.',
    media: 'strength' as const,
    alt: 'A member pressing on the leg press machine',
    span: 'sm:col-span-3 sm:row-span-2',
    objectPosition: '55% 45%',
  },
  {
    day: 'Tue / Thu',
    title: 'Move together',
    body: 'Dance, conditioning, mobility. 45 minutes, no equipment to set up.',
    media: 'classes' as const,
    alt: 'A group dance class in the studio',
    span: 'sm:col-span-2',
    objectPosition: '50% 40%',
  },
  {
    day: 'Saturday',
    title: 'Push the machines',
    body: 'Plate-loaded work at your own pace. Coaches on the floor if you want eyes on your form.',
    media: 'machines' as const,
    alt: 'A member using a plate-loaded row machine',
    span: 'sm:col-span-2',
    objectPosition: '50% 45%',
  },
];

const REASONS = [
  {
    Icon: DumbbellIcon,
    title: 'Modern equipment',
    body: 'Calibrated plates, four competition platforms, and a plate-loaded line serviced every Monday.',
  },
  {
    Icon: WhistleIcon,
    title: 'Qualified trainers',
    body: 'Every coach is accredited in strength and conditioning, with nine years on the floor on average.',
  },
  {
    Icon: PulseIcon,
    title: 'Variety of classes',
    body: 'Fifty-two classes a week across strength, dance, conditioning, and mobility. Book from your phone.',
  },
  {
    Icon: ShieldIcon,
    title: 'Clean and safe',
    body: 'Deep-cleaned nightly, restocked hourly, and staffed around the clock. Same standard at 4am as at 6pm.',
  },
];

const PLANS = [
  {
    name: 'Basic',
    price: 4990,
    tagline: 'Full floor access, on your schedule.',
    features: [
      'Unlimited gym floor access',
      'Locker and towel service',
      'Workout tracking app',
      'Two guest passes a year',
    ],
    featured: false,
  },
  {
    name: 'Pro',
    price: 9990,
    tagline: 'Coaching and programming that adapts.',
    features: [
      'Everything in Basic',
      'All 52 weekly classes',
      'Quarterly movement assessment',
      'Personalized training blocks',
      'Recovery suite and sauna',
    ],
    featured: true,
  },
  {
    name: 'Elite',
    price: 18990,
    tagline: 'One-to-one, built entirely around you.',
    features: [
      'Everything in Pro',
      'Weekly 1-on-1 coaching',
      'Nutrition protocol and reviews',
      'Body composition scans',
      'Priority peak-hour booking',
    ],
    featured: false,
  },
];

const FOOTER_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#habits' },
  { label: 'About', href: '#why' },
  { label: 'Contact', href: '#contact' },
];

const MARQUEE = [
  'Squat',
  'Bench',
  'Deadlift',
  'Press',
  'Row',
  'Carry',
  'Sprint',
  'Recover',
];

export default function Page() {
  return (
    <>
      <Hero />

      {/* ---------- Marquee: the movements, running like a warm-up ---------- */}
      <div className="relative overflow-hidden border-y border-bone/[0.07] bg-ash-900 py-5">
        <div className="flex w-max animate-marquee">
          {/* Duplicated once so the -50% translate loops seamlessly. */}
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {MARQUEE.map((word) => (
                <li
                  key={word}
                  className="flex items-center gap-8 px-8 font-display text-lg font-black uppercase tracking-crush text-bone/25"
                >
                  {word}
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-maroon/60" />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {/* ---------- SET 02 · HABITS ---------- */}
      <ParallaxSection
        id="habits"
        intensity={14}
        className="edge-fade bg-ash-900 py-28 md:py-40"
      >
        <ParallaxLayer speed={0.4} fill>
          <div className="absolute left-1/3 top-0 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-maroon/[0.055] blur-[150px]" />
        </ParallaxLayer>

        <ParallaxLayer speed={1} className="relative z-30">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div className="lg:sticky lg:top-28 lg:self-start">
                <Reveal>
                  <p className="set-label mb-6">Set 02 · The week</p>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[0.92] text-bone">
                    Build daily habits
                    <br />
                    for better health
                  </h2>
                </Reveal>
                <Reveal delay={0.16}>
                  <p className="mt-7 max-w-md text-[1.05rem] leading-relaxed text-bone/55">
                    Consistency beats intensity. Your week comes pre-built, so
                    the only decision left is turning up.
                  </p>
                </Reveal>
                <Reveal delay={0.24}>
                  <Link href="#pricing" className="btn-primary mt-9">
                    Start this week
                    <ArrowIcon className="text-base" />
                  </Link>
                </Reveal>
              </div>

              {/* Asymmetric card mosaic: the lifting card gets double height,
                  because that is where most of the week actually goes. */}
              <ul className="grid gap-5 sm:grid-cols-5 sm:grid-rows-[repeat(2,minmax(0,1fr))]">
                {HABITS.map((habit, i) => (
                  <li key={habit.title} className={habit.span}>
                    <Reveal delay={i * 0.1} className="h-full">
                      <article className="group relative h-full min-h-[15rem] overflow-hidden rounded-3xl border border-bone/[0.08] transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-maroon/25">
                        <AmbientVideo
                          name={habit.media}
                          alt={habit.alt}
                          objectPosition={habit.objectPosition}
                          className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/5" />

                        <div className="relative flex h-full flex-col justify-end p-6">
                          <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-maroon">
                            {habit.day}
                          </p>
                          <h3 className="mt-2.5 font-display text-2xl font-black uppercase leading-[0.95] tracking-crush text-bone">
                            {habit.title}
                          </h3>
                          <p className="mt-2.5 max-w-xs text-[0.85rem] leading-relaxed text-bone/60">
                            {habit.body}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ParallaxLayer>
      </ParallaxSection>
      {/* ---------- SET 03 · WHY CHOOSE US ---------- */}
      <ParallaxSection
        id="why"
        intensity={18}
        className="edge-fade bg-void py-28 md:py-40"
      >
        {/* Backdrop footage. Held at low opacity on a slow layer so the room
            reads as depth behind the checklist, never as a second subject
            competing with the arch. */}
        <ParallaxLayer speed={0.3} fill>
          <AmbientVideo
            name="strength"
            objectPosition="50% 40%"
            className="h-full w-full opacity-[0.3]"
          />
        </ParallaxLayer>

        {/* Darkest on the left, where the copy sits; thins out under the arch. */}
        <div
          aria-hidden
          className="absolute inset-0 z-[5] bg-gradient-to-r from-void via-void/85 to-void/70"
        />

        {/* Above the scrim: at 0.07 alpha the bloom disappears entirely if the
            scrim paints over it. */}
        <ParallaxLayer speed={0.45} fill className="z-[10]">
          <div className="absolute -right-32 top-1/4 h-[32rem] w-[32rem] rounded-full bg-maroon-mid/[0.07] blur-[150px]" />
        </ParallaxLayer>

        <ParallaxLayer speed={1} className="relative z-30">
          <div className="shell grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <Reveal>
                <p className="set-label mb-6">Set 03 · The room</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[0.92] text-bone">
                  Why choose
                  <br />
                  our gym
                </h2>
              </Reveal>

              <ul className="mt-12 space-y-px">
                {REASONS.map(({ Icon, title, body }, i) => (
                  <li key={title}>
                    <Reveal delay={i * 0.09}>
                      {/* Rows rather than cards: a checklist reads faster, and
                          the hairline rules keep the eye moving down. */}
                      <div className="group flex gap-5 border-t border-bone/[0.09] py-6 transition-colors duration-300 hover:border-maroon/30">
                        <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-maroon/25 bg-maroon/[0.07] text-lg text-maroon transition-colors duration-300 group-hover:bg-maroon group-hover:text-void">
                          <Icon />
                        </span>
                        <div>
                          <h3 className="font-display text-lg font-black uppercase tracking-crush text-bone">
                            {title}
                          </h3>
                          <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-bone/55">
                            {body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
            </div>

            <Reveal delay={0.15}>
              <div className="relative">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem_1.5rem_12rem_12rem] border border-bone/10">
                  <AmbientVideo
                    name="machines"
                    alt="A coach demonstrating form on a plate-loaded machine at Fitmaxim"
                    objectPosition="52% 45%"
                    className="h-full w-full"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent" />
                </div>

                {/* Floor-status card: the kind of number a member actually
                    checks before leaving the house. */}
                <div className="glass absolute -right-2 top-8 w-[13rem] rounded-2xl p-5 sm:-right-5">
                  <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-maroon">
                    Floor right now
                  </p>
                  <p className="mt-2.5 font-mono text-3xl font-bold tracking-tight text-bone">
                    38%
                  </p>
                  <p className="mt-1.5 text-[0.78rem] leading-relaxed text-bone/50">
                    Quiet. No wait on platforms.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* ---------- SET 04 · TESTIMONIALS ---------- */}
      <Testimonials />
      {/* ---------- SET 05 · PRICING ---------- */}
      <ParallaxSection
        id="pricing"
        intensity={12}
        className="edge-fade bg-ash-900 py-28 md:py-40"
      >
        {/* Backdrop footage. The glass cards are translucent, so this scrim
            runs heavier than the one on #why — anything brighter and the
            feature lists start losing contrast against the frame. */}
        <ParallaxLayer speed={0.3} fill>
          <AmbientVideo
            name="classes"
            objectPosition="50% 45%"
            className="h-full w-full opacity-[0.26]"
          />
        </ParallaxLayer>

        <div aria-hidden className="absolute inset-0 z-[5] bg-ash-900/80" />
        <div
          aria-hidden
          className="absolute inset-0 z-[5] bg-gradient-to-b from-ash-900 via-transparent to-ash-900"
        />

        <ParallaxLayer speed={0.4} fill className="z-[10]">
          <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-maroon/[0.06] blur-[160px]" />
        </ParallaxLayer>

        <ParallaxLayer speed={1} className="relative z-30">
          <div className="shell">
            <div className="mx-auto max-w-2xl text-center">
              <Reveal>
                <p className="mx-auto mb-6 flex w-fit items-center gap-3 font-mono text-[0.7rem] uppercase tracking-[0.22em] text-maroon">
                  <span className="h-px w-8 bg-maroon/50" />
                  Set 05 · Commit
                  <span className="h-px w-8 bg-maroon/50" />
                </p>
              </Reveal>
              <Reveal delay={0.08}>
                <h2 className="text-[clamp(2rem,5vw,4rem)] leading-[0.92] text-bone">
                  Perfect plan for
                  <br />
                  your fitness goals
                </h2>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-7 text-[1.05rem] leading-relaxed text-bone/55">
                  No contracts and no joining fee. Change tier or cancel from
                  your account any month.
                </p>
              </Reveal>
            </div>

            <ul className="mt-16 grid items-start gap-6 lg:grid-cols-3">
              {PLANS.map((plan, i) => (
                <li
                  key={plan.name}
                  /* Stacked, the overhanging pill eats into the 24px grid gap
                     and crowds the card above. Side by side the gap is
                     horizontal, so the lift can take over. */
                  className={plan.featured ? 'mt-5 lg:-mt-7' : ''}
                >
                  <Reveal delay={i * 0.1}>
                    {/* The Pro card is the page's one deep-maroon field. Solid
                        #FF3B52 under dark type technically passes contrast but
                        vibrates — saturated red behind small text is tiring to
                        read. The deep fill carries the same "this one" weight
                        with light type sitting calmly on it, and the bright
                        ring keeps the accent present at the edge. */}
                    <article
                      className={`relative flex h-full flex-col rounded-3xl p-8 transition-all duration-500 ease-out hover:-translate-y-2 ${
                        plan.featured
                          ? 'bg-gradient-to-b from-maroon-blood to-maroon-deep text-bone shadow-maroon-lg ring-1 ring-maroon/45 lg:p-10'
                          : 'glass hover:border-maroon/25'
                      }`}
                    >
                      {plan.featured && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-maroon px-4 py-1.5 font-mono text-[0.6rem] font-bold uppercase tracking-[0.18em] text-void">
                          Most popular
                        </span>
                      )}

                      <h3
                        className={`font-display text-lg font-black uppercase tracking-crush ${
                          plan.featured ? 'text-bone' : 'text-bone'
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`mt-2 text-[0.88rem] leading-relaxed ${
                          plan.featured ? 'text-bone/75' : 'text-bone/50'
                        }`}
                      >
                        {plan.tagline}
                      </p>

                      <p className="mt-8 flex items-baseline gap-1.5">
                        <span
                          className={`font-mono text-sm font-bold ${
                            plan.featured ? 'text-bone/70' : 'text-bone/60'
                          }`}
                        >
                          NPR
                        </span>
                        <span
                          className={`font-mono text-5xl font-bold tracking-tighter ${
                            plan.featured ? 'text-bone' : 'text-bone'
                          }`}
                        >
                          {plan.price.toLocaleString('en-NP')}
                        </span>
                        <span
                          className={`font-mono text-sm ${
                            plan.featured ? 'text-bone/70' : 'text-bone/60'
                          }`}
                        >
                          /mo
                        </span>
                      </p>

                      <ul
                        className={`mt-8 flex-1 space-y-3.5 border-t pt-8 ${
                          plan.featured ? 'border-bone/20' : 'border-bone/[0.09]'
                        }`}
                      >
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className={`flex gap-3 text-[0.9rem] leading-snug ${
                              plan.featured ? 'text-bone/70' : 'text-bone/60'
                            }`}
                          >
                            <CheckIcon
                              className={`mt-[0.15em] text-sm ${
                                plan.featured ? 'text-maroon-bright' : 'text-maroon'
                              }`}
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <Link
                        href="#community"
                        className={`mt-9 flex items-center justify-center gap-2 rounded-full py-4 font-mono text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
                          plan.featured
                            ? 'bg-maroon text-void hover:bg-maroon-bright focus-visible:outline-bone'
                            : 'border border-bone/15 text-bone/85 hover:border-maroon/50 hover:text-maroon focus-visible:outline-maroon'
                        }`}
                      >
                        Join now
                        <ArrowIcon className="text-base" />
                      </Link>
                    </article>
                  </Reveal>
                </li>
              ))}
            </ul>

            <Reveal delay={0.3}>
              <p className="mt-10 text-center font-mono text-[0.72rem] uppercase tracking-[0.16em] text-bone/35">
                All plans include the 7-day trial. Cancel before it ends and you
                pay nothing.
              </p>
            </Reveal>
          </div>
        </ParallaxLayer>
      </ParallaxSection>

      {/* ---------- SET 06 · COMMUNITY ---------- */}
      <CommunityCta />

      <Contact />
      {/* ---------- FOOTER ---------- */}
      <footer className="border-t border-bone/[0.07] bg-ash-900">
        <div className="shell flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <Link
            href="#top"
            className="rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
          >
            <Wordmark />
            <span className="sr-only">Back to top</span>
          </Link>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-bone/50 transition-colors hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="flex gap-3">
            {SOCIALS.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="grid h-10 w-10 place-items-center rounded-full border border-bone/[0.12] text-sm text-bone/50 transition-colors duration-300 hover:border-maroon/50 hover:text-maroon focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
                >
                  <Icon />
                  <span className="sr-only">Fitmaxim on {name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-bone/[0.05]">
          <div className="shell flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone/30">
              © {new Date().getFullYear()} Fitmaxim · Tokha-03, Kathmandu, Nepal
            </p>
            <ul className="flex gap-6">
              {['Privacy', 'Terms'].map((label) => (
                <li key={label}>
                  <Link
                    href="#top"
                    className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-bone/30 transition-colors hover:text-bone/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-maroon"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}
