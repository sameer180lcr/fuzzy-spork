import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Define your role",
    description: "Describe the position and requirements. Our AI extracts key criteria automatically."
  },
  {
    number: "02",
    title: "AI sources & screens",
    description: "The platform matches candidates using semantic embeddings and ranks them by fit."
  },
  {
    number: "03",
    title: "Automated interviews",
    description: "Candidates complete AI-led interviews with responses scored against your rubric."
  },
  {
    number: "04",
    title: "Review & hire",
    description: "Access your ranked shortlist with confidence scores and move fast."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 bg-[#F5F5F7]">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] mb-5">
            How it works
          </h2>
          <p className="text-lg text-[#1D1D1F]/50">
            From role definition to hire in days, not months.
          </p>
        </motion.div>

        <div className="bento-grid grid-cols-1">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bento-card bg-white flex gap-6 items-start p-8"
            >
              <span className="text-4xl font-bold gradient-pro-text shrink-0">
                {step.number}
              </span>

              <div>
                <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">{step.title}</h3>
                <p className="text-[#1D1D1F]/50 leading-relaxed">
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
