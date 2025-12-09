import { motion } from "framer-motion";
import { Users, MessageSquare, Sparkles, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Employer Dashboard",
    description: "Post roles, set requirements, and review AI-ranked candidate shortlists with detailed assessment transcripts.",
    details: ["Role-specific criteria", "Ranked shortlists", "Interview transcripts"]
  },
  {
    icon: MessageSquare,
    title: "AI Interviews",
    description: "Automated interviews powered by LLMs that ask role-specific questions and evaluate responses with rubric scoring.",
    details: ["Async or live modes", "Auto-scoring", "Structured feedback"]
  },
  {
    icon: Sparkles,
    title: "Smart Matching",
    description: "Semantic matching using transformer embeddings connects candidates to roles based on skills, experience, and fit.",
    details: ["Skill extraction", "Portfolio analysis", "Confidence scores"]
  },
  {
    icon: BarChart3,
    title: "Candidate Profiles",
    description: "Candidates create rich profiles from resumes, GitHub, and portfolios. Take assessments and receive actionable feedback.",
    details: ["Resume parsing", "Code quality metrics", "Micro-task assessments"]
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Four pillars of intelligent hiring
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every component designed to reduce manual work and produce measurable, high-quality matches.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-2xl p-8 border border-border hover:border-primary/20 hover:shadow-medium transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {feature.details.map((detail) => (
                  <span
                    key={detail}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
