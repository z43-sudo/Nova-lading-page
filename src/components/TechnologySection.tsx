import { motion } from "framer-motion";
import { ArrowRight, Sprout, CalendarDays, Shield, Droplets, CloudSun } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { icon: Sprout, text: "Monitoramento do cultivo" },
  { icon: CalendarDays, text: "Planejamento de plantio" },
  { icon: Shield, text: "Controle de defensivos" },
  { icon: Droplets, text: "Gestão de fertilizantes" },
  { icon: CloudSun, text: "Irrigação inteligente" },
];

const TechnologySection = () => {
  return (
    <section className="section-padding bg-muted">
      <div className="container-agro">
        <div className="green-box text-primary-foreground">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Tecnologia que faz{" "}
                <span className="text-agro-yellow">diferença</span> no campo.
              </h2>
              <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
                Descubra ferramentas e recursos que transformam a produtividade da sua fazenda com inteligência e simplicidade.
              </p>
              <Link to="/funcionalidades">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 bg-agro-yellow text-agro-green-dark font-bold px-6 py-3 rounded-full hover:bg-accent transition-colors"
                >
                  Explorar recursos
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Content - Feature List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="flex items-center gap-4 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-4 hover:bg-primary-foreground/15 transition-colors"
                >
                  <div className="icon-circle-white">
                    <feature.icon className="w-5 h-5 text-agro-yellow" />
                  </div>
                  <span className="text-lg font-semibold">{feature.text}</span>
                  <ArrowRight className="w-4 h-4 ml-auto text-primary-foreground/60" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologySection;
