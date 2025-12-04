import { motion } from "framer-motion";
import { Map, Package, Calendar, Target, BarChart3, Wallet } from "lucide-react";

const benefits = [
  {
    icon: Map,
    title: "Controle de Talhões",
    description: "Gerencie suas áreas de cultivo com precisão e organização.",
  },
  {
    icon: Package,
    title: "Gestão de Insumos",
    description: "Controle completo de sementes, fertilizantes e defensivos.",
  },
  {
    icon: Calendar,
    title: "Atividades Agrícolas",
    description: "Planeje e acompanhe todas as atividades do campo.",
  },
  {
    icon: Target,
    title: "Agricultura de Precisão",
    description: "Tecnologia avançada para maximizar resultados.",
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description: "Dados e insights para decisões estratégicas.",
  },
  {
    icon: Wallet,
    title: "Gestão Financeira",
    description: "Controle total de custos, receitas e fluxo de caixa da propriedade.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const BenefitsSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-agro">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-secondary text-secondary-foreground rounded-full text-sm font-semibold mb-4">
            Benefícios
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tudo que você precisa em{" "}
            <span className="text-primary">um só lugar</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ferramentas completas para modernizar a gestão da sua propriedade rural.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              className="glass-card p-6 md:p-8 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
            >
              <div className="icon-circle mb-5">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                {benefit.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
