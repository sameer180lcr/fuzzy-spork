import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-foreground text-background rounded-3xl p-12 md:p-16 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Ready to transform your hiring?
          </h2>
          <p className="text-background/70 mb-8 max-w-md mx-auto">
            Join 500+ companies using AI to find and hire exceptional talent faster than ever.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 group"
            >
              Start free trial
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="text-background/80 hover:text-background hover:bg-background/10"
            >
              Talk to sales
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
