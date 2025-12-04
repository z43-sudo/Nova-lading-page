import { motion } from "framer-motion";
import {
    LayoutDashboard,
    Menu,
    Puzzle,
    BarChart3,
    Radio,
    Smartphone,
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    Map,
    Package,
    Calendar,
    Leaf,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const features = [
    {
        icon: LayoutDashboard,
        title: "Dashboard Inteligente",
        description: "Visão consolidada da fazenda com dados em tempo real",
        details: [
            "Visão geral de toda operação",
            "Dados atualizados automaticamente",
            "Layout profissional e intuitivo",
            "Análise de desempenho integrada",
        ],
    },
    {
        icon: Menu,
        title: "Menu Lateral Rápido",
        description: "Navegação intuitiva e acesso facilitado",
        details: [
            "Acesso rápido a todas funções",
            "Organização lógica de módulos",
            "Interface responsiva",
            "Customização por perfil",
        ],
    },
    {
        icon: Puzzle,
        title: "Arquitetura Modular",
        description: "Pronto para expansão e agricultura de precisão",
        details: [
            "Módulos independentes",
            "Fácil integração de novos recursos",
            "Escalável conforme necessidade",
            "Suporte a agricultura de precisão",
        ],
    },
    {
        icon: BarChart3,
        title: "Painéis e Relatórios",
        description: "Análise de dados e gráficos avançados",
        details: [
            "Gráficos interativos",
            "Relatórios customizáveis",
            "Exportação de dados",
            "Indicadores de performance",
        ],
    },
    {
        icon: Radio,
        title: "Preparado para IoT",
        description: "Base para integração com sensores ópticos",
        details: [
            "Suporte a sensores ópticos",
            "Monitoramento em tempo real",
            "Alertas automáticos",
            "Integração com dispositivos IoT",
        ],
    },
    {
        icon: Smartphone,
        title: "Experiência Fluida",
        description: "Otimizado para uso direto no campo",
        details: [
            "Interface responsiva",
            "Otimizado para mobile",
            "Sincronização automática",
            "Funciona offline",
        ],
    },
];

const additionalFeatures = [
    { icon: Map, text: "Controle de Talhões" },
    { icon: Package, text: "Gestão de Insumos" },
    { icon: Calendar, text: "Planejamento de Atividades" },
    { icon: TrendingUp, text: "Análise de Produtividade" },
    { icon: Leaf, text: "Sustentabilidade" },
    { icon: CheckCircle2, text: "Rastreabilidade Completa" },
];

const Funcionalidades = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-b from-secondary to-background pt-32">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto mb-16"
                        >
                            <span className="inline-block px-4 py-1.5 bg-agro-lime/20 text-agro-green-dark rounded-full text-sm font-semibold mb-6">
                                Funcionalidades
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                Tudo que você precisa para{" "}
                                <span className="text-primary">gerenciar sua fazenda</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Uma plataforma completa, moderna e intuitiva, desenvolvida
                                especialmente para o agronegócio brasileiro.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Main Features Grid */}
                <section className="section-padding bg-background">
                    <div className="container-agro">
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card p-8 hover:shadow-glow transition-all duration-300 group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                        <feature.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground mb-6">
                                        {feature.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {feature.details.map((detail) => (
                                            <li
                                                key={detail}
                                                className="flex items-start gap-2 text-sm text-foreground"
                                            >
                                                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Additional Features Highlight */}
                <section className="section-padding bg-muted">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                E muito mais funcionalidades
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Recursos adicionais para otimizar cada aspecto da sua gestão
                                agrícola.
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                            {additionalFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.text}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className="bg-card rounded-2xl p-6 text-center hover:shadow-card transition-all duration-300"
                                >
                                    <feature.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                                    <p className="text-sm font-semibold text-foreground">
                                        {feature.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-agro-green-dark/50 to-transparent" />

                    <div className="container-agro relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                                Pronto para modernizar sua gestão agrícola?
                            </h2>
                            <p className="text-lg text-primary-foreground/90 mb-8">
                                Comece agora mesmo e transforme a forma como você gerencia sua
                                fazenda.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link to="/entrar">
                                    <Button variant="hero" size="lg" className="group w-full sm:w-auto">
                                        Começar agora
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link to="/blog">
                                    <Button variant="hero-outline" size="lg" className="w-full sm:w-auto">
                                        Ver demonstração
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Funcionalidades;
