import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 px-6 bg-[#F5F5F7]">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bento-card gradient-pro p-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Ready to transform
            <br />
            your hiring?
          </h2>
          <p className="text-lg text-white/70 mb-10 max-w-md mx-auto">
            Join 500+ companies using AI to find exceptional talent faster.
          </p>
          <div className="flex flex-col items-center">
            <Button size="lg" className="bg-white text-[#1D1D1F] hover:bg-white/90 rounded-full h-14 px-8 text-base group mb-4" asChild>
              <Link to="/signup">
                Start free trial
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <p className="text-xs text-white/70 text-center max-w-xs">
              By clicking "Start free trial", you agree to our{' '}
              <Link to="/terms-and-conditions" className="text-white underline hover:no-underline">Terms</Link> and{' '}
              <Link to="/privacy-policy" className="text-white underline hover:no-underline">Privacy Policy</Link>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
