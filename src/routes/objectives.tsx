import { createFileRoute } from "@tanstack/react-router";
import { Reveal, SectionHeading } from "../components/Reveal";
import { HandHeart, Scale, Sparkles, Users, GraduationCap, BookOpen, Building2, HeartHandshake } from "lucide-react";
import buddha from "../assets/hero-buddha.jpg";

export const Route = createFileRoute("/objectives")({
  head: () => ({
    meta: [
      { title: "Objectives — DEVANAMPRIYA" },
      { name: "description", content: "Our eight guiding objectives — from compassion and equality to youth empowerment and community welfare." },
      { property: "og:title", content: "Our Objectives — DEVANAMPRIYA" },
      { property: "og:description", content: "The pillars that shape our action." },
      { property: "og:url", content: "/objectives" },
    ],
    links: [{ rel: "canonical", href: "/objectives" }],
  }),
  component: ObjectivesPage,
});

const OBJECTIVES = [
  { icon: HandHeart, title: "Promote Compassion", desc: "Embedding Metta and Karuna in everyday life — through service, listening and unconditional care." },
  { icon: Scale, title: "Encourage Equality", desc: "Standing firmly against caste, class and gender discrimination — for a dignified life for all." },
  { icon: Sparkles, title: "Spread Dhamma", desc: "Making the Buddha's wisdom accessible — through study circles, retreats and publications." },
  { icon: Users, title: "Build Brotherhood", desc: "Strengthening Sangha — the community of friends walking the path together." },
  { icon: GraduationCap, title: "Youth Empowerment", desc: "Leadership, ethics and skills programmes that prepare the next generation of change-makers." },
  { icon: BookOpen, title: "Educational Support", desc: "Scholarships, libraries and rural schools — because education is the great equaliser." },
  { icon: Building2, title: "Community Development", desc: "Health camps, water, sanitation and livelihoods — the foundations of human flourishing." },
  { icon: HeartHandshake, title: "Social Welfare", desc: "Care for elders, widows, orphans and the differently-abled — leaving no one behind." },
];

function ObjectivesPage() {
  return (
    <>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden bg-[var(--royal-deep)] pt-32 pb-20 text-white">
        <img src={buddha} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--royal-deep)] to-[var(--royal-deep)]/50" />
        <div className="container-page relative">
          <Reveal>
            <span className="eyebrow">What we stand for</span>
            <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl md:text-6xl">Eight pillars of <span className="text-gradient-gold">our promise.</span></h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">Each objective is a vow — a commitment to live and serve in the spirit of Dhamma.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-background py-24 md:py-32">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {OBJECTIVES.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-2 hover:border-[var(--gold)] hover:shadow-[var(--shadow-elegant)]">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[var(--gold)]/10 transition group-hover:scale-150" />
                  <div className="relative">
                    <div className="grid h-14 w-14 place-items-center rounded-xl bg-gradient-to-br from-[var(--royal)] to-[var(--royal-deep)] text-[var(--gold)] transition group-hover:scale-110">
                      <o.icon className="h-7 w-7" />
                    </div>
                    <div className="mt-5 text-xs font-bold text-[var(--gold)]">0{i + 1}</div>
                    <h3 className="mt-1 text-xl font-semibold">{o.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{o.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
