import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="pt-36 pb-24 px-6 bg-[#F5F5F7]">
      <div className="container mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-white text-sm font-medium border border-[#1D1D1F]/10 shadow-sm mb-8">
            <span className="w-2 h-2 rounded-full gradient-pro mr-2" />
            <span className="text-[#1D1D1F]/70">AI-powered hiring platform</span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-[#1D1D1F] mb-6 leading-[1.05]"
        >
          Hire the best talent.
          <br />
          <span className="gradient-pro-text">10x faster.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-xl text-[#1D1D1F]/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Automate sourcing, conduct AI-led interviews, and get ranked shortlists
          of qualified candidates — all in one platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <Button size="lg" className="bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90 rounded-full h-14 px-8 text-base group" asChild>
            <Link to="/dashboard">
              Start hiring free
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-20 flex items-center justify-center gap-16"
        >
          <div className="text-center">
            <p className="text-4xl font-bold text-[#0071E3]">500+</p>
            <p className="text-sm text-[#1D1D1F]/50 mt-1">Companies</p>
          </div>
          <div className="w-px h-12 bg-[#1D1D1F]/10" />
          <div className="text-center">
            <p className="text-4xl font-bold text-[#0071E3]">50k+</p>
            <p className="text-sm text-[#1D1D1F]/50 mt-1">Candidates</p>
          </div>
          <div className="w-px h-12 bg-[#1D1D1F]/10" />
          <div className="text-center">
            <p className="text-4xl font-bold text-[#0071E3]">3 days</p>
            <p className="text-sm text-[#1D1D1F]/50 mt-1">Avg. time to hire</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
