import { motion } from "framer-motion";
import {
    Smartphone,
    Download,
    Star,
    Users,
    TrendingUp,
    Shield,
    Zap,
    Heart,
    CheckCircle2,
    Play,
    ArrowRight,
    Sparkles,
    BarChart3,
    Cloud,
    Bell,
    Lock,
    LayoutDashboard,
    Map,
    Plus,
    User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const appFeatures = [
    {
        icon: Smartphone,
        title: "Interface Intuitiva",
        description: "Design moderno e fácil de usar, pensado para o dia a dia do campo",
    },
    {
        icon: Cloud,
        title: "Sincronização em Nuvem",
        description: "Acesse seus dados de qualquer lugar, em qualquer dispositivo",
    },
    {
        icon: BarChart3,
        title: "Relatórios Inteligentes",
        description: "Análises detalhadas e gráficos em tempo real da sua produção",
    },
    {
        icon: Bell,
        title: "Notificações Smart",
        description: "Alertas personalizados sobre clima, atividades e prazos",
    },
    {
        icon: Lock,
        title: "Segurança Total",
        description: "Seus dados protegidos com criptografia de ponta a ponta",
    },
    {
        icon: Zap,
        title: "Performance Rápida",
        description: "Aplicativo otimizado para funcionar mesmo com internet lenta",
    },
];

const stats = [
    {
        icon: Users,
        value: "10.000+",
        label: "Produtores ativos",
    },
    {
        icon: Star,
        value: "4.9/5",
        label: "Avaliação média",
    },
    {
        icon: TrendingUp,
        value: "35%",
        label: "Aumento de produtividade",
    },
    {
        icon: Shield,
        value: "99.9%",
        label: "Uptime garantido",
    },
];

const testimonials = [
    {
        name: "João Silva",
        role: "Produtor de Soja - MT",
        avatar: "👨‍🌾",
        rating: 5,
        comment:
            "O app mudou completamente a forma como gerencio minha fazenda. Consigo acompanhar tudo em tempo real, mesmo quando estou longe.",
    },
    {
        name: "Maria Santos",
        role: "Pecuarista - GO",
        avatar: "👩‍🌾",
        rating: 5,
        comment:
            "Simples, prático e muito eficiente. Finalmente encontrei uma solução que realmente funciona para o agronegócio.",
    },
    {
        name: "Carlos Oliveira",
        role: "Agricultor Familiar - PR",
        avatar: "👨‍🌾",
        rating: 5,
        comment:
            "Excelente custo-benefício! O suporte é ótimo e o app tem todas as funcionalidades que eu preciso.",
    },
];

const appScreenshots = [
    {
        title: "Dashboard Completo",
        description: "Visão geral de toda sua operação em uma tela",
        color: "from-blue-500 to-cyan-500",
    },
    {
        title: "Gestão de Atividades",
        description: "Organize e acompanhe todas as tarefas da fazenda",
        color: "from-green-500 to-emerald-500",
    },
    {
        title: "Análise de Dados",
        description: "Gráficos e relatórios detalhados de produtividade",
        color: "from-purple-500 to-pink-500",
    },
    {
        title: "Clima em Tempo Real",
        description: "Previsão do tempo e alertas meteorológicos",
        color: "from-orange-500 to-red-500",
    },
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main>
                {/* Hero Section */}
                <section className="section-padding bg-gradient-to-b from-primary to-agro-green-dark pt-32 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-agro-lime rounded-full blur-3xl animate-pulse" />
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-agro-lime rounded-full blur-3xl animate-pulse delay-1000" />
                    </div>

                    <div className="container-agro relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 bg-agro-lime text-agro-green-dark px-4 py-2 rounded-full mb-6">
                                    <Sparkles className="w-4 h-4" />
                                    <span className="text-sm font-semibold">
                                        Novo: Versão 2.0 disponível!
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
                                    Conheça o{" "}
                                    <span className="text-agro-lime">Agro Inteligente</span>
                                </h1>
                                <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
                                    O aplicativo completo de gestão agrícola que cabe no seu bolso.
                                    Gerencie sua fazenda com inteligência, onde quer que você esteja.
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                    <Link to="/precos">
                                        <Button
                                            size="lg"
                                            className="bg-agro-lime text-agro-green-dark hover:bg-agro-lime/90 group w-full sm:w-auto"
                                        >
                                            Começar agora
                                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
                                    >
                                        <Play className="w-5 h-5" />
                                        Ver demonstração
                                    </Button>
                                </div>

                                <div className="flex items-center gap-6 text-primary-foreground/80">
                                    <div className="flex items-center gap-2">
                                        <Download className="w-5 h-5 text-agro-lime" />
                                        <span className="text-sm">10.000+ downloads</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Star className="w-5 h-5 text-agro-lime fill-agro-lime" />
                                        <span className="text-sm">4.9 estrelas</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative"
                            >
                                {/* Phone Mockup */}
                                <div className="relative mx-auto w-full max-w-sm">
                                    <div className="bg-gradient-to-br from-agro-lime to-white rounded-[3rem] p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                        <div className="bg-white rounded-[2.5rem] p-4 aspect-[9/19] flex flex-col overflow-hidden relative">
                                            {/* App Header */}
                                            <div className="flex items-center justify-between mb-6 pt-2">
                                                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <div className="w-4 h-0.5 bg-gray-600 rounded-full shadow-[0_6px_0_0_rgb(75,85,99),0_-6px_0_0_rgb(75,85,99)]" />
                                                </div>
                                                <div className="font-bold text-gray-800">AgroApp</div>
                                                <div className="w-8 h-8 bg-agro-lime rounded-full flex items-center justify-center text-xs font-bold text-agro-green-dark">
                                                    JS
                                                </div>
                                            </div>

                                            {/* Welcome Card */}
                                            <div className="bg-agro-green-dark text-white p-4 rounded-2xl mb-4 shadow-lg">
                                                <div className="text-xs text-white/70 mb-1">Bem-vindo de volta</div>
                                                <div className="font-bold text-lg mb-3">João Silva</div>
                                                <div className="flex gap-3">
                                                    <div className="bg-white/10 rounded-lg p-2 flex-1">
                                                        <div className="text-[10px] text-white/70">Soja</div>
                                                        <div className="font-bold text-sm">1.2k sc</div>
                                                    </div>
                                                    <div className="bg-white/10 rounded-lg p-2 flex-1">
                                                        <div className="text-[10px] text-white/70">Milho</div>
                                                        <div className="font-bold text-sm">850 sc</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Stats Row */}
                                            <div className="flex gap-3 mb-4">
                                                <div className="bg-blue-50 p-3 rounded-2xl flex-1">
                                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-2">
                                                        <Cloud className="w-4 h-4 text-blue-600" />
                                                    </div>
                                                    <div className="font-bold text-gray-800 text-sm">24°C</div>
                                                    <div className="text-[10px] text-gray-500">Parcialmente nublado</div>
                                                </div>
                                                <div className="bg-green-50 p-3 rounded-2xl flex-1">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mb-2">
                                                        <TrendingUp className="w-4 h-4 text-green-600" />
                                                    </div>
                                                    <div className="font-bold text-gray-800 text-sm">+15%</div>
                                                    <div className="text-[10px] text-gray-500">Produtividade</div>
                                                </div>
                                            </div>

                                            {/* Activity List */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-center mb-3">
                                                    <div className="font-bold text-gray-800 text-sm">Atividades</div>
                                                    <div className="text-[10px] text-primary font-medium">Ver tudo</div>
                                                </div>
                                                <div className="space-y-3">
                                                    {[
                                                        { title: "Plantio Talhão A", time: "08:00", color: "bg-orange-100 text-orange-600" },
                                                        { title: "Manutenção Trator", time: "10:30", color: "bg-blue-100 text-blue-600" },
                                                        { title: "Aplicação Defensivo", time: "14:00", color: "bg-purple-100 text-purple-600" },
                                                    ].map((item, i) => (
                                                        <div key={i} className="flex items-center gap-3 bg-gray-50 p-2.5 rounded-xl">
                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                                                                <CheckCircle2 className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <div className="font-bold text-gray-800 text-xs">{item.title}</div>
                                                                <div className="text-[10px] text-gray-500">Hoje, {item.time}</div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Bottom Nav */}
                                            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex justify-around items-center">
                                                <div className="text-primary"><LayoutDashboard className="w-6 h-6" /></div>
                                                <div className="text-gray-300"><Map className="w-6 h-6" /></div>
                                                <div className="w-12 h-12 bg-primary rounded-full -mt-8 flex items-center justify-center shadow-lg border-4 border-white text-white">
                                                    <Plus className="w-6 h-6" />
                                                </div>
                                                <div className="text-gray-300"><BarChart3 className="w-6 h-6" /></div>
                                                <div className="text-gray-300"><User className="w-6 h-6" /></div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Floating Elements */}
                                    <div className="absolute -top-4 -right-4 bg-agro-lime text-agro-green-dark px-4 py-2 rounded-full font-bold shadow-lg animate-bounce">
                                        Novo!
                                    </div>
                                    <div className="absolute -bottom-4 -left-4 bg-primary-foreground text-primary px-4 py-2 rounded-full font-bold shadow-lg">
                                        Grátis 30 dias
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="section-padding bg-background">
                    <div className="container-agro">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card p-8 text-center hover:shadow-card transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="text-3xl font-bold text-primary mb-2">
                                        {stat.value}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="section-padding bg-muted">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                                Recursos do App
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                                Tudo que você precisa em{" "}
                                <span className="text-primary">um só lugar</span>
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Desenvolvido especialmente para atender as necessidades do
                                agronegócio brasileiro
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {appFeatures.map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card p-8 hover:shadow-card transition-all duration-300 group"
                                >
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold text-foreground mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Screenshots Section */}
                <section className="section-padding bg-background">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Veja o app em ação
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Interface moderna e intuitiva, projetada para facilitar sua rotina
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {appScreenshots.map((screenshot, index) => (
                                <motion.div
                                    key={screenshot.title}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="group cursor-pointer"
                                >
                                    <div
                                        className={`bg-gradient-to-br ${screenshot.color} rounded-3xl p-8 aspect-[9/16] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300 shadow-lg`}
                                    >
                                        <Smartphone className="w-20 h-20 text-white" />
                                    </div>
                                    <h3 className="font-bold text-foreground mb-2">
                                        {screenshot.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {screenshot.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="section-padding bg-primary relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-agro-green-dark/50 to-transparent" />

                    <div className="container-agro relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-16"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                                O que nossos clientes dizem
                            </h2>
                            <p className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                                Histórias reais de produtores que transformaram suas fazendas
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 bg-agro-lime rounded-full flex items-center justify-center text-2xl">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-primary-foreground">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-primary-foreground/70">
                                                {testimonial.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-1 mb-4">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className="w-4 h-4 text-agro-lime fill-agro-lime"
                                            />
                                        ))}
                                    </div>
                                    <p className="text-primary-foreground/90 leading-relaxed">
                                        "{testimonial.comment}"
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How it Works Section */}
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
                                Como funciona
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                                Comece a usar em 3 passos simples
                            </p>
                        </motion.div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {[
                                {
                                    step: "1",
                                    title: "Crie sua conta",
                                    description:
                                        "Cadastre-se gratuitamente e configure sua fazenda em minutos",
                                },
                                {
                                    step: "2",
                                    title: "Configure suas áreas",
                                    description:
                                        "Adicione talhões, culturas e comece a registrar atividades",
                                },
                                {
                                    step: "3",
                                    title: "Gerencie com inteligência",
                                    description:
                                        "Acompanhe tudo em tempo real e tome decisões baseadas em dados",
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <div className="glass-card p-8 text-center">
                                        <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold shadow-glow">
                                            {item.step}
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground mb-3">
                                            {item.title}
                                        </h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                    {index < 2 && (
                                        <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                                            <ArrowRight className="w-8 h-8 text-primary" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section-padding bg-gradient-to-br from-agro-green-dark to-primary">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center max-w-3xl mx-auto"
                        >
                            <Heart className="w-16 h-16 text-agro-lime mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                                Pronto para revolucionar sua{" "}
                                <span className="text-agro-lime">gestão agrícola</span>?
                            </h2>
                            <p className="text-lg text-primary-foreground/90 mb-8">
                                Junte-se a milhares de produtores que já estão gerenciando suas
                                fazendas de forma mais inteligente.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                                <Link to="/precos">
                                    <Button
                                        size="lg"
                                        className="bg-agro-lime text-agro-green-dark hover:bg-agro-lime/90 group w-full sm:w-auto"
                                    >
                                        Começar teste grátis
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                                <Link to="/contato">
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary w-full sm:w-auto"
                                    >
                                        Falar com especialista
                                    </Button>
                                </Link>
                            </div>

                            <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/80 text-sm">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-agro-lime" />
                                    <span>30 dias grátis</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-agro-lime" />
                                    <span>Sem cartão de crédito</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-agro-lime" />
                                    <span>Cancele quando quiser</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Blog;
