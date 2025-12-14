import { motion } from "framer-motion";
import { Users, MessageSquare, Sparkles, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employer Dashboard",
    description: "Post roles, set requirements, and review AI-ranked candidate shortlists.",
    color: "#0071E3",
    span: "col-span-1",
  },
  {
    icon: MessageSquare,
    title: "AI Interviews",
    description: "Automated interviews that evaluate responses with rubric scoring.",
    color: "#FF8756",
    span: "col-span-1",
  },
  {
    icon: Sparkles,
    title: "Smart Matching",
    description: "Semantic matching connects candidates to roles based on skills and fit.",
    color: "#9D8068",
    span: "col-span-1",
  },
  {
    icon: BarChart3,
    title: "Candidate Profiles",
    description: "Rich profiles from resumes, GitHub, and portfolios with assessments.",
    color: "#0071E3",
    span: "col-span-1",
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] mb-5">
            Intelligent hiring.
            <br />
            <span className="gradient-pro-text">Built for speed.</span>
          </h2>
          <p className="text-lg text-[#1D1D1F]/50 max-w-xl mx-auto">
            Every component designed to reduce manual work and produce high-quality matches.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bento-card bg-[#F5F5F7] p-10 ${feature.span}`}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${feature.color}12` }}
              >
                <feature.icon className="w-7 h-7" style={{ color: feature.color }} />
              </div>

              <h3 className="text-2xl font-semibold text-[#1D1D1F] mb-3">{feature.title}</h3>
              <p className="text-[#1D1D1F]/50 leading-relaxed text-lg">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
