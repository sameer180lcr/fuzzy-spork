import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  ShieldCheck,
  Zap,
} from "lucide-react";

const ImplementationServicesSection = () => {
  const topCards = [
    {
      icon: Zap,
      title: "Launch faster",
      description:
        "Go live quickly with a hands-on onboarding and a proven rollout checklist.",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      icon: Layers,
      title: "Design for scale",
      description:
        "Implement workflows that support multiple roles, teams, and hiring pipelines.",
      color: "text-sky-600",
      bg: "bg-sky-50",
    },
    {
      icon: ShieldCheck,
      title: "Minimise risk",
      description:
        "Build a reliable process with verification, audit trails, and security best practices.",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      icon: Compass,
      title: "Unlock more value",
      description:
        "Discover additional ways to automate evaluation and improve hiring signal quality.",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  const bullets = [
    "Role intake & requirements mapping",
    "Pipeline setup (shortlists, stages, scorecards)",
    "Interview automation & rubric configuration",
    "Verification workflow + reviewer assignments",
    "Analytics dashboards & reporting",
    "Team permissions and security hardening",
  ];

  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="text-[12px] font-semibold text-indigo-600 tracking-wide">
            Implementation services
          </div>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
            Tailored guidance
            <br />
            from ideation to value realization
          </h2>
          <p className="mt-6 text-[15px] leading-7 text-slate-600">
            Integration specialists and engineers guide you through every stage of
            onboarding—from workflow design to launch—so your lab can start hiring
            faster with higher signal.
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCards.map((c, idx) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-2xl border border-slate-100 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.08)] p-6"
              >
                <div className={`h-11 w-11 rounded-xl ${c.bg} flex items-center justify-center ring-1 ring-black/5`}>
                  <Icon className={`h-5 w-5 ${c.color}`} />
                </div>
                <div className="mt-4 text-[15px] font-semibold text-slate-900">
                  {c.title}
                </div>
                <div className="mt-2 text-[13px] leading-6 text-slate-600">
                  {c.description}
                </div>
                <div className="mt-4 inline-flex items-center gap-2 text-[13px] font-semibold text-slate-900">
                  Learn more
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl border border-slate-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] p-8"
          >
            <div className="text-[15px] font-semibold text-slate-900">
              Implementation playbook
            </div>
            <p className="mt-3 text-[13px] leading-6 text-slate-600">
              From detailed requirements gathering to operational readiness, we’ll
              guide you step-by-step through configuration and rollout.
            </p>

            <div className="mt-6 text-[12px] font-semibold text-slate-900">
              Key areas of focus include
            </div>
            <div className="mt-4 space-y-3">
              {bullets.map((b) => (
                <div key={b} className="flex items-start gap-3">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-100">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <div className="text-[13px] leading-6 text-slate-700">{b}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="relative rounded-3xl border border-slate-100 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)] overflow-hidden"
          >
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
                backgroundSize: "80px 80px",
              }}
            />
            <div className="relative h-[420px]">
              <div className="absolute left-10 top-10 h-14 w-14 rounded-2xl border border-slate-200 bg-white shadow-sm" />
              <div className="absolute left-28 top-20 h-14 w-14 rounded-2xl border border-slate-200 bg-white shadow-sm" />
              <div className="absolute left-56 top-16 h-14 w-14 rounded-2xl border border-slate-200 bg-white shadow-sm" />
              <div className="absolute left-72 top-32 h-14 w-14 rounded-2xl border border-slate-200 bg-white shadow-sm" />
              <div className="absolute left-44 top-44 h-14 w-14 rounded-2xl border border-slate-200 bg-white shadow-sm" />
              <div className="absolute left-86 top-48 h-14 w-14 rounded-2xl border border-slate-200 bg-white shadow-sm" />

              <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="implLink" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#6366F1" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#22D3EE" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#34D399" stopOpacity="0.95" />
                  </linearGradient>
                </defs>
                <path
                  d="M 22 60 C 30 56, 42 56, 50 60 S 68 70, 78 64"
                  fill="none"
                  stroke="url(#implLink)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
              </svg>

              <div className="absolute left-16 top-52">
                <div className="rounded-2xl border border-slate-100 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.12)] px-4 py-3">
                  <div className="text-[12px] font-semibold text-slate-900">Onboarding</div>
                  <div className="mt-1 text-[11px] text-slate-500">Configure pipeline</div>
                </div>
              </div>

              <div className="absolute left-56 top-64">
                <div className="rounded-2xl bg-slate-900 text-white shadow-[0_24px_70px_rgba(15,23,42,0.22)] px-5 py-4">
                  <div className="text-[12px] font-semibold">Go-live checklist</div>
                  <div className="mt-1 text-[11px] text-white/70">QA → Training → Launch</div>
                  <div className="mt-3 h-2 w-44 rounded-full bg-white/15 overflow-hidden">
                    <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-indigo-400 to-cyan-300" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImplementationServicesSection;
