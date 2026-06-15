import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useCallback, useRef } from "react";
import { Reveal, SectionHeading } from "../components/Reveal";
import { CheckCircle2, Loader2, Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import community from "../assets/hero-community.jpg";
import education from "../assets/hero-education.jpg";
import stupa from "../assets/hero-stupa.jpg";
import ashoka from "../assets/hero-ashoka.jpg";
import buddha from "../assets/hero-buddha.jpg";
import aboutBuddha from "../assets/about-buddha.jpg";
import aboutAshoka from "../assets/about-ashoka.jpg";
import aboutAmbedkar from "../assets/about-ambedkar.jpg";

export const Route = createFileRoute("/activities")({
  head: () => ({
    meta: [
      { title: "Activities — DEVANAMPRIYA" },
      { name: "description", content: "Completed, ongoing and upcoming activities of DEVANAMPRIYA NGO." },
      { property: "og:title", content: "Activities — DEVANAMPRIYA" },
      { property: "og:description", content: "Programmes, impact and the road ahead." },
      { property: "og:url", content: "/activities" },
    ],
    links: [{ rel: "canonical", href: "/activities" }],
  }),
  component: ActivitiesPage,
});

type Item = { img: string; title: string; date?: string; text: string };

const COMPLETED: Item[] = [
  { img: community, date: "2023 – 2024", title: "Annadaan — 50,000 Meals Served", text: "A year-long community-kitchen initiative across 6 districts that fed daily-wage families, migrant workers and the elderly. Volunteers cooked, packed and delivered fresh meals every single day — a quiet act of compassion repeated 50,000 times." },
  { img: education, date: "2023", title: "Vidya Daan Scholarship Drive", text: "Sponsored 420 first-generation learners through an entire academic year — covering tuition, uniforms, books and travel. Mentors followed each child's progress, ensuring that no scholarship became just a cheque." },
  { img: stupa, date: "2022 – 2023", title: "Heritage Walk Series", text: "Twelve guided walks at Sanchi, Sarnath and Ajanta brought over 1,200 participants face to face with the living heritage of the Buddha and Emperor Ashoka — history walked, not read." },
  { img: aboutAmbedkar, date: "2022", title: "Constitution Day Outreach", text: "Free distribution of pocket copies of the Preamble in five languages, paired with street-corner readings and Q&A sessions led by law students across twelve cities." },
  { img: aboutAshoka, date: "2022", title: "Ashoka Memorial Convention", text: "A two-day convention with monks, jurists and historians on the ethics of Ashokan governance — proceedings later published as a free open-access volume." },
  { img: buddha, date: "2021", title: "Vipassana Camps for Youth", text: "Three ten-day silent meditation retreats for college students, conducted in collaboration with teachers from Igatpuri. Free of cost. Life-changing for many." },
];

const ONGOING: Item[] = [
  { img: education, title: "Dhamma Pathshala", text: "Weekend ethics and Pali story-telling classes in 18 rural schools. Children learn the Pancasila not as rules, but as ways of being kinder to those around them." },
  { img: community, title: "Wellness on Wheels", text: "A mobile health van reaching remote tribal hamlets every fortnight — basic check-ups, free medicines, maternal counselling and referrals for serious cases." },
  { img: ashoka, title: "Constitution Literacy Workshops", text: "Saturday workshops on fundamental rights, duties and the Preamble for first-time voters in colleges and ITI centres across Maharashtra and Madhya Pradesh." },
  { img: aboutBuddha, title: "Free Dhamma Library Vans", text: "Two travelling libraries carrying 1,000+ titles on Buddhism, the Constitution and Indian social reform — parking at one village school every Sunday." },
];

const FUTURE = [
  { date: "Q1 2026", title: "Buddhist Studies Library", text: "A reference library and quiet reading room in Nagpur — open to all, free for students and researchers." },
  { date: "Q2 2026", title: "Youth Leadership Academy", text: "A six-month residential programme in ethics-driven leadership for young changemakers from underserved districts." },
  { date: "Q3 2026", title: "Rural Skill Centres", text: "Three vocational training centres for women in Vidarbha — tailoring, digital literacy and small-business basics." },
  { date: "Q4 2026", title: "International Dhamma Conference", text: "A global gathering of monks, scholars and activists in Sarnath, marking a decade of DEVANAMPRIYA's work." },
];

function useSwipe(length: number) {
  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx((i) => (i - 1 + length) % length), [length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % length), [length]);
  return { idx, setIdx, prev, next };
}

function Carousel({ items, accent, onOpen }: { items: Item[]; accent: "completed" | "ongoing"; onOpen: (i: number) => void }) {
  const { idx, setIdx, prev, next } = useSwipe(items.length);
  const startX = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (dx > 50) prev();
    else if (dx < -50) next();
    startX.current = null;
  };

  return (
    <div className="relative mt-10">
      <div className="overflow-hidden rounded-2xl border border-border bg-card" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${idx * 100}%)` }}>
          {items.map((it, i) => (
            <article key={it.title} className="grid w-full shrink-0 gap-0 md:grid-cols-2">
              <button onClick={() => onOpen(i)} className="group relative block aspect-[4/3] w-full overflow-hidden md:aspect-auto md:h-full">
                <img src={it.img} alt={it.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${accent === "completed" ? "bg-[var(--gold)] text-[var(--royal-deep)]" : "bg-[var(--royal)] text-white"}`}>
                  {accent === "completed" ? <><CheckCircle2 className="h-3.5 w-3.5" /> Completed</> : <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Ongoing</>}
                </span>
                <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white">Tap to enlarge</span>
              </button>
              <div className="flex flex-col justify-center gap-3 p-6 md:p-10">
                {it.date && <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{it.date}</div>}
                <h3 className="text-2xl font-semibold leading-tight md:text-3xl">{it.title}</h3>
                <p className="text-base leading-relaxed text-muted-foreground">{it.text}</p>
                <div className="mt-2 text-xs text-muted-foreground">{i + 1} / {items.length} · Swipe or use arrows</div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <button onClick={prev} aria-label="Previous" className="absolute left-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 border border-border shadow-md hover:bg-background md:-left-5">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={next} aria-label="Next" className="absolute right-2 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center rounded-full bg-background/90 border border-border shadow-md hover:bg-background md:-right-5">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="mt-5 flex justify-center gap-2">
        {items.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} aria-label={`Go to ${i + 1}`} className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-[var(--royal)]" : "w-2 bg-border"}`} />
        ))}
      </div>
    </div>
  );
}

function ActivitiesPage() {
  const [lightbox, setLightbox] = useState<Item | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-[var(--royal-deep)] pt-32 pb-20 text-white">
        <img src={community} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--royal-deep)] to-[var(--royal-deep)]/50" />
        <div className="container-page relative">
          <Reveal>
            <span className="eyebrow">Our work</span>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">From <span className="text-gradient-gold">vision</span> to action, day by day.</h1>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Completed" title="Programmes that have already lit the path" subtitle="Swipe through the work our community has carried out — every image tells the story of an idea that became real." /></Reveal>
          <Carousel items={COMPLETED} accent="completed" onOpen={(i) => setLightbox(COMPLETED[i])} />
        </div>
      </section>

      <section className="bg-secondary/40 py-20 md:py-24">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Ongoing" title="Walking the path right now" subtitle="The programmes we are running this season — quiet, steady, every week." /></Reveal>
          <Carousel items={ONGOING} accent="ongoing" onOpen={(i) => setLightbox(ONGOING[i])} />
        </div>
      </section>

      <section className="bg-background py-20 md:py-24">
        <div className="container-page">
          <Reveal><SectionHeading eyebrow="Future" title="The road we are paving" /></Reveal>
          <div className="relative mt-14">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />
            <div className="space-y-10">
              {FUTURE.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.08}>
                  <div className={`relative grid gap-4 md:grid-cols-2 md:gap-12 ${i % 2 === 0 ? "" : "md:[&>div:first-child]:order-2"}`}>
                    <div className="pl-12 md:pl-0 md:pr-12 md:text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[var(--royal)] px-3 py-1 text-xs font-semibold text-white"><Calendar className="h-3 w-3" /> {f.date}</span>
                      <h3 className="mt-3 text-xl font-semibold">{f.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
                    </div>
                    <div />
                    <span className="absolute left-4 top-2 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full bg-[var(--gold)] ring-4 ring-background md:left-1/2" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] grid place-items-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button onClick={() => setLightbox(null)} aria-label="Close" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20">
              <X className="h-5 w-5" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}
            >
              <img src={lightbox.img} alt={lightbox.title} className="mx-auto max-h-[75vh] w-auto rounded-xl object-contain" />
              <p className="mt-3 text-center text-sm text-white/80">{lightbox.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
