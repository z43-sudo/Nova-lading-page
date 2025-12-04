import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";

const contactInfo = [
    {
        icon: Mail,
        title: "Email",
        value: "contato@agrointeligente.com.br",
        link: "mailto:contato@agrointeligente.com.br",
    },
    {
        icon: Phone,
        title: "Telefone",
        value: "(62) 992211395",
        link: "tel:+5562992211395",
    },
    {
        icon: MapPin,
        title: "Endereço",
        value: "Goiás, Brasil",
        link: null,
    },
    {
        icon: Clock,
        title: "Horário",
        value: "Seg-Sex: 8h às 18h",
        link: null,
    },
];

const Contato = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            name: "",
            email: "",
            subject: "",
            message: "",
        };

        if (!formData.name.trim()) {
            newErrors.name = "Nome é obrigatório";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email é obrigatório";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email inválido";
            isValid = false;
        }

        if (!formData.subject.trim()) {
            newErrors.subject = "Assunto é obrigatório";
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = "Mensagem é obrigatória";
            isValid = false;
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validateForm()) {
            // Aqui você implementaria o envio real do formulário
            console.log("Formulário válido:", formData);
            alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");

            // Limpar formulário
            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
            setErrors({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
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
                            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-glow">
                                <MessageSquare className="w-10 h-10 text-primary-foreground" />
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                                Entre em <span className="text-primary">contato</span>
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                                Estamos aqui para ajudar. Envie sua mensagem e nossa equipe
                                responderá o mais breve possível.
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Contact Info Cards */}
                <section className="section-padding bg-background">
                    <div className="container-agro">
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={info.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="glass-card p-6 text-center hover:shadow-card transition-all duration-300"
                                >
                                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <info.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <h3 className="font-bold text-foreground mb-2">{info.title}</h3>
                                    {info.link ? (
                                        <a
                                            href={info.link}
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {info.value}
                                        </a>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">{info.value}</p>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Form */}
                <section className="section-padding bg-muted">
                    <div className="container-agro">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">
                            {/* Left Side - Form */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="glass-card p-8 lg:p-10"
                            >
                                <h2 className="text-3xl font-bold text-foreground mb-2">
                                    Envie sua mensagem
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    Preencha o formulário abaixo e entraremos em contato em até 24
                                    horas.
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Nome */}
                                    <div>
                                        <Label htmlFor="name" className="text-foreground mb-2">
                                            Nome completo *
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Seu nome"
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className={errors.name ? "border-destructive" : ""}
                                        />
                                        {errors.name && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Label htmlFor="email" className="text-foreground mb-2">
                                            Email *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="seu@email.com"
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className={errors.email ? "border-destructive" : ""}
                                        />
                                        {errors.email && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Assunto */}
                                    <div>
                                        <Label htmlFor="subject" className="text-foreground mb-2">
                                            Assunto *
                                        </Label>
                                        <Input
                                            id="subject"
                                            placeholder="Como podemos ajudar?"
                                            value={formData.subject}
                                            onChange={(e) =>
                                                setFormData({ ...formData, subject: e.target.value })
                                            }
                                            className={errors.subject ? "border-destructive" : ""}
                                        />
                                        {errors.subject && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.subject}
                                            </p>
                                        )}
                                    </div>

                                    {/* Mensagem */}
                                    <div>
                                        <Label htmlFor="message" className="text-foreground mb-2">
                                            Mensagem *
                                        </Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Conte-nos mais sobre sua necessidade..."
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) =>
                                                setFormData({ ...formData, message: e.target.value })
                                            }
                                            className={errors.message ? "border-destructive" : ""}
                                        />
                                        {errors.message && (
                                            <p className="text-destructive text-sm mt-1">
                                                {errors.message}
                                            </p>
                                        )}
                                    </div>

                                    <Button type="submit" size="lg" className="w-full group">
                                        Enviar mensagem
                                        <Send className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </form>
                            </motion.div>

                            {/* Right Side - Info */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="space-y-8"
                            >
                                {/* Illustration */}
                                <div className="bg-gradient-to-br from-primary to-agro-green-dark rounded-3xl p-12 text-center text-primary-foreground">
                                    <Mail className="w-24 h-24 mx-auto mb-6 text-agro-lime" />
                                    <h3 className="text-2xl font-bold mb-4">
                                        Estamos aqui para ajudar
                                    </h3>
                                    <p className="text-primary-foreground/90">
                                        Nossa equipe está pronta para responder suas dúvidas e
                                        apresentar as melhores soluções para sua fazenda.
                                    </p>
                                </div>

                                {/* Additional Info */}
                                <div className="glass-card p-8">
                                    <h3 className="text-xl font-bold text-foreground mb-6">
                                        Informações da empresa
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1">
                                                Agro Inteligente LTDA
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                CNPJ: 00.000.000/0001-00
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1">
                                                Sede
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Av. Paulista, 1000
                                                <br />
                                                São Paulo, SP - 01310-100
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1">
                                                Suporte
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                Segunda a Sexta: 8h às 18h
                                                <br />
                                                Sábados: 9h às 13h
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* FAQ Link */}
                                <div className="glass-card p-6 text-center">
                                    <h4 className="font-bold text-foreground mb-2">
                                        Tem uma dúvida rápida?
                                    </h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Confira nossa página de perguntas frequentes
                                    </p>
                                    <Button variant="outline" className="w-full">
                                        Ver FAQ
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Map/Location Section */}
                <section className="section-padding bg-background">
                    <div className="container-agro">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-gradient-to-br from-secondary to-muted rounded-3xl p-12 md:p-16 text-center"
                        >
                            <MapPin className="w-16 h-16 text-primary mx-auto mb-6" />
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                                Nossa presença
                            </h2>
                            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                                Atendemos todo o Brasil com soluções de gestão agrícola. De
                                pequenos produtores a grandes fazendas, estamos comprometidos com
                                o sucesso do agronegócio brasileiro.
                            </p>
                            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                                <span className="px-4 py-2 bg-background rounded-full">
                                    São Paulo
                                </span>
                                <span className="px-4 py-2 bg-background rounded-full">
                                    Mato Grosso
                                </span>
                                <span className="px-4 py-2 bg-background rounded-full">
                                    Goiás
                                </span>
                                <span className="px-4 py-2 bg-background rounded-full">
                                    Paraná
                                </span>
                                <span className="px-4 py-2 bg-background rounded-full">
                                    Minas Gerais
                                </span>
                                <span className="px-4 py-2 bg-background rounded-full">
                                    E todo o Brasil
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contato;
