 import { ArrowRight, Building2, CheckCircle2, Search } from "lucide-react";

 const AiLabsHeroMock = () => {
  return (
    <div className="relative">
      <div className="relative z-10">
        <div className="relative rounded-2xl bg-white shadow-[0_40px_90px_rgba(0,0,0,0.18)] border border-black/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[12px] font-semibold">
                LAB
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-semibold text-slate-900">OpenAI · Talent dashboard</div>
                <div className="text-[12px] text-slate-500">Today</div>
              </div>
              <div className="rounded-full border border-slate-200 px-3 py-1 text-[12px] text-slate-600">Yesterday ▾</div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <div className="text-[12px] text-slate-500">New candidates</div>
                <div className="mt-1 flex items-end justify-between">
                  <div className="text-[22px] font-semibold text-slate-900">37</div>
                  <div className="text-[12px] font-semibold text-emerald-600">+20%</div>
                </div>
                <div className="mt-3 h-10 rounded-lg bg-slate-50 overflow-hidden">
                  <div className="h-full w-full flex items-end gap-1 px-2 pb-1">
                    <div className="w-1/6 h-3 bg-indigo-200 rounded" />
                    <div className="w-1/6 h-5 bg-indigo-200 rounded" />
                    <div className="w-1/6 h-7 bg-indigo-300 rounded" />
                    <div className="w-1/6 h-6 bg-indigo-300 rounded" />
                    <div className="w-1/6 h-8 bg-indigo-400 rounded" />
                    <div className="w-1/6 h-9 bg-indigo-500 rounded" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <div className="text-[12px] text-slate-500">Shortlists sent</div>
                <div className="mt-1 flex items-end justify-between">
                  <div className="text-[22px] font-semibold text-slate-900">14</div>
                  <div className="text-[12px] font-semibold text-emerald-600">+8%</div>
                </div>
                <div className="mt-3 h-10 rounded-lg bg-slate-50 overflow-hidden">
                  <div className="h-full w-full flex items-end gap-1 px-2 pb-1">
                    <div className="w-1/6 h-2 bg-emerald-200 rounded" />
                    <div className="w-1/6 h-4 bg-emerald-200 rounded" />
                    <div className="w-1/6 h-6 bg-emerald-300 rounded" />
                    <div className="w-1/6 h-7 bg-emerald-300 rounded" />
                    <div className="w-1/6 h-7 bg-emerald-400 rounded" />
                    <div className="w-1/6 h-9 bg-emerald-500 rounded" />
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <div className="text-[12px] text-slate-500">Avg. time to match</div>
                <div className="mt-1 flex items-end justify-between">
                  <div className="text-[22px] font-semibold text-slate-900">2.1d</div>
                  <div className="text-[12px] font-semibold text-emerald-600">-18%</div>
                </div>
                <div className="mt-3 text-[12px] text-slate-500">AI ranking + instant outreach</div>
              </div>

              <div className="rounded-xl border border-slate-100 bg-white p-4">
                <div className="text-[12px] text-slate-500">Interview pass rate</div>
                <div className="mt-1 flex items-end justify-between">
                  <div className="text-[22px] font-semibold text-slate-900">71%</div>
                  <div className="text-[12px] font-semibold text-emerald-600">+6%</div>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-[12px] font-medium text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  Verified experts
                </div>
              </div>
            </div>

            <button className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-[13px] font-semibold text-slate-900 hover:bg-slate-50 transition-colors inline-flex items-center justify-center gap-2">
              View hiring pipeline
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="absolute -left-10 top-14 w-[260px] rounded-[28px] bg-white shadow-[0_35px_85px_rgba(0,0,0,0.16)] border border-black/5 overflow-hidden">
          <div className="px-5 pt-5 pb-4">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-[11px] font-semibold text-indigo-700">
                <Building2 className="h-3.5 w-3.5" />
                AI Lab Pipeline
              </div>
              <div className="h-2 w-2 rounded-full bg-emerald-400" />
            </div>

            <div className="mt-4">
              <div className="text-[13px] font-semibold text-slate-900">Match request</div>
              <div className="text-[12px] text-slate-500">Senior Research Engineer · LLMs</div>
            </div>
          </div>

          <div className="px-5 pb-5">
            <div className="rounded-xl border border-slate-200 bg-white px-3 py-2">
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  className="w-full bg-transparent text-[13px] text-slate-700 placeholder:text-slate-400 focus:outline-none"
                  placeholder="Search experts"
                />
              </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="text-[11px] text-slate-500">Candidates</div>
                <div className="mt-1 text-[18px] font-semibold text-slate-900">128</div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-3">
                <div className="text-[11px] text-slate-500">Match score</div>
                <div className="mt-1 text-[18px] font-semibold text-slate-900">92%</div>
              </div>
            </div>

            <button className="mt-3 w-full rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white hover:bg-slate-800 transition-colors">
              Invite to interview
            </button>

            <div className="mt-3 text-center text-[11px] text-slate-500">
              Automated screening with AI + human review
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -top-10 -left-12 h-52 w-52 rounded-full bg-fuchsia-200/60 blur-3xl" />
        <div className="absolute -bottom-12 -right-14 h-60 w-60 rounded-full bg-amber-200/60 blur-3xl" />
        <div className="absolute top-1/2 left-1/3 h-56 w-56 rounded-full bg-cyan-200/60 blur-3xl" />
      </div>
    </div>
  );
};

export default AiLabsHeroMock;
