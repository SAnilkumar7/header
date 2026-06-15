import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Users, BookOpen, HandHeart, Sparkles, Quote, ArrowRight, Heart } from "lucide-react";
import { HeroSlider } from "../components/HeroSlider";
import { Reveal, SectionHeading } from "../components/Reveal";
import { Counter } from "../components/Counter";

import aboutBuddha from "../assets/about-buddha.jpg";
import community from "../assets/hero-community.jpg";
import education from "../assets/hero-education.jpg";
import stupa from "../assets/hero-stupa.jpg";
import ashoka from "../assets/hero-ashoka.jpg";
import buddha from "../assets/hero-buddha.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DEVANAMPRIYA — Dhamma • Humanity • Equality" },
      { name: "description", content: "An NGO inspired by Lord Buddha and Dr. B.R. Ambedkar — promoting compassion, equality and social justice." },
      { property: "og:title", content: "DEVANAMPRIYA — Dhamma • Humanity • Equality" },
      { property: "og:description", content: "Join us in building a peaceful, just and compassionate society." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const VISION = [
  { icon: HandHeart, title: "Compassion", text: "Cultivating kindness through service to every living being." },
  { icon: Users, title: "Equality", text: "A society where dignity belongs to all, without exception." },
  { icon: BookOpen, title: "Wisdom", text: "Education, awareness and the teachings of Dhamma for all." },
  { icon: Sparkles, title: "Peace", text: "Resolving conflict through dialogue, empathy and right action." },
];

const STATS = [
  { value: 240, suffix: "+", label: "Communities Reached" },
  { value: 85, suffix: "+", label: "Educational Programs" },
  { value: 1500, suffix: "+", label: "Active Volunteers" },
  { value: 320, suffix: "+", label: "Welfare Activities" },
];

const GALLERY = [
  { img: community, h: "tall" },
  { img: education, h: "short" },
  { img: stupa, h: "short" },
  { img: ashoka, h: "tall" },
  { img: buddha, h: "tall" },
  { img: aboutBuddha, h: "short" },
];

const TESTIMONIALS = [
  { name: "Meera Joshi", role: "Teacher, Nagpur", text: "Devanampriya's education programme gave my students new wings. The values of compassion and equality run through every lesson." },
  { name: "Rohit Kamble", role: "Volunteer", text: "Walking with this team taught me what real service means. We don't just help — we listen, learn, and grow together." },
  { name: "Sunita Pawar", role: "Community Leader", text: "Their welfare work has rebuilt trust in our village. The dignity they restore is greater than any donation could measure." },
];

function Home() {
  return (
    <>
      <HeroSlider />

      {/* ABOUT */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-[var(--gold-soft)] to-transparent" />
              <img src={aboutBuddha} alt="Lord Buddha" loading="lazy" className="w-full rounded-2xl object-cover shadow-[var(--shadow-elegant)]" />
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-[var(--royal)] p-6 text-white shadow-xl md:block">
                <div className="text-4xl font-bold text-[var(--gold)]">15+</div>
                <div className="mt-1 text-xs uppercase tracking-[0.2em]">Years of Service</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <SectionHeading eyebrow="About Devanampriya" title="A movement rooted in Dhamma, devoted to humanity." subtitle="We are dedicated to spreading the principles of Dhamma, equality, compassion, brotherhood and social justice — inspired by Lord Buddha and Dr. B.R. Ambedkar." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                ["Wisdom in Action", "Translating ancient teaching into everyday service."],
                ["Equality at Heart", "Standing with the marginalised, always."],
                ["Education First", "Empowering minds, transforming generations."],
                ["Peaceful Future", "Building harmony block by block, soul by soul."],
              ].map(([t, d]) => (
                <div key={t} className="rounded-xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-[var(--gold)] hover:shadow-md">
                  <div className="text-base font-semibold">{t}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{d}</div>
                </div>
              ))}
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 font-semibold text-[var(--royal)] hover:text-[var(--gold)]">Discover our story <ArrowRight className="h-4 w-4" /></Link>
          </Reveal>
        </div>
      </section>

      {/* VISION */}
      <section className="relative overflow-hidden bg-[var(--royal-deep)] py-24 text-white md:py-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 0%, transparent 40%), radial-gradient(circle at 80% 80%, var(--gold) 0%, transparent 40%)" }} />
        <div className="container-page relative">
          <Reveal>
            <SectionHeading center eyebrow="Our Vision" title="A society of peace, equality, wisdom and dignity." subtitle="Four guiding lights that shape every initiative we undertake." />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VISION.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition hover:-translate-y-2 hover:border-[var(--gold)] hover:bg-white/[0.08]">
                  <div className="grid h-14 w-14 place-items-center rounded-xl bg-[var(--gold)] text-[var(--royal-deep)] transition group-hover:scale-110">
                    <v.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-background py-20">
        <div className="container-page">
          <div className="grid gap-10 rounded-3xl border border-border bg-gradient-to-br from-[var(--secondary)] to-background p-10 md:grid-cols-4 md:p-14">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-5xl font-bold text-gradient-gold md:text-6xl">
                    <Counter to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-3 text-sm uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-secondary/40 py-24 md:py-32">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Glimpses" title="Moments of compassion, captured in light." subtitle="A visual journal of our service, our people and the communities we walk beside." /></Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className={`group relative overflow-hidden rounded-2xl ${g.h === "tall" ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                  <img src={g.img} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--royal-deep)]/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link to="/gallery" className="btn-primary"><ArrowRight className="h-4 w-4" /> Explore Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-background py-24 md:py-32">
        <div className="container-page">
          <Reveal><SectionHeading center eyebrow="Voices" title="Stories from those we serve and serve with." /></Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.1}>
                <motion.div whileHover={{ y: -6 }} className="h-full rounded-2xl border border-border bg-card p-8 shadow-sm transition hover:shadow-xl">
                  <Quote className="h-8 w-8 text-[var(--gold)]" />
                  <p className="mt-4 text-base leading-relaxed text-foreground/85">"{t.text}"</p>
                  <div className="mt-6 border-t border-border pt-4">
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted-foreground">{t.role}</div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <img src={community} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--royal-deep)]/95 to-[var(--royal-deep)]/75" />
        <div className="container-page relative grid items-center gap-10 py-24 text-white md:grid-cols-2 md:py-32">
          <Reveal>
            <span className="eyebrow">Be part of the change</span>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">Your hand. Their hope. One Dhamma.</h2>
            <p className="mt-4 max-w-xl text-white/80">Every contribution — a moment of your time, a meal for a child, a rupee toward a school — is a step on the noble path. Walk it with us.</p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-8 backdrop-blur">
              <div className="grid gap-3 sm:grid-cols-2">
                <Link to="/contact" className="btn-primary !w-full"><Heart className="h-4 w-4" /> Donate Now</Link>
                <Link to="/contact" className="btn-outline !w-full">Become a Volunteer</Link>
              </div>
              <p className="mt-5 text-center text-xs text-white/55">100% transparent · Tax-deductible · Used where it matters</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
