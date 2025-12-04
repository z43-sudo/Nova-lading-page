import { motion } from "framer-motion";
import {
    Target,
    Lightbulb,
    Users,
    TrendingUp,
    Leaf,
    Heart,
    ArrowRight,
    CheckCircle2,
    Sprout,
    Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const values = [
    {
        icon: Target,
        title: "Missão",
        description:
            "Democratizar a tecnologia agrícola, tornando a gestão profissional acessível a produtores de todos os tamanhos.",
    },
    {
        icon: Lightbulb,
        title: "Inovação",
        description:
            "Buscar constantemente as melhores soluções tecnológicas adaptadas à realidade do campo brasileiro.",
    },
    {
        icon: Heart,
        title: "Compromisso",
        description:
            "Estar ao lado do produtor rural, entendendo suas necessidades e oferecendo suporte dedicado.",
    },
];

const problems = [
    {
        title: "Gestão Manual e Fragmentada",
        description:
            "Controle em cadernos, planilhas soltas e falta de visão integrada da fazenda.",
    },
    {
        title: "Decisões sem Dados",
        description:
            "Dificuldade em analisar produtividade, custos e planejar safras de forma estratégica.",
    },
    {
        title: "Perda de Tempo",
        description:
            "Horas gastas procurando informações que deveriam estar centralizadas e acessíveis.",
    },
    {
        title: "Falta de Rastreabilidade",
        description:
            "Impossibilidade de comprovar processos e garantir conformidade com certificações.",
    },
];

const solutions = [
    {
        icon: TrendingUp,
        title: "Mais Produtividade",
        description: "Dados centralizados para decisões mais rápidas e assertivas",
    },
    {
        icon: Sprout,
        title: "Melhor Planejamento",
        description: "Planeje safras e atividades com base em histórico e análises",
    },
    {
        icon: Shield,
        title: "Rastreabilidade Total",
        description: "Comprove processos e atenda certificações com facilidade",
    },
    {
        icon: Leaf,
        title: "Sustentabilidade",
        description: "Otimize recursos e reduza desperdícios na sua operação",
    },
];

const timeline = [
    {
        year: "2022",
        title: "Fundação",
        description: "Nascimento do Agro Inteligente com foco em simplificar a gestão agrícola.",
    },
    {
        year: "2023",
        title: "Primeiros Clientes",
        description: "Lançamento da plataforma e validação com produtores pioneiros.",
    },
    {
        year: "2024",
        title: "Expansão",
        description: "Crescimento para todo Brasil e desenvolvimento de novos módulos.",
    },
    {
        year: "2025",
        title: "Agricultura 5.0",
        description: "Integração com IoT, sensores ópticos e inteligência artificial.",
    },
];

const Sobre = () => {
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
                            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                                <Leaf className="w-10 h-10 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                Tecnologia que{" "}
                                <span className="text-primary">transforma o campo</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Somos uma plataforma brasileira dedicada a modernizar a gestão
                                agrícola com simplicidade, inteligência e foco no produtor.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Mission & Values */}
                <section className="section-padding bg-background">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="inline-block px-4 py-1.5 bg-agro-lime/20 text-agro-green-dark rounded-full text-sm font-semibold mb-4">
                                Nossos Valores
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Por que existimos
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Acreditamos que tecnologia e agricultura caminham juntas rumo ao
                                futuro do agronegócio.
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={value.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card p-8 text-center"
                                >
                                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <value.icon className="w-8 h-8 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground mb-4">
                                        {value.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="section-padding bg-muted">
                    <div className="container-agro">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-semibold mb-6">
                                    O Problema
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                    Desafios enfrentados pelos{" "}
                                    <span className="text-primary">produtores rurais</span>
                                </h2>
                                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                    Identificamos que muitos produtores enfrentam dificuldades
                                    significativas na gestão diária de suas propriedades, perdendo
                                    oportunidades de crescimento e eficiência.
                                </p>
                                <Users className="w-32 h-32 text-primary/20" />
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-4"
                            >
                                {problems.map((problem, index) => (
                                    <motion.div
                                        key={problem.title}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="glass-card p-6"
                                    >
                                        <h4 className="font-bold text-foreground mb-2">
                                            {problem.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground">
                                            {problem.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Solution Section */}
                <section className="section-padding bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-agro-green-dark/50 to-transparent" />

                    <div className="container-agro relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="order-2 lg:order-1"
                            >
                                <div className="grid grid-cols-2 gap-6">
                                    {solutions.map((solution, index) => (
                                        <motion.div
                                            key={solution.title}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                            className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 text-center"
                                        >
                                            <solution.icon className="w-8 h-8 text-agro-lime mx-auto mb-3" />
                                            <h4 className="font-bold text-primary-foreground mb-2">
                                                {solution.title}
                                            </h4>
                                            <p className="text-sm text-primary-foreground/80">
                                                {solution.description}
                                            </p>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="order-1 lg:order-2"
                            >
                                <span className="inline-block px-4 py-1.5 bg-agro-lime text-agro-green-dark rounded-full text-sm font-semibold mb-6">
                                    Nossa Solução
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                                    Como ajudamos produtores a terem{" "}
                                    <span className="text-agro-lime">mais produtividade</span>
                                </h2>
                                <p className="text-lg text-primary-foreground/90 mb-6 leading-relaxed">
                                    O Agro Inteligente centraliza toda a gestão da fazenda em uma
                                    única plataforma intuitiva e poderosa.
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-start gap-3 text-primary-foreground">
                                        <CheckCircle2 className="w-5 h-5 text-agro-lime mt-0.5 flex-shrink-0" />
                                        <span>Interface simples e fácil de usar</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-primary-foreground">
                                        <CheckCircle2 className="w-5 h-5 text-agro-lime mt-0.5 flex-shrink-0" />
                                        <span>Dados em tempo real e histórico completo</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-primary-foreground">
                                        <CheckCircle2 className="w-5 h-5 text-agro-lime mt-0.5 flex-shrink-0" />
                                        <span>Funciona no celular, tablet e computador</span>
                                    </li>
                                    <li className="flex items-start gap-3 text-primary-foreground">
                                        <CheckCircle2 className="w-5 h-5 text-agro-lime mt-0.5 flex-shrink-0" />
                                        <span>Suporte especializado em agronegócio</span>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Philosophy */}
                <section className="section-padding bg-background">
                    <div className="container-agro max-w-4xl text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                Nossa filosofia:{" "}
                                <span className="text-primary">Tecnologia + Simplicidade</span>
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Acreditamos que não adianta ter a tecnologia mais avançada se ela
                                for complicada de usar. Por isso, desenvolvemos uma plataforma que
                                une poder e simplicidade, pensada para quem vive o dia a dia do
                                campo.
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 mt-12">
                                <div className="glass-card p-6">
                                    <div className="text-4xl font-bold text-primary mb-2">98%</div>
                                    <p className="text-sm text-muted-foreground">
                                        Satisfação dos clientes
                                    </p>
                                </div>
                                <div className="glass-card p-6">
                                    <div className="text-4xl font-bold text-primary mb-2">30%</div>
                                    <p className="text-sm text-muted-foreground">
                                        Redução de custos média
                                    </p>
                                </div>
                                <div className="glass-card p-6">
                                    <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                                    <p className="text-sm text-muted-foreground">
                                        Acesso aos seus dados
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Timeline */}
                <section className="section-padding bg-muted">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Nossa jornada
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Do início até o futuro da agricultura de precisão
                            </p>
                        </motion.div>

                        <div className="max-w-4xl mx-auto">
                            {timeline.map((item, index) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="flex gap-8 mb-12 last:mb-0"
                                >
                                    <div className="flex-shrink-0 w-24 text-right">
                                        <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold">
                                            {item.year}
                                        </div>
                                    </div>
                                    <div className="flex-grow glass-card p-6">
                                        <h3 className="text-xl font-bold text-foreground mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-secondary">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                Pronto para conhecer todas as{" "}
                                <span className="text-primary">funcionalidades</span>?
                            </h2>
                            <p className="text-lg text-muted-foreground mb-8">
                                Veja como o Agro Inteligente pode transformar a gestão da sua
                                fazenda.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button variant="default" size="lg" className="group">
                                    Ver funcionalidades
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                                <Button variant="outline" size="lg">
                                    Começar teste grátis
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Sobre;
