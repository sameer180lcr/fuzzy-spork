import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Define your role",
    description: "Describe the position, required skills, and evaluation criteria. Our system extracts key requirements automatically."
  },
  {
    number: "02",
    title: "AI sources & screens",
    description: "The platform matches candidates from our talent pool using semantic embeddings and ranks them by fit."
  },
  {
    number: "03",
    title: "Automated interviews",
    description: "Candidates complete AI-led interviews. Responses are scored against your rubric with full transcripts available."
  },
  {
    number: "04",
    title: "Review & hire",
    description: "Access your ranked shortlist with confidence scores, assessment details, and scheduling links to move fast."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground">
            From role definition to hire in days, not months.
          </p>
        </motion.div>
        
        <div className="space-y-0">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex gap-8 pb-12 last:pb-0"
            >
              {/* Connector line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-6 top-14 w-px h-[calc(100%-3.5rem)] bg-border" />
              )}
              
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-foreground text-background flex items-center justify-center font-semibold text-sm">
                {step.number}
              </div>
              
              <div className="pt-2">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
