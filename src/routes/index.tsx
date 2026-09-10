import { createFileRoute } from "@tanstack/react-router";
import { type FormEvent, useEffect, useRef, useState } from "react";
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

// ---------------------------------------------------------------------------
// Guest list
//
// Add every invited name (or household) here along with how many people
// they're allowed to bring (including themselves). `aliases` are optional
// alternate spellings that should also be accepted — matching ignores case,
// punctuation and "&" vs "and", so you don't need an alias for every casing.
// ---------------------------------------------------------------------------

type Guest = {
  name: string;
  aliases?: string[];
  allowedGuests: number;
  rsvpBy?: string;
  invitationNo?: string;
};

const RSVP_DEFAULT_DATE = "25 September 2026";

const GUEST_LIST: Guest[] = [
  // {
  //   name : "John Doe",
  //   allowedGuests: 0,
  // },
  {
    name: "Zaahidah Sampson",
    allowedGuests: 1,
  },
  {
    name: "Zulpha Sampson",
    allowedGuests: 1,
  },
  {
    name: "Aaliyah & Farhaan Khan",
    aliases: ["aaliyah khan", "farhaan khan"],
    allowedGuests: 2,
  },
  {
    name: "Saubirah Isaacs",
    allowedGuests: 1,
  },
  {
    name: "Nurah Ebrahim",
    allowedGuests: 1,
  },
  {
    name: "Sabieroen Williams & Fayyaadh Omar",
    aliases: ["sabieroen williams", "fayyaadh omar"],
    allowedGuests: 2,
  },
  {
    name: "Huda Manan",
    allowedGuests: 1,
  },
  {
    name: "Aaliyah Marcus",
    allowedGuests: 1,
  },
  {
    name: "Zakariyya Cloete",
    allowedGuests: 1,
  },
  {
    name: "Awadi Iddi",
    allowedGuests: 1,
  },
  {
    name: "Beyonce Cloete",
    allowedGuests: 1,
  },
  {
    name: "Hanaa Van Wyk",
    allowedGuests: 1,
  },
  {
    name: "Malikah Jabaar",
    allowedGuests: 1,
  },
  {
    name: "Aasiyah Ismail",
    allowedGuests: 1,
  },
  {
    name: "Taskeen Roodt",
    allowedGuests: 1,
  },
  {
    name: "Naadhirah Boltman",
    allowedGuests: 1,
  },
  {
    name: "Aqueelah Abdroff",
    allowedGuests: 1,
  },
  {
    name: "Iman Bester",
    allowedGuests: 2,
  },
  {
    name: "Aadam Sharief & Nurah Panday",
    aliases: ["aadam sharief", "nurah panday"],
    allowedGuests: 2,
  },
  {
    name: "Mogamad Noor & Faradiebah Sharief",
    aliases: ["mogamad noor", "faradiebah sharief"],
    allowedGuests: 2,
  },
  {
    name: "Esa Sharief",
    allowedGuests: 1,
  },
  {
    name: "Shaamil & Waseelah Sampson",
    aliases: ["shaamil sampson", "waseelah sampson"],
    allowedGuests: 2,
  },
  {
    name: "Ismail Miller",
    allowedGuests: 1,
  },
  {
    name: "Mujaahid Miller",
    allowedGuests: 1,
  },
  {
    name: "Saabirah Miller",
    allowedGuests: 1,
  },
  {
    name: "Faizal & Ayesha Miller",
    aliases: ["faizal miller", "ayesha miller"],
    allowedGuests: 2,
  },
  {
    name: "Sakeenah Miller & Imaad Awaldien",
    aliases: ["sakeenah miller", "imaad awaldien"],
    allowedGuests: 4,
  },
  {
    name: "Safiyyah Miller & Sabeegh Philander",
    aliases: ["safiyyah miller", "sabeegh philander"],
    allowedGuests: 5,
  },
  {
    name: "Fatimah Achmat",
    allowedGuests: 1,
  },
  {
    name: "Ma",
    allowedGuests: 1,
  },
  {
    name: "Aunty Kaashiefa",
    allowedGuests: 1,
  },
  {
    name: "Natheer Kolia & Zakia Abrahams",
    aliases: ["natheer kolia", "zakia abrahams"],
    allowedGuests: 2,
  },
  {
    name: "Quanitah Kolia & Gerard Meder",
    aliases: ["quanitah kolia", "gerard meder"],
    allowedGuests: 2,
  },
  {
    name: "Kaamillah Kolia",
    allowedGuests: 1,
  },
  {
    name: "Yaseen Kolia & Shaymaa Abdel Salam",
    aliases: ["yaseen kolia", "shaymaa abdel salam"],
    allowedGuests: 2,
  },
  {
    name: "Mohammad Deane Kolia & Saeedah Majiet Kolia",
    aliases: ["mohammad deane kolia", "saeedah majiet kolia"],
    allowedGuests: 5,
  },
  {
    name: "Imaan Kolia",
    aliases: ["imaan kolia", "iman kolia"],
    allowedGuests: 1,
  },
  {
    name: "Sakeenah Kolia",
    allowedGuests: 1,
  },
  {
    name: "Mohammad Luai Kolia",
    allowedGuests: 1,
  },
  {
    name: "Nurah Kolia",
    allowedGuests: 1,
  },
  {
    name: "Chameen Abrahams",
    allowedGuests: 1,
  },
  {
    name: "Belinda Abrahams",
    allowedGuests: 1,
  },
  {
    name: "Ebrahim Petersen",
    allowedGuests: 1,
  },
  {
    name: "Isgaak & Fadheelah Majiet",
    aliases: ["isgaak majiet", "fadheelah majiet"],
    allowedGuests: 2,
  },
  {
    name: "Ibtisaam & Abdullah Wasserfall",
    aliases: ["ibtisaam wasserfall", "abdullah wasserfall"],
    allowedGuests: 2,
  },
  {
    name: "Megan Manuel",
    allowedGuests: 1,
  },
  {
    name: "Heidi & Henry Ruiters",
    aliases: ["heidi ruiters", "henry ruiters"],
    allowedGuests: 2,
  },
  {
    name: "Elizabeth Snyman",
    allowedGuests: 1,
  },
  {
    name: "Jade Pretorious",
    allowedGuests: 1,
  },
  {
    name: "Jody Pretorious",
    allowedGuests: 1,
  },
  {
    name: "Nuraan Salie",
    allowedGuests: 1,
  },
  {
    name: "Pedro Lamb",
    allowedGuests: 1,
  },
  {
    name: "Glynnis Idas",
    allowedGuests: 1,
  },
  {
    name: "Sharon Meyman",
    allowedGuests: 1,
  },
  {
    name: "Crystal Meyman & Kurt Meder",
    aliases: ["crystal meyman", "kurt meder"],
    allowedGuests: 2,
  },
  {
    name: "Gabiba Talip",
    allowedGuests: 2,
  },
  {
    name: "Lester & Colleen Meyer",
    aliases: ["lester meyer", "colleen meyer"],
    allowedGuests: 2,
  },
  {
    name: "Carol Bowers",
    allowedGuests: 3,
  },
  {
    name: "Kaylin Wagner",
    allowedGuests: 2,
  },
  {
    name: "Shaneel Singh",
    allowedGuests: 2,
  },
  {
    name: "Mariam Abrahams",
    allowedGuests: 1,
  },
  {
    name: "Fagrie & Faiza Meyer",
    aliases: ["fagrie meyer", "faiza meyer"],
    allowedGuests: 2,
  },
  {
    name: "Faiq & Baby Meyer",
    aliases: ["faiq meyer", "baby meyer"],
    allowedGuests: 2,
  },
  {
    name: "Shireen Daniels",
    allowedGuests: 1,
  },
  {
    name: "Julie Mullah",
    allowedGuests: 1,
  },
  {
    name: "Noor & Nazeema Abrahams",
    aliases: ["noor abrahams", "nazeema abrahams"],
    allowedGuests: 2,
  },
  {
    name: "Gouwa Orrie",
    allowedGuests: 1,
  },
  {
    name: "Moulana Azeem Khatieb",
    allowedGuests: 1,
  },
  {
    name: "Fuad & Latiefa Behardien",
    aliases: ["fuad behardien", "latiefa behardien"],
    allowedGuests: 2,
  },
  {
    name: "Faiza De Souza",
    allowedGuests: 1,
  },
];


function normalizeName(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function findGuest(input: string): Guest | null {
  const normalizedInput = normalizeName(input);
  if (!normalizedInput) return null;

  return (
    GUEST_LIST.find((guest) => {
      const candidates = [guest.name, ...(guest.aliases ?? [])].map(normalizeName);
      return candidates.includes(normalizedInput);
    }) ?? null
  );
}

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

function NameGate({ onVerified }: { onVerified: (guest: Guest) => void }) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const match = findGuest(value);
    if (match) {
      setError(false);
      onVerified(match);
    } else {
      setError(true);
    }
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

      <div className="relative w-full max-w-sm text-center">
        <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
          Before you open your invitation
        </p>
        <p className="script-name mt-4 text-4xl">What&apos;s your name?</p>
        <Ornament />

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="guest-name" className="sr-only">
            Your full name
          </label>
          <input
            id="guest-name"
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(false);
            }}
            placeholder="e.g. Ahmed Khan"
            autoComplete="name"
            aria-invalid={error}
            aria-describedby={error ? "guest-name-error" : undefined}
            className="w-full border-b border-border bg-transparent px-2 py-3 text-center font-display text-lg text-foreground outline-none focus:border-primary"
          />
          {error && (
            <p id="guest-name-error" role="alert" className="mt-2 text-sm text-red-600">
              We couldn&apos;t find that name on our guest list. Please check the spelling and try again.
            </p>
          )}

          <button
            type="submit"
            className="tracking-invite mt-8 inline-flex items-center gap-2 border border-primary/40 bg-primary px-6 py-3 text-[0.6rem] uppercase text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
}

function Envelope({ guest, onOpen }: { guest: Guest; onOpen: () => void }) {
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
              <p className="font-display text-3xl tracking-[0.35em] text-primary">{"\n"}</p>
              <p className="script-name mt-3 text-4xl leading-[1.15]">{guest.name}</p>
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
            width={516}
            height={516}
            className={`absolute left-1/2 top-[82%] z-40 w-9 -translate-x-1/2 -translate-y-1/2 drop-shadow-md ${
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
            WITH GRATEFUL HEARTS AND THE BLESSINGS OF OUR FAMILIES, WE HUMBLY REQUEST THE HONOUR OF YOUR PRESENCE AS WE CELEBRATE THE NIKAAH OF&nbsp;
          </p>
          <h1 className="script-name mt-6 text-6xl sm:text-7xl">Aisha</h1>
          <p className="font-display text-xl text-accent">&amp;</p>
          <p className="script-name text-6xl sm:text-7xl">Haafith Ibraheem</p>
          <p className="tracking-invite mt-5 text-[0.65rem] uppercase text-primary/80">
            OUR FOREVER BEGINS TODAY
          </p>

          <Ornament />

          {/*<div className="mx-auto grid max-w-md grid-cols-2 gap-6 text-center">*/}
          {/*  <div>*/}
          {/*    <Landmark*/}
          {/*      className="mx-auto mb-3 size-7 stroke-primary/80"*/}
          {/*      strokeWidth={1}*/}
          {/*      aria-hidden="true"*/}
          {/*    />*/}
          {/*    <p className="tracking-invite text-[0.6rem] uppercase text-primary">*/}
          {/*      Nikkah Ceremony*/}
          {/*    </p>*/}
          {/*    <p className="mt-3 font-display text-sm leading-6 text-muted-foreground">*/}
          {/*      Sunday, 18 October 2026*/}
          {/*      <br />*/}
          {/*      <span className="text-foreground">9:00 AM</span>*/}
          {/*      <br />*/}
          {/*      Pinelands Islamic Centre*/}
          {/*      <br />*/}
          {/*      Nursery Way, Pinelands*/}
          {/*      <br />*/}
          {/*      Please join us as we begin this beautiful journey.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*  <div className="border-l border-border/70">*/}
          {/*    <Coffee*/}
          {/*      className="mx-auto mb-3 size-7 stroke-primary/80"*/}
          {/*      strokeWidth={1}*/}
          {/*      aria-hidden="true"*/}
          {/*    />*/}
          {/*    <p className="tracking-invite text-[0.6rem] uppercase text-primary">*/}
          {/*      Wedding High Tea*/}
          {/*    </p>*/}
          {/*    <p className="mt-3 font-display text-sm leading-6 text-muted-foreground">*/}
          {/*      Sunday, 18 October 2026*/}
          {/*      <br />*/}
          {/*      <span className="text-foreground">4:00 PM (Guests arrive)</span>*/}
          {/*      <br />*/}
          {/*      High Tea at 4:30 PM*/}
          {/*      <br />*/}
          {/*      Café 51*/}
          {/*      <br />*/}
          {/*      51 Roodebloem Road, Woodstock*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="mx-auto grid max-w-md grid-cols-2 gap-6 text-center">
            <a
              href="https://www.google.com/maps/dir/?api=1&origin=current+location&destination=Pinelands+Islamic+Centre+Nursery+Way+Pinelands"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer transition-opacity hover:opacity-75"
            >
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
            </a>

            <a
              href="https://www.google.com/maps/dir/?api=1&origin=current+location&destination=Cafe+51+51+Roodebloem+Road+Woodstock+Cape+Town"
              target="_blank"
              rel="noopener noreferrer"
              className="border-l border-border/70 cursor-pointer transition-opacity hover:opacity-75"
            >
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
            </a>
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

function PersonalCard({ guest }: { guest: Guest }) {
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
        <p className="script-name mt-3 text-5xl">{guest.name}</p>
        <Ornament />
        <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
          Guests reserved
        </p>
        <p className="font-display text-4xl text-primary">{guest.allowedGuests}</p>
        <Ornament />
        <p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">
          YOUR PRESENCE WOULD BE A CHERISHED BLESSING
          <br />
          AS WE BEGIN THIS NEW CHAPTER TOGETHER.
          <br />
          KINDLY RSVP BY
        </p>
        <p className="mt-2 font-display text-lg text-foreground">
          {guest.rsvpBy ?? RSVP_DEFAULT_DATE}
        </p>
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

// function CelebrationGuide() {
//   return (
//     <article className="paper animate-veil-in relative overflow-hidden rounded-sm border border-border/70 px-6 py-14 sm:px-12">
//       <p className="tracking-invite text-center text-[0.6rem] uppercase text-muted-foreground">
//         Celebration Guide
//       </p>
//       <div className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-5">
//         {guideItems.map(({ icon: Icon, title, copy }) => (
//           <div key={title} className="text-center">
//             <span className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-background/70 transition-transform duration-300 hover:scale-105">
//               <Icon className="size-5 stroke-primary" strokeWidth={1.25} />
//             </span>
//             <p className="tracking-invite mt-4 text-[0.55rem] uppercase text-primary">
//               {title}
//             </p>
//             <p className="mt-2 font-display text-xs text-muted-foreground">{copy}</p>
//           </div>
//         ))}
//       </div>
//       <p className="script-name mt-14 text-center text-4xl leading-tight">
//         Your presence and duas mean the world to us.
//       </p>
//     </article>
//   );
// }


function Countdown() {
  const targetDate = new Date("2026-10-18T00:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCountdown();

    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <article className="paper animate-veil-in relative overflow-hidden rounded-sm border border-border/70 px-6 py-12 text-center sm:px-12">
      <div className="relative mx-auto max-w-2xl">
        {/*<p className="tracking-invite text-[0.6rem] uppercase text-muted-foreground">*/}
        {/*  The countdown begins*/}
        {/*</p>*/}

        <p className="script-name mt-3 text-4xl sm:text-5xl">
          Until our special day
        </p>

        <Ornament />

        <div className="grid grid-cols-4 gap-3 sm:gap-6">
          <div className="border border-border/70 px-2 py-4">
            <p className="font-display text-3xl text-primary sm:text-4xl">
              {String(timeLeft.days).padStart(2, "0")}
            </p>
            <p className="tracking-invite mt-2 text-[0.5rem] uppercase text-muted-foreground">
              Days
            </p>
          </div>

          <div className="border border-border/70 px-2 py-4">
            <p className="font-display text-3xl text-primary sm:text-4xl">
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
            <p className="tracking-invite mt-2 text-[0.5rem] uppercase text-muted-foreground">
              Hours
            </p>
          </div>

          <div className="border border-border/70 px-2 py-4">
            <p className="font-display text-3xl text-primary sm:text-4xl">
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
            <p className="tracking-invite mt-2 text-[0.5rem] uppercase text-muted-foreground">
              Minutes
            </p>
          </div>

          <div className="border border-border/70 px-2 py-4">
            <p className="font-display text-3xl text-primary sm:text-4xl">
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
            <p className="tracking-invite mt-2 text-[0.5rem] uppercase text-muted-foreground">
              Seconds
            </p>
          </div>
        </div>

        <p className="tracking-invite mt-8 text-[0.55rem] uppercase text-muted-foreground">
          Sunday · 18 October 2026
        </p>
      </div>
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
  const [guest, setGuest] = useState<Guest | null>(null);
  const [opened, setOpened] = useState(false);
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened) letterRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [opened]);

  if (!guest) {
    return (
      <main className="relative min-h-screen bg-background">
        <Petals />
        <NameGate onVerified={setGuest} />
      </main>
    );
  }

  return (
    <main className="relative min-h-screen bg-background">
      <Petals />

      {!opened && <Envelope guest={guest} onOpen={() => setOpened(true)} />}

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
            <PersonalCard guest={guest} />
            {/*<CelebrationGuide />*/}
            <Countdown />
            <Gratitude />
          </div>

          <footer className="tracking-invite mt-16 text-center text-[0.6rem] uppercase leading-6 text-muted-foreground">
            May Allah bless our union, fill our home with barakah and love,
            <br />
            and make us a source of peace for one another.
          </footer>

          <div className="mt-10 flex justify-center gap-3">
            <a
              href="mailto:Quanitah@gema.co.za"
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