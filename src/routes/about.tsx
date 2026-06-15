import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "../components/Reveal";
import { ArrowRight } from "lucide-react";
import buddha from "../assets/about-buddha.jpg";
import ashoka from "../assets/about-ashoka.jpg";
import ambedkar from "../assets/about-ambedkar.jpg";
import stupa from "../assets/hero-stupa.jpg";
import heroBuddha from "../assets/hero-buddha.jpg";
import heroAshoka from "../assets/hero-ashoka.jpg";
import community from "../assets/hero-community.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DEVANAMPRIYA | Buddha, Ashoka & Ambedkar" },
      { name: "description", content: "The story behind Devanampriya — inspired by Lord Buddha, Emperor Ashoka and Dr. B.R. Ambedkar." },
      { property: "og:title", content: "About DEVANAMPRIYA" },
      { property: "og:description", content: "Our roots in Dhamma, history and the vision of equality." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const FIGURES = [
  {
    name: "Lord Buddha",
    era: "563 – 483 BCE",
    img: buddha,
    intro: "The Awakened One who showed the Middle Path — a life of wisdom, ethics and meditation, free from extremes.",
    points: [
      "The Four Noble Truths — the nature and cessation of suffering.",
      "The Noble Eightfold Path — right view, intention, speech, action, livelihood, effort, mindfulness and concentration.",
      "Universal compassion — Metta extended to all beings, without distinction.",
    ],
    quote: "Hatred is never appeased by hatred. It is appeased by love alone.",
  },
  {
    name: "Emperor Ashoka",
    era: "304 – 232 BCE",
    img: ashoka,
    intro: "After Kalinga, the warrior king became Devanampriya — Beloved of the Gods — choosing Dhamma over conquest.",
    points: [
      "Transformation after the Kalinga War — renouncing violence forever.",
      "Spread Buddhism across Asia through emissaries and his children.",
      "The Ashoka Pillars and Edicts — the world's first proclamation of universal welfare.",
    ],
    quote: "All men are my children. I desire for my children their welfare and happiness.",
  },
  {
    name: "Dr. B.R. Ambedkar",
    era: "1891 – 1956",
    img: ambedkar,
    intro: "Architect of the Indian Constitution and modern apostle of equality, who revived Buddhism for millions.",
    points: [
      "Lifelong struggle for the dignity and rights of the marginalised.",
      "Drafted the Constitution of India — a charter of liberty, equality and fraternity.",
      "Embraced Buddhism in 1956, leading the great Dhamma revival.",
    ],
    quote: "Cultivation of mind should be the ultimate aim of human existence.",
  },
] as const;

const PLACES = [
  { name: "Sanchi Stupa", img: stupa, desc: "The oldest stone structure in India — a UNESCO World Heritage site of serene grandeur." },
  { name: "Bodh Gaya", img: heroBuddha, desc: "Where the Buddha attained Enlightenment beneath the sacred Bodhi tree." },
  { name: "Sarnath", img: heroAshoka, desc: "The deer park where the first sermon — Dhammacakkappavattana — was preached." },
  { name: "Kushinagar", img: stupa, desc: "The hallowed site of the Buddha's Mahaparinirvana." },
  { name: "Ajanta Caves", img: heroBuddha, desc: "Rock-cut wonders adorned with the finest Buddhist murals of ancient India." },
  { name: "Ellora Caves", img: ashoka, desc: "A harmonious confluence of Buddhist, Hindu and Jain rock architecture." },
  { name: "Nalanda University", img: community, desc: "The ancient seat of learning that lit the lamp of wisdom across Asia." },
];

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-[var(--royal-deep)] pt-32 pb-20 text-white">
        <img src={heroBuddha} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--royal-deep)] via-[var(--royal-deep)]/70 to-[var(--royal-deep)]/40" />
        <div className="container-page relative">
          <Reveal>
            <span className="eyebrow">Our Story</span>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Three voices across <span className="text-gradient-gold">two and a half millennia</span> — one timeless message.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80">From the Buddha's enlightenment to Ashoka's transformation to Ambedkar's awakening — we carry forward a living tradition of compassion and justice.</p>
          </Reveal>
        </div>
      </section>

      {/* FIGURES — alternating timeline */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-page space-y-28">
          {FIGURES.map((f, i) => (
            <div key={f.name} className="grid items-center gap-12 lg:grid-cols-2">
              <Reveal className={i % 2 === 1 ? "lg:order-2" : ""}>
                <div className="relative">
                  <div className="absolute -inset-3 -z-10 rounded-3xl bg-gradient-to-br from-[var(--gold-soft)] to-transparent" />
                  <img src={f.img} alt={f.name} loading="lazy" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-elegant)]" />
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <span className="eyebrow">{f.era}</span>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl md:text-5xl">{f.name}</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">{f.intro}</p>
                <ul className="mt-6 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex gap-3 text-foreground/85">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold)]" /> {p}
                    </li>
                  ))}
                </ul>
                <blockquote className="mt-7 border-l-4 border-[var(--gold)] bg-secondary/60 p-5 italic text-foreground/80">
                  "{f.quote}"
                </blockquote>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* PLACES */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-page">
          <Reveal><SectionHeading center eyebrow="Sacred Heritage" title="Famous Buddhist places" subtitle="Pilgrimage sites that hold the breath of history and the silence of meditation." /></Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PLACES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.05}>
                <article className="group h-full overflow-hidden rounded-2xl bg-card shadow-sm transition hover:-translate-y-2 hover:shadow-xl">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={p.img} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{p.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
                    <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--royal)] transition hover:text-[var(--gold)]">Learn more <ArrowRight className="h-4 w-4" /></button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
