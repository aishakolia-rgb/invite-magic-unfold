import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  Clock,
  Coffee,
  Gift,
  Heart,
  Landmark,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

import floral from "@/assets/floral-corner.png";
import seal from "@/assets/wax-seal.png";
import venue from "@/assets/venue-illustration.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aishah & Ibrahim — Digital Wedding Invitation" },
      {
        name: "description",
        content:
          "Tap to open your invitation to the Nikkah of Aishah & Ibrahim — 18 October 2026, Pinelands Islamic Centre, followed by high tea at Café 51.",
      },
      { property: "og:title", content: "Aishah & Ibrahim — Our Forever Begins" },
      {
        property: "og:description",
        content: "An invitation to our Nikkah, 18 October 2026 in Pinelands.",
      },
    ],
  }),
  component: Invitation,
});

const GUEST = {
  name: "Mr & Mrs Ahmed Khan",
  guests: 2,
  invitationNo: "AI-027",
  rsvpBy: "01 October 2026",
};

function Petals() {
  const petals = Array.from({ length: 14 });
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden="true">
      {petals.map((_, i) => (
        <span
          key={i}
          className="animate-petal-fall absolute block rounded-full bg-accent/50"
          style={{
            left: `${(i * 7.3 + 3) % 100}%`,
            width: `${5 + (i % 4) * 3}px`,
            height: `${7 + (i % 3) * 4}px`,
            animationDuration: `${11 + (i % 5) * 3.5}s`,
            animationDelay: `${i * 1.4}s`,
          }}
        />
      ))}
    </div>
  );
}

function Ornament({ label }: { label?: string }) {
  return (
    <div className="rule-ornament my-6">
      {label ? (
        <span className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
          {label}
        </span>
      ) : (
        <Heart className="size-3 fill-accent stroke-none" />
      )}
    </div>
  );
}

function Envelope({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(onOpen, 2100);
  };

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5">
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="animate-float-soft pointer-events-none absolute -left-24 -top-20 w-72 opacity-60 sm:w-96"
      />
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        width={1024}
        height={1024}
        className="animate-float-soft pointer-events-none absolute -bottom-24 -right-24 w-72 rotate-180 opacity-50 sm:w-96"
      />

      <p className="tracking-invite animate-veil-in mb-10 text-center text-[0.65rem] uppercase text-muted-foreground">
         {"\n"}
      </p>

      <button
        type="button"
        onClick={open}
        aria-label="Tap to open your invitation"
        className="group relative w-full max-w-md focus:outline-none"
        style={{ perspective: "1400px" }}
      >
        <div className="relative aspect-[5/6.6] w-full">
          {/* letter sliding out */}
          <div
            className={`paper absolute inset-x-5 bottom-6 top-16 z-10 origin-bottom rounded-sm border border-border/70 px-6 py-10 text-center ${
              opening ? "animate-letter-rise" : "translate-y-[10%] opacity-0"
            }`}
          >
            <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
              Together with our families
            </p>
            <p className="script-name mt-4 text-5xl">Aishah &amp; Ibrahim</p>
            <Ornament />
            <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
              18 · 10 · 2026
            </p>
          </div>

          {/* envelope body */}
          <div className="absolute inset-0 z-20 rounded-sm bg-envelope shadow-envelope">
            <div className="absolute inset-0 rounded-sm bg-[radial-gradient(circle_at_30%_20%,oklch(1_0_0/0.55),transparent_60%)]" />
            <div className="absolute inset-x-0 bottom-0 top-1/2">
              <div className="absolute inset-0 bg-envelope-flap/60 [clip-path:polygon(0_100%,50%_18%,100%_100%)]" />
            </div>

            <div className="absolute inset-x-8 top-[46%] z-30 text-center">
              <p className="font-display text-3xl tracking-[0.35em] text-primary">A / I</p>
              <p className="script-name mt-3 text-4xl leading-[1.15]">Mr &amp; Mrs</p>
              <p className="script-name text-4xl leading-[1.15]">Ahmed Khan</p>
              <p className="font-display mt-4 text-sm italic leading-6 text-primary/75">
                you are warmly invited to share in the beginning of our forever.
              </p>
            </div>


            <div className="absolute inset-x-0 bottom-6 z-30 text-center">
              <p className="tracking-invite text-[0.6rem] uppercase text-primary/70">
                Please open
              </p>
              <p className="tracking-invite text-[0.6rem] uppercase text-primary/70">
                your invitation
              </p>
            </div>
          </div>

          {/* top flap */}
          <div
            className={`absolute inset-x-0 top-0 z-30 h-1/2 origin-top ${
              opening ? "animate-flap-open" : "transition-transform duration-700 group-hover:[transform:rotateX(-14deg)]"
            }`}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-envelope-flap [clip-path:polygon(0_0,100%_0,50%_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(1_0_0/0.5),transparent)] [clip-path:polygon(0_0,100%_0,50%_100%)]" />
          </div>

          {/* wax seal */}
          <img
            src={seal}
            alt=""
            aria-hidden="true"
            width={816}
            height={816}
            className={`absolute left-1/2 top-[82%] z-40 w-24 -translate-x-1/2 -translate-y-1/2 drop-shadow-md ${
              opening ? "animate-seal-break" : "transition-transform duration-500 group-hover:scale-105"
            }`}
          />
        </div>
      </button>

      <p className="tracking-invite mt-10 animate-pulse text-[0.6rem] uppercase text-muted-foreground">
        {opening ? "Opening…" : "Tap the seal to open"}
      </p>
    </section>
  );
}

function MainInvitation() {
  return (
    <article className="paper animate-veil-in relative overflow-hidden rounded-sm border border-border/70">
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -left-16 -top-12 w-48 opacity-70 sm:w-64"
      />
      <div className="relative grid gap-8 px-6 py-14 sm:px-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
        <div className="text-center">
          <p className="arabic-calligraphy text-3xl text-primary/80 sm:text-4xl" dir="rtl">
            بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْم
          </p>
          <Ornament />
          <p className="tracking-invite text-[0.6rem] uppercase leading-6 text-muted-foreground">
            WITH GRATEFUL HEARTS AND THE BLESSINGS OF OUR FAMILIES, WE REQUEST THE HONOUR OF YOUR PRESENCE AS WE CELEBATE THE NIKAAH OF AISHA AND IBRAHEEM&nbsp;
          </p>
          <h1 className="script-name mt-6 text-6xl sm:text-7xl">Aisha</h1>
          <p className="font-display text-xl text-accent">&amp;</p>
          <p className="script-name text-6xl sm:text-7xl">Ibraheem</p>
          <p className="tracking-invite mt-5 text-[0.65rem] uppercase text-primary/80">
            OUR FOREVER BEGINS TODAY
          </p>

          <Ornament />

          <div className="mx-auto grid max-w-md grid-cols-2 gap-6 text-center">
            <div>
              <Landmark
                className="mx-auto mb-3 size-7 stroke-primary/80"
                strokeWidth={1}
                aria-hidden="true"
              />
              <p className="tracking-invite text-[0.6rem] uppercase text-primary">
                Nikkah Ceremony
              </p>
              <p className="mt-3 font-display text-sm leading-6 text-muted-foreground">
                Sunday, 18 October 2026
                <br />
                <span className="text-foreground">9:00 AM</span>
                <br />
                Pinelands Islamic Centre
                <br />
                Nursery Way, Pinelands
                <br />
                Please join us as we begin this beautiful journey.
              </p>
            </div>
            <div className="border-l border-border/70">
              <Coffee
                className="mx-auto mb-3 size-7 stroke-primary/80"
                strokeWidth={1}
                aria-hidden="true"
              />
              <p className="tracking-invite text-[0.6rem] uppercase text-primary">
                Wedding High Tea
              </p>
              <p className="mt-3 font-display text-sm leading-6 text-muted-foreground">
                Sunday, 18 October 2026
                <br />
                <span className="text-foreground">4:00 PM (Guests arrive)</span>
                <br />
                High Tea at 4:30 PM
                <br />
                Café 51
                <br />
                51 Roodebloem Road, Woodstock
              </p>
            </div>
          </div>

          <blockquote className="mx-auto mt-10 max-w-md border border-border/70 px-6 py-5">
            <p
              className="arabic-calligraphy mb-4 text-lg text-primary/80 sm:text-xl"
              dir="rtl"
            >
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
            </p>
            <p className="font-display text-sm italic leading-6 text-muted-foreground">
              “And among His signs is that He created for you spouses from among
              yourselves, that you may find tranquility in them, and He placed
              between you affection and mercy.”
            </p>
            <footer className="tracking-invite mt-3 text-[0.55rem] uppercase text-primary/70">
              Surah Ar-Rum (30:21)
            </footer>
          </blockquote>
        </div>

        <img
          src={venue}
          alt="Watercolour illustration of the courtyard venue with arched windows and olive trees"
          loading="lazy"
          width={1536}
          height={1024}
          className="mx-auto w-full max-w-md mix-blend-multiply"
        />
      </div>
    </article>
  );
}

function PersonalCard() {
  return (
    <article className="paper animate-veil-in relative overflow-hidden rounded-sm border border-border/70 px-6 py-14 text-center sm:px-12">
      <img
        src={floral}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="pointer-events-none absolute -right-14 -top-14 w-52 -scale-x-100 opacity-70"
      />
      <div className="relative mx-auto max-w-sm">
        <p className="font-display text-4xl tracking-[0.35em] text-primary">A / I</p>
        <Ornament />
        <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
          Reserved for
        </p>
        <p className="script-name mt-3 text-5xl">{GUEST.name}</p>
        <Ornament />
        <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
          Guests reserved
        </p>
        <p className="font-display text-4xl text-primary">{GUEST.guests}</p>
        <Ornament />
        <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
          YOUR PRESENCE WOULD BE A CHERISHED BLESSING
          <br />
          AS WE BEGIN THIS NEW CHAPTER TOGETHER.
          <br />
          KINDLY RSVP BY
        </p>
        <p className="mt-2 font-display text-lg text-foreground">{GUEST.rsvpBy}</p>
        <p className="tracking-invite mt-10 text-[0.55rem] uppercase text-muted-foreground">
          RSVP - QUANITAH 082 575 3753
        </p>
      </div>
    </article>
  );
}

const guideItems = [
  { icon: Mail, title: "RSVP", copy: "Respond with one tap" },
  { icon: MapPin, title: "Venue Locations", copy: "Directions to both venues" },
  { icon: Clock, title: "Event Timeline", copy: "Nikkah & high tea schedule" },
  { icon: Gift, title: "A Note of Gratitude", copy: "Gift & contribution details" },
  { icon: Phone, title: "Contact Information", copy: "Get in touch with us" },
];

function CelebrationGuide() {
  return (
    <article className="paper animate-veil-in relative overflow-hidden rounded-sm border border-border/70 px-6 py-14 sm:px-12">
      <p className="tracking-invite text-center text-[0.6rem] uppercase text-muted-foreground">
        Celebration Guide
      </p>
      <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-5">
        {guideItems.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-background/70 transition-transform duration-300 hover:scale-105">
              <Icon className="size-5 stroke-primary" strokeWidth={1.25} />
            </span>
            <p className="tracking-invite mt-4 text-[0.55rem] uppercase text-primary">
              {title}
            </p>
            <p className="mt-2 font-display text-xs text-muted-foreground">{copy}</p>
          </div>
        ))}
      </div>
      <p className="script-name mt-14 text-center text-4xl leading-tight">
        Your presence and duas mean the world to us.
      </p>
    </article>
  );
}

function Gratitude() {
  return (
    <article className="paper animate-veil-in relative overflow-hidden rounded-sm border border-border/70 px-6 py-14 text-center sm:px-12">
      <h2 className="tracking-invite text-[0.65rem] uppercase text-primary">
        A note of gratitude
      </h2>
      <Ornament />
      <p className="mx-auto max-w-md font-display text-base italic leading-7 text-muted-foreground">
        Your presence and sincere duas are the greatest gift we could receive.
        Should you wish to bless us with a wedding gift, a contribution towards
        our future together would be sincerely appreciated.
      </p>
      <div className="mx-auto mt-10 max-w-xs border-t border-border/70 pt-6 text-center">
        <p className="tracking-invite text-[0.55rem] uppercase text-primary">
          Banking details
        </p>
        <p className="mt-3 font-display text-sm leading-6 text-muted-foreground">
          A &amp; I Future Fund
          <br />
          Standard Bank · 10 28 635 702 8
          <br />
          Branch code 7654
          <br />
          Type Savings
          <br />
          Ref: AI-FutureFund
        </p>
      </div>
      <p className="script-name mt-10 text-4xl">Jazakallahu Khairan</p>
    </article>
  );
}

function Invitation() {
  const [opened, setOpened] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened) letterRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [opened]);

  return (
    <main className="relative min-h-screen bg-background">
      <Petals />

      {!opened && <Envelope onOpen={() => setOpened(true)} />}

      {opened && (
        <div ref={letterRef} className="relative mx-auto max-w-5xl px-4 py-16 sm:px-8">
          <header className="text-center">
            <p className="font-display text-3xl tracking-[0.35em] text-primary">A / I</p>
            <h1 className="script-name mt-6 text-5xl sm:text-6xl">
              Aisha &amp; Ibraheem
            </h1>
            <p className="tracking-invite mt-4 text-[0.6rem] uppercase text-muted-foreground">
              DIGITAL WEDDING INVITATION
            </p>
            <Ornament label="18 · 10 · 2026" />
          </header>

          <div className="mt-8 space-y-10">
            <MainInvitation />
            <PersonalCard />
            <CelebrationGuide />
            <Gratitude />
          </div>

          <footer className="tracking-invite mt-16 text-center text-[0.6rem] uppercase leading-6 text-muted-foreground">
            May Allah bless our union, fill our home with barakah and love,
            <br />
            and make us a source of peace for one another.
          </footer>

          <div className="mt-10 flex justify-center gap-3">
            <a
              href="#"
              className="tracking-invite inline-flex items-center gap-2 border border-primary/40 bg-primary px-6 py-3 text-[0.6rem] uppercase text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Heart className="size-3 fill-current stroke-none" /> RSVP
            </a>
            <button
              type="button"
              onClick={() => setOpened(false)}
              className="tracking-invite inline-flex items-center gap-2 border border-border px-6 py-3 text-[0.6rem] uppercase text-primary transition-colors hover:bg-secondary/60"
            >
              <Calendar className="size-3" /> Close envelope
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
