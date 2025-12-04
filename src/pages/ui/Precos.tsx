import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, X, ArrowRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
    {
        name: "Inicial",
        subtitle: "Para Pequenos Produtores",
        price: "R$ 147",
        period: "/3 meses",
        description: "Ideal para quem está começando a modernizar a gestão",
        features: [
            "Dashboard essencial",
            "Gerenciamento básico de talhões",
            "Controle de insumos",
            "Relatórios mensais",
            "Suporte por email",
            "1 usuário",
        ],
        notIncluded: [
            "Relatórios avançados",
            "API e integrações",
            "Múltiplos usuários",
            "Suporte prioritário",
        ],
        highlighted: false,
        ctaText: "Começar agora",
    },
    {
        name: "Profissional",
        subtitle: "Para Produtores Médios",
        price: "R$ 247",
        period: "/6 meses",
        description: "A escolha mais popular para fazendas em crescimento",
        features: [
            "Tudo do plano Inicial",
            "Relatórios avançados e personalizados",
            "Gestão detalhada por talhões",
            "Exportação de dados (Excel, PDF)",
            "Planejamento de atividades",
            "Análise de produtividade",
            "Suporte prioritário",
            "Até 5 usuários",
        ],
        notIncluded: [
            "Integração com sensores",
            "API personalizada",
            "Usuários ilimitados",
        ],
        highlighted: true,
        ctaText: "Assinar agora",
    },
    {
        name: "Enterprise",
        subtitle: "Para Grandes Fazendas",
        price: "Personalizado",
        period: "",
        description: "Solução completa para operações de grande escala",
        features: [
            "Tudo do plano Profissional",
            "Integração com sensores ópticos",
            "API completa + webhooks",
            "Módulos extras personalizados",
            "Usuários ilimitados",
            "Múltiplas fazendas",
            "Suporte 24/7 dedicado",
            "Onboarding personalizado",
            "Consultoria agrícola",
        ],
        notIncluded: [],
        highlighted: false,
        ctaText: "Falar com especialista",
    },
];

const comparisonFeatures = [
    { name: "Dashboard Inteligente", inicial: true, profissional: true, enterprise: true },
    { name: "Gerenciamento de talhões", inicial: "Básico", profissional: "Avançado", enterprise: "Avançado" },
    { name: "Controle de insumos", inicial: true, profissional: true, enterprise: true },
    { name: "Relatórios", inicial: "Mensais", profissional: "Personalizados", enterprise: "Personalizados" },
    { name: "Exportação de dados", inicial: false, profissional: true, enterprise: true },
    { name: "Planejamento de atividades", inicial: false, profissional: true, enterprise: true },
    { name: "Número de usuários", inicial: "1", profissional: "Até 5", enterprise: "Ilimitado" },
    { name: "Integração com sensores", inicial: false, profissional: false, enterprise: true },
    { name: "API e webhooks", inicial: false, profissional: false, enterprise: true },
    { name: "Suporte", inicial: "Email", profissional: "Prioritário", enterprise: "24/7 Dedicado" },
];

const faqs = [
    {
        question: "Posso mudar de plano depois?",
        answer: "Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças são aplicadas imediatamente e o valor é ajustado proporcionalmente.",
    },
    {
        question: "Existe período de teste gratuito?",
        answer: "Sim, oferecemos 30 dias de teste gratuito em todos os planos. Não é necessário cartão de crédito para começar.",
    },
    {
        question: "Como funciona o pagamento?",
        answer: "Aceitamos cartão de crédito, boleto bancário e PIX. O pagamento é mensal e você pode cancelar a qualquer momento sem multas ou taxas.",
    },
    {
        question: "Os dados ficam seguros?",
        answer: "Absolutamente. Utilizamos criptografia de ponta a ponta, backups diários e servidores em nuvem de alta disponibilidade. Seus dados agrícolas estão totalmente protegidos.",
    },
    {
        question: "Preciso de internet no campo?",
        answer: "O sistema funciona com conexão limitada. Você pode inserir dados offline e eles serão sincronizados automaticamente quando houver conexão.",
    },
    {
        question: "Existe treinamento para usar a plataforma?",
        answer: "Sim! Oferecemos tutoriais em vídeo, documentação completa e suporte para tirar dúvidas. Planos Enterprise incluem onboarding personalizado.",
    },
];

const Precos = () => {
    const navigate = useNavigate();

    const handlePlanClick = (plan: typeof plans[0]) => {
        if (plan.price === "Personalizado") {
            window.open("https://wa.me/5562992211395?text=Tenho interesse no plano Enterprise do AgroInteligente", "_blank");
        } else {
            navigate("/checkout", { state: { plan } });
        }
    };

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
                                Preços
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                Planos para fazendas de{" "}
                                <span className="text-primary">todos os tamanhos</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Escolha o plano ideal para sua operação. Comece grátis por 14
                                dias, sem cartão de crédito.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="section-padding bg-background">
                    <div className="container-agro">
                        {/* Promotional Banner */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-primary to-agro-green-dark p-6 rounded-2xl mb-12 text-center text-white shadow-lg relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="text-xl md:text-2xl font-bold mb-2">
                                    🎄 Promoção Exclusiva de Fim de Ano + Lançamento do App 📱
                                </h3>
                                <p className="text-lg md:text-xl opacity-90 mb-4">
                                    Garanta qualquer plano agora e receba <span className="font-bold text-agro-yellow">2x MAIS TEMPO</span> de acesso.
                                    <br />
                                    <span className="text-sm opacity-80 mt-1 block">Ex: Compre 6 meses e leve 1 ano!</span>
                                </p>
                                <div className="inline-block bg-white text-primary px-6 py-2 rounded-full font-bold text-sm uppercase tracking-wider animate-pulse shadow-lg">
                                    Oferta por tempo limitado
                                </div>
                            </div>
                        </motion.div>

                        <div className="grid lg:grid-cols-3 gap-8 mb-20">
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={plan.name}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={`relative rounded-3xl p-8 ${plan.highlighted
                                        ? "bg-primary text-primary-foreground shadow-glow scale-105 border-2 border-primary"
                                        : "glass-card"
                                        }`}
                                >
                                    {plan.highlighted && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-agro-yellow text-agro-green-dark px-4 py-1 rounded-full text-sm font-bold">
                                            Mais Popular
                                        </div>
                                    )}

                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                                        <p className={`text-sm ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                            {plan.subtitle}
                                        </p>
                                    </div>

                                    <div className="mb-6">
                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-4xl font-bold">{plan.price}</span>
                                            {plan.period && (
                                                <span className={plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}>
                                                    {plan.period}
                                                </span>
                                            )}
                                        </div>
                                        <p className={`text-sm ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                                            {plan.description}
                                        </p>
                                        {plan.price !== "Personalizado" && (
                                            <div className={`mt-4 text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full inline-block ${plan.highlighted ? "bg-agro-yellow text-agro-green-dark" : "bg-primary/10 text-primary"}`}>
                                                🎁 +{plan.period.replace('/', '')} Grátis (2x)
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        variant={plan.highlighted ? "hero" : "default"}
                                        size="lg"
                                        className="w-full mb-8 group"
                                        onClick={() => handlePlanClick(plan)}
                                    >
                                        {plan.ctaText}
                                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>

                                    <div className="space-y-3">
                                        {plan.features.map((feature) => (
                                            <div key={feature} className="flex items-start gap-3">
                                                <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.highlighted ? "text-agro-lime" : "text-primary"}`} />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                        {plan.notIncluded.map((feature) => (
                                            <div key={feature} className="flex items-start gap-3 opacity-50">
                                                <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                                <span className="text-sm">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Comparison Table */}
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
                                Compare os planos
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Veja lado a lado todas as funcionalidades de cada plano
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-card rounded-3xl p-8 overflow-x-auto"
                        >
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="text-left py-4 px-4 font-bold text-foreground">
                                            Funcionalidade
                                        </th>
                                        <th className="text-center py-4 px-4 font-bold text-foreground">
                                            Inicial
                                        </th>
                                        <th className="text-center py-4 px-4 font-bold text-primary">
                                            Profissional
                                        </th>
                                        <th className="text-center py-4 px-4 font-bold text-foreground">
                                            Enterprise
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((feature, index) => (
                                        <tr
                                            key={feature.name}
                                            className={index !== comparisonFeatures.length - 1 ? "border-b border-border/50" : ""}
                                        >
                                            <td className="py-4 px-4 text-foreground">{feature.name}</td>
                                            <td className="text-center py-4 px-4">
                                                {typeof feature.inicial === "boolean" ? (
                                                    feature.inicial ? (
                                                        <Check className="w-5 h-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">{feature.inicial}</span>
                                                )}
                                            </td>
                                            <td className="text-center py-4 px-4">
                                                {typeof feature.profissional === "boolean" ? (
                                                    feature.profissional ? (
                                                        <Check className="w-5 h-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm text-foreground font-medium">{feature.profissional}</span>
                                                )}
                                            </td>
                                            <td className="text-center py-4 px-4">
                                                {typeof feature.enterprise === "boolean" ? (
                                                    feature.enterprise ? (
                                                        <Check className="w-5 h-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm text-muted-foreground">{feature.enterprise}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </motion.div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="section-padding bg-background">
                    <div className="container-agro max-w-3xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <HelpCircle className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Perguntas Frequentes
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Tire suas dúvidas sobre nossos planos e serviços
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <Accordion type="single" collapsible className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <AccordionItem
                                        key={index}
                                        value={`item-${index}`}
                                        className="glass-card px-6 rounded-2xl border-none"
                                    >
                                        <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground leading-relaxed">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </motion.div>
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
                                Ainda tem dúvidas sobre qual plano escolher?
                            </h2>
                            <p className="text-lg text-primary-foreground/90 mb-8">
                                Nossa equipe está pronta para ajudar você a encontrar a melhor
                                solução para sua fazenda.
                            </p>
                            <Button variant="hero" size="lg" className="group">
                                Falar com um especialista
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Precos;
