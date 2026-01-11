import type { ComponentType } from "react";
import { ArrowRight, Brain, Building2, Cpu, Globe, Shield, Sparkles } from "lucide-react";

type ShowcaseCard = {
  tag: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  accentFrom: string;
  accentTo: string;
};

const cards: ShowcaseCard[] = [
  {
    tag: "Matching",
    title: "AI talent matching",
    description: "Rank experts for LLM, RL, CV and safety roles in minutes.",
    icon: Sparkles,
    accentFrom: "from-indigo-500",
    accentTo: "to-purple-500",
  },
  {
    tag: "Screening",
    title: "Automated technical screening",
    description: "Structured evaluations + AI-assisted review for every candidate.",
    icon: Cpu,
    accentFrom: "from-sky-500",
    accentTo: "to-indigo-500",
  },
  {
    tag: "Research",
    title: "Research-ready profiles",
    description: "Papers, repos, benchmarks, and interview signals in one place.",
    icon: Brain,
    accentFrom: "from-fuchsia-500",
    accentTo: "to-pink-500",
  },
  {
    tag: "Labs",
    title: "Built for AI labs",
    description: "Pipeline dashboards for teams like OpenAI, DeepMind, and more.",
    icon: Building2,
    accentFrom: "from-emerald-500",
    accentTo: "to-teal-500",
  },
  {
    tag: "Global",
    title: "Worldwide expert network",
    description: "Find the best researchers across time zones and regions.",
    icon: Globe,
    accentFrom: "from-amber-500",
    accentTo: "to-orange-500",
  },
  {
    tag: "Safety",
    title: "Safety-first hiring",
    description: "Verification + responsible AI practices for every engagement.",
    icon: Shield,
    accentFrom: "from-violet-500",
    accentTo: "to-indigo-500",
  },
  {
    tag: "Workflow",
    title: "Interview automation",
    description: "Schedule, scorecards, and feedback—streamlined end-to-end.",
    icon: Sparkles,
    accentFrom: "from-cyan-500",
    accentTo: "to-sky-500",
  },
  {
    tag: "Signals",
    title: "Signals that matter",
    description: "Benchmarks, code quality, and real-world project experience.",
    icon: Cpu,
    accentFrom: "from-rose-500",
    accentTo: "to-fuchsia-500",
  },
  {
    tag: "Teams",
    title: "Team collaboration",
    description: "Shortlists, notes, and approvals for every hiring loop.",
    icon: Building2,
    accentFrom: "from-blue-500",
    accentTo: "to-indigo-500",
  },
  {
    tag: "Outreach",
    title: "Instant outreach",
    description: "Contact top experts with personalized, high-signal invites.",
    icon: ArrowRight,
    accentFrom: "from-slate-700",
    accentTo: "to-slate-900",
  },
];

const HeroShowcaseCarousel = () => {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          <div
            className="pointer-events-none absolute -inset-x-8 -inset-y-10 opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(15,23,42,0.16) 1px, transparent 1px)",
              backgroundSize: "18px 18px",
              backgroundPosition: "0 0",
              maskImage:
                "radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0) 75%)",
              WebkitMaskImage:
                "radial-gradient(circle at 50% 30%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0) 75%)",
            }}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 pb-12">
            {cards.slice(0, 10).map((card, idx) => {
              const Icon = card.icon;
              return (
                <article
                  key={idx}
                  className="group relative rounded-2xl border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_28px_70px_rgba(15,23,42,0.16)] [perspective:1200px]"
                >
                  <div className="relative transform-gpu transition-transform duration-300 group-hover:[transform:translateY(-6px)_rotateX(6deg)_rotateY(-10deg)]">
                    <div className="relative h-28">
                      <div className={`absolute inset-0 bg-gradient-to-br ${card.accentFrom} ${card.accentTo} opacity-90`} />
                      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />

                      <div className="absolute right-5 top-5 h-12 w-16 rounded-lg bg-white/70 shadow-[0_18px_30px_rgba(15,23,42,0.18)] ring-1 ring-white/60" />
                      <div className="absolute right-3 top-3 h-12 w-16 rounded-lg bg-white shadow-[0_22px_36px_rgba(15,23,42,0.22)] ring-1 ring-black/5 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-white/70" />
                        <div className="absolute left-2 top-2 h-1.5 w-9 rounded-full bg-slate-900/90" />
                        <div className="absolute left-2 top-[0.95rem] h-1.5 w-7 rounded-full bg-slate-900/45" />

                        <div className="absolute left-2 top-[1.65rem] inline-flex items-center gap-1 rounded-full bg-slate-900/90 px-1.5 py-[2px]">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          <div className="h-1 w-4 rounded bg-white/80" />
                        </div>

                        <div className="absolute left-2 bottom-2 h-2 w-10 rounded bg-blue-500/90" />
                        <div className="absolute left-2 bottom-[0.85rem] h-1 w-8 rounded bg-blue-500/40" />

                        <div className="absolute right-2 bottom-2 h-2 w-3 rounded bg-amber-400/90" />
                        <div className="absolute right-2 top-[1.65rem] flex -space-x-1">
                          <div className="h-3 w-3 rounded-full bg-slate-200 ring-1 ring-white" />
                          <div className="h-3 w-3 rounded-full bg-slate-300 ring-1 ring-white" />
                          <div className="h-3 w-3 rounded-full bg-slate-400 ring-1 ring-white" />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.accentFrom} ${card.accentTo} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.16]`}
                    />

                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200">
                          {card.tag}
                        </div>
                        <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm transition-colors duration-300 group-hover:bg-white group-hover:text-slate-900 group-hover:ring-1 group-hover:ring-slate-200">
                          <Icon className="h-5 w-5" />
                        </div>
                      </div>

                    <h3 className="mt-4 text-[18px] font-semibold tracking-tight text-slate-900">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-6 text-slate-600">
                      {card.description}
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-slate-900 transition-colors duration-300 group-hover:text-slate-950">
                      Explore
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroShowcaseCarousel;
