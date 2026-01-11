import { Brain, Building2, CheckCircle2, Cpu, Globe, Lock, Sparkles } from "lucide-react";

const IntegratedAiSuite = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="pointer-events-none absolute -inset-x-10 -inset-y-16 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.14) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0) 72%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 35%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0) 72%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-[12px] font-semibold text-indigo-600 tracking-wide">
              Modular AI suite
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
              A fully integrated
              <br />
              suite for AI labs
              <br />
              and expert hiring
            </h2>
            <p className="mt-6 max-w-xl text-[15px] leading-7 text-slate-600">
              Reduce hiring cycles, improve signal quality, and scale talent operations with an integrated workflow: sourcing, screening, verification, and team collaboration—all designed for modern AI organizations.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-slate-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">AI ranking</div>
                    <div className="text-[12px] text-slate-600">Shortlists in minutes</div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.06)] p-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white ring-1 ring-slate-200 text-slate-900 flex items-center justify-center">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[13px] font-semibold text-slate-900">Verification</div>
                    <div className="text-[12px] text-slate-600">Trusted experts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -top-10 -left-10 h-52 w-52 rounded-full bg-fuchsia-200/60 blur-3xl" />
            <div className="absolute -bottom-12 -right-12 h-56 w-56 rounded-full bg-amber-200/60 blur-3xl" />
            <div className="absolute top-1/2 left-1/3 h-56 w-56 rounded-full bg-cyan-200/60 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-100 bg-white shadow-[0_40px_90px_rgba(15,23,42,0.14)] overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <div className="text-[13px] font-semibold text-slate-900">AI Suite map</div>
                <div className="text-[12px] text-slate-500">Live connections</div>
              </div>

              <div className="relative h-[360px]">
                <div className="absolute inset-0">
                  <div className="absolute left-[56%] top-[10%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[36%] top-[18%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[70%] top-[22%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />

                  <div className="absolute left-[46%] top-[34%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[78%] top-[36%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[62%] top-[38%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />

                  <div className="absolute left-[40%] top-[52%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[74%] top-[54%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[58%] top-[58%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />

                  <div className="absolute left-[34%] top-[70%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[66%] top-[72%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                  <div className="absolute left-[82%] top-[70%] h-12 w-12 rounded-xl border border-slate-200 bg-white/70 shadow-sm" />
                </div>

                <svg className="absolute inset-0" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="aiSuiteLink" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity="0.95" />
                      <stop offset="60%" stopColor="#22D3EE" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#34D399" stopOpacity="0.95" />
                    </linearGradient>
                    <filter id="aiSuiteGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feGaussianBlur stdDeviation="1.2" result="blur" />
                      <feColorMatrix
                        in="blur"
                        type="matrix"
                        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
                        result="glow"
                      />
                      <feMerge>
                        <feMergeNode in="glow" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <path
                    d="M 36 46 C 44 46, 46 58, 54 58 S 68 46, 76 46"
                    fill="none"
                    stroke="url(#aiSuiteLink)"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    filter="url(#aiSuiteGlow)"
                  />
                </svg>

                <div className="absolute left-[36%] top-[46%] -translate-x-1/2 -translate-y-1/2">
                  <div className="rounded-2xl border border-slate-100 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.12)] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center ring-1 ring-indigo-100">
                        <Sparkles className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold text-slate-900">Match</div>
                        <div className="text-[11px] text-slate-500">Rank experts</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute left-[76%] top-[46%] -translate-x-1/2 -translate-y-1/2">
                  <div className="rounded-2xl border border-slate-100 bg-white shadow-[0_22px_70px_rgba(15,23,42,0.12)] px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-xl bg-white text-slate-900 flex items-center justify-center ring-1 ring-slate-200">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[12px] font-semibold text-slate-900">AI Lab</div>
                        <div className="text-[11px] text-slate-500">Pipeline</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegratedAiSuite;
