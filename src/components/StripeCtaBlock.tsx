import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const StripeCtaBlock = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(155,44,44,0.18) 0%, rgba(184,50,128,0.18) 18%, rgba(107,70,193,0.18) 35%, rgba(49,130,206,0.18) 55%, rgba(56,178,172,0.18) 72%, rgba(236,201,75,0.18) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(15,23,42,0.14) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
          maskImage:
            "radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 76%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 40%, rgba(0,0,0,1) 0%, rgba(0,0,0,0.6) 45%, rgba(0,0,0,0) 76%)",
          opacity: 0.35,
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-slate-100 bg-white/70 backdrop-blur-sm shadow-[0_30px_90px_rgba(15,23,42,0.12)]"
        >
          <div className="px-8 py-10 md:px-12 md:py-12">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
              <div>
                <div className="text-[12px] font-semibold text-indigo-600 tracking-wide">
                  Get started
                </div>
                <h3 className="mt-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
                  Ready to build your AI hiring pipeline?
                </h3>
                <p className="mt-4 max-w-2xl text-[14px] leading-7 text-slate-600">
                  Request access to onboard your lab, or talk to sales to design a workflow
                  that fits your hiring process.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-start lg:justify-end">
                <Button
                  className="rounded-full bg-slate-900 text-white hover:bg-slate-800 h-11 px-6 text-[13px]"
                  asChild
                >
                  <Link to="/signup">
                    Request access
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  variant="outline"
                  className="rounded-full h-11 px-6 text-[13px] border-slate-200 bg-white/70"
                  asChild
                >
                  <Link to="/contact">Contact sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StripeCtaBlock;
