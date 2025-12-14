import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
    {
        name: "Starter",
        price: { monthly: 49, annual: 39 },
        description: "For small teams getting started",
        features: [
            "Up to 3 active job postings",
            "50 AI interviews/month",
            "Basic candidate matching",
            "Email support",
        ],
        cta: "Start free trial",
    },
    {
        name: "Pro",
        price: { monthly: 149, annual: 119 },
        description: "For growing companies",
        features: [
            "Unlimited job postings",
            "Unlimited AI interviews",
            "Advanced matching",
            "Priority support",
            "Custom questions",
            "API access",
        ],
        cta: "Start free trial",
        featured: true,
    },
    {
        name: "Enterprise",
        price: { monthly: null, annual: null },
        description: "For large organizations",
        features: [
            "Everything in Pro",
            "Dedicated manager",
            "Custom integrations",
            "SLA guarantee",
            "Advanced analytics",
        ],
        cta: "Contact sales",
    },
];

const Pricing = () => {
    const [isAnnual, setIsAnnual] = useState(true);

    return (
        <section id="pricing" className="py-24 px-6 bg-white">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] mb-5">
                        Simple pricing
                    </h2>
                    <p className="text-lg text-[#1D1D1F]/50 max-w-xl mx-auto mb-8">
                        Start with a 14-day free trial. No credit card required.
                    </p>

                    {/* Billing Toggle */}
                    <div className="inline-flex items-center gap-1 p-1.5 rounded-full bg-[#F5F5F7]">
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${!isAnnual ? "bg-[#1D1D1F] text-white" : "text-[#1D1D1F]/50"
                                }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${isAnnual ? "bg-[#1D1D1F] text-white" : "text-[#1D1D1F]/50"
                                }`}
                        >
                            Annual
                            <span className="ml-2 text-xs opacity-70">Save 20%</span>
                        </button>
                    </div>
                </motion.div>

                <div className="bento-grid grid-cols-3">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={`bento-card p-8 ${plan.featured
                                    ? "bg-[#1D1D1F] text-white"
                                    : "bg-[#F5F5F7]"
                                }`}
                        >
                            <div className="mb-6">
                                <h3 className={`text-xl font-semibold mb-1 ${plan.featured ? "text-white" : "text-[#1D1D1F]"}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm ${plan.featured ? "text-white/60" : "text-[#1D1D1F]/50"}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                {plan.price.monthly !== null ? (
                                    <>
                                        <span className={`text-4xl font-bold ${plan.featured ? "text-white" : "text-[#1D1D1F]"}`}>
                                            ${isAnnual ? plan.price.annual : plan.price.monthly}
                                        </span>
                                        <span className={plan.featured ? "text-white/60" : "text-[#1D1D1F]/50"}>/month</span>
                                    </>
                                ) : (
                                    <span className={`text-3xl font-bold ${plan.featured ? "text-white" : "text-[#1D1D1F]"}`}>
                                        Custom
                                    </span>
                                )}
                            </div>

                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature) => (
                                    <li key={feature} className={`flex items-center gap-3 text-sm ${plan.featured ? "text-white/80" : "text-[#1D1D1F]"}`}>
                                        <Check className={`w-4 h-4 shrink-0 ${plan.featured ? "text-[#FF8756]" : "text-[#0071E3]"}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className={`w-full rounded-full ${plan.featured
                                        ? "bg-white text-[#1D1D1F] hover:bg-white/90"
                                        : "bg-[#0071E3] text-white hover:bg-[#0071E3]/90"
                                    }`}
                                asChild
                            >
                                <Link to="/signup">{plan.cta}</Link>
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;
