import { motion } from "framer-motion";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-farm.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Plantação ao amanhecer com trator"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-agro-green-dark/90 via-agro-green-dark/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-agro relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-agro-lime/90 text-foreground px-4 py-2 rounded-full mb-8"
          >
            <span className="font-semibold">Agronegócio</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground leading-tight mb-6"
          >
            Seu campo{" "}
            <span className="text-agro-lime">mais produtivo</span>{" "}
            começa aqui.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-primary-foreground/90 mb-10 leading-relaxed"
          >
            Gestão agrícola simples, inteligente e de alta precisão.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/entrar">
              <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                Começar agora
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/funcionalidades">
              <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                Saiba mais
              </Button>
            </Link>
          </motion.div>

          {/* Logo/Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-agro-lime flex items-center justify-center">
              <Leaf className="w-5 h-5 text-agro-green-dark" />
            </div>
            <div>
              <span className="text-xl font-bold text-primary-foreground">
                Agro<span className="text-agro-lime">Inteligente</span>
              </span>
              <p className="text-sm text-primary-foreground/70">
                Tecnologia para o campo
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-10 right-10 hidden lg:block"
      >
        <div className="w-20 h-20 rounded-full bg-agro-yellow/20 blur-2xl" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
