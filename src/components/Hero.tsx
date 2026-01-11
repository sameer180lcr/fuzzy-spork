import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AiLabsHeroMock from "./AiLabsHeroMock";

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-16 lg:pt-20 pb-20">
      <div className="absolute inset-0 bg-white" />
      <div
        className="absolute inset-0"
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 72%, 0% 100%)",
          background:
            "linear-gradient(115deg, #9b2c2c 0%, #b83280 18%, #6b46c1 35%, #3182ce 55%, #38b2ac 72%, #ecc94b 100%)",
        }}
      />
      <div className="absolute inset-0 bg-white/85" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(15,23,42,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(15,23,42,0.08) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative container mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_560px] gap-10 lg:gap-14 items-start">
          {/* Left side - Text content */}
          <div className="text-left pt-10 lg:pt-14">
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center rounded-full bg-white/70 px-3 py-1 text-[12px] font-semibold text-slate-700 shadow-sm ring-1 ring-black/5">
                Preview
              </div>

              <h1 className="mt-6 text-[44px] leading-[1.02] md:text-[56px] lg:text-[66px] font-extrabold tracking-tight text-slate-900">
                AI talent
                <br />
                infrastructure
                <br />
                to grow your lab
              </h1>

              <p className="mt-6 max-w-xl text-[15px] leading-7 text-slate-600">
                Connect companies and AI labs with top experts in LLMs, RL, CV, and safety. Automate screening, rank candidates, and move from request to interview in days.
              </p>

              <div className="mt-8 flex items-center gap-4">
                <Button className="rounded-full bg-slate-900 text-white hover:bg-slate-800 h-10 px-5 text-[13px]" asChild>
                  <Link to="/signup">Request access</Link>
                </Button>
                <Button variant="outline" className="rounded-full h-10 px-5 text-[13px] border-slate-200" asChild>
                  <Link to="/dashboard">View dashboard</Link>
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="pt-6 lg:pt-12">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
              <AiLabsHeroMock />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
 };

export default Hero;
