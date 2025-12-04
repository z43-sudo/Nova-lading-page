import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, CreditCard, Lock, MessageCircle, ShieldCheck, Smartphone, QrCode, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [loading, setLoading] = useState(false);
    const [pixData, setPixData] = useState<{ qr_code: string, copy_paste: string, id: string } | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<'pending' | 'paid'>('pending');

    // Default plan if none selected (for testing/direct access)
    const defaultPlan = {
        name: "Profissional",
        price: "R$ 247",
        period: "/6 meses",
        features: ["Tudo do plano Inicial", "Relatórios avançados", "Até 5 usuários"]
    };

    const plan = location.state?.plan || defaultPlan;

    // Calculate "double time" text
    const getDoubleTimeText = (period: string) => {
        if (period.includes("3 meses")) return "6 meses";
        if (period.includes("6 meses")) return "1 ano";
        return "2x Tempo";
    };

    // Listen for payment status changes
    useEffect(() => {
        if (!pixData?.id) return;

        const channel = supabase
            .channel('payment_status')
            .on('postgres_changes', {
                event: 'UPDATE',
                schema: 'public',
                table: 'payments',
                filter: `id=eq.${pixData.id}`
            }, (payload) => {
                if (payload.new.status === 'paid') {
                    setPaymentStatus('paid');
                    toast.success("Pagamento confirmado com sucesso!");
                    setTimeout(() => {
                        // Redirect or show success modal
                        // navigate('/dashboard'); // Example
                    }, 2000);
                }
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [pixData]);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (paymentMethod === 'pix') {
            try {
                // Call Supabase Edge Function
                const { data, error } = await supabase.functions.invoke('create-pix-charge', {
                    body: {
                        amount: parseFloat(plan.price.replace('R$', '').replace(',', '.').trim()), // Parse amount
                        provider: 'mercadopago', // Default provider for now
                        description: `Assinatura ${plan.name}`,
                    }
                });

                if (error) throw error;

                setPixData({
                    qr_code: data.qr_code_base64,
                    copy_paste: data.copy_paste_code,
                    id: data.id
                });

                toast.success("QR Code gerado! Realize o pagamento.");
                setLoading(false);
                return; // Stop here to show QR Code
            } catch (err) {
                console.error(err);
                toast.error("Erro ao gerar PIX. Tente novamente.");
                setLoading(false);
                return;
            }
        }

        // Simulate processing for other methods
        setTimeout(() => {
            setLoading(false);
            toast.success("Pedido realizado com sucesso!");
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20">
                <div className="container-agro">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8"
                    >
                        <Button
                            variant="ghost"
                            onClick={() => navigate(-1)}
                            className="mb-4 hover:bg-primary/10 hover:text-primary"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Voltar para Planos
                        </Button>
                        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                            Finalizar Compra
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Você está a um passo de transformar sua gestão agrícola.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column: Form & Payment */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Personal Details */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <ShieldCheck className="w-5 h-5 text-primary" />
                                            Dados Pessoais
                                        </CardTitle>
                                        <CardDescription>
                                            Seus dados estão seguros e protegidos.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <form id="checkout-form" onSubmit={handleCheckout} className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Nome Completo</Label>
                                                <Input id="name" placeholder="Seu nome" required className="bg-background/50" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input id="email" type="email" placeholder="seu@email.com" required className="bg-background/50" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">WhatsApp</Label>
                                                <Input id="phone" placeholder="(00) 00000-0000" required className="bg-background/50" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="cpf">CPF / CNPJ</Label>
                                                <Input id="cpf" placeholder="000.000.000-00" required className="bg-background/50" />
                                            </div>
                                        </form>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Payment Method */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <Card className="border-none shadow-lg bg-card/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <CreditCard className="w-5 h-5 text-primary" />
                                            Pagamento
                                        </CardTitle>
                                        <CardDescription>
                                            Escolha a forma de pagamento de sua preferência.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup defaultValue="credit-card" onValueChange={setPaymentMethod} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div>
                                                <RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" />
                                                <Label
                                                    htmlFor="credit-card"
                                                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                                                >
                                                    <CreditCard className="mb-3 h-6 w-6" />
                                                    Cartão de Crédito
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="pix" id="pix" className="peer sr-only" />
                                                <Label
                                                    htmlFor="pix"
                                                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                                                >
                                                    <QrCode className="mb-3 h-6 w-6" />
                                                    PIX (Aprovação Imediata)
                                                </Label>
                                            </div>
                                            <div>
                                                <RadioGroupItem value="boleto" id="boleto" className="peer sr-only" />
                                                <Label
                                                    htmlFor="boleto"
                                                    className="flex flex-col items-center justify-between rounded-xl border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                                                >
                                                    <FileText className="mb-3 h-6 w-6" />
                                                    Boleto Bancário
                                                </Label>
                                            </div>
                                        </RadioGroup>

                                        <div className="mt-6">
                                            {paymentMethod === "credit-card" && (
                                                <div className="grid gap-4 animate-in fade-in slide-in-from-top-2">
                                                    <div className="space-y-2">
                                                        <Label>Número do Cartão</Label>
                                                        <Input placeholder="0000 0000 0000 0000" className="bg-background/50" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Validade</Label>
                                                            <Input placeholder="MM/AA" className="bg-background/50" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>CVC</Label>
                                                            <Input placeholder="123" className="bg-background/50" />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <Label>Nome no Cartão</Label>
                                                        <Input placeholder="Como está impresso no cartão" className="bg-background/50" />
                                                    </div>
                                                </div>
                                            )}
                                            {paymentMethod === "pix" && (
                                                <div className="text-center p-6 bg-primary/5 rounded-xl animate-in fade-in slide-in-from-top-2">
                                                    {!pixData ? (
                                                        <>
                                                            <QrCode className="w-16 h-16 mx-auto text-primary mb-4" />
                                                            <p className="font-medium text-lg">O QR Code será gerado ao finalizar.</p>
                                                            <p className="text-sm text-muted-foreground mt-2">Aprovação em segundos!</p>
                                                        </>
                                                    ) : (
                                                        <div className="space-y-4">
                                                            <div className="bg-white p-4 rounded-lg inline-block">
                                                                {/* Display Base64 Image if available, otherwise generic icon */}
                                                                {pixData.qr_code && pixData.qr_code.startsWith('data:image') ? (
                                                                    <img src={pixData.qr_code} alt="QR Code PIX" className="w-48 h-48" />
                                                                ) : (
                                                                    // Fallback if the mock sends just a string or invalid base64
                                                                    <QrCode className="w-48 h-48 text-black" />
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-lg mb-2">Escaneie o QR Code</p>
                                                                <p className="text-sm text-muted-foreground mb-4">ou copie o código abaixo:</p>
                                                                <div className="flex gap-2">
                                                                    <Input value={pixData.copy_paste} readOnly className="bg-background" />
                                                                    <Button
                                                                        type="button"
                                                                        variant="outline"
                                                                        onClick={() => {
                                                                            navigator.clipboard.writeText(pixData.copy_paste);
                                                                            toast.success("Código copiado!");
                                                                        }}
                                                                    >
                                                                        Copiar
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                            {paymentStatus === 'paid' && (
                                                                <div className="bg-green-100 text-green-800 p-3 rounded-lg font-bold animate-pulse">
                                                                    Pagamento Confirmado! Redirecionando...
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                            {paymentMethod === "boleto" && (
                                                <div className="text-center p-6 bg-primary/5 rounded-xl animate-in fade-in slide-in-from-top-2">
                                                    <FileText className="w-16 h-16 mx-auto text-primary mb-4" />
                                                    <p className="font-medium text-lg">O boleto será gerado após finalizar o pedido.</p>
                                                    <p className="text-sm text-muted-foreground mt-2">Pode levar até 3 dias úteis para compensar.</p>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-muted/30 px-6 py-4 rounded-b-xl flex items-center gap-2 text-sm text-muted-foreground">
                                        <Lock className="w-4 h-4" />
                                        Pagamento processado em ambiente seguro (SSL).
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        </div>

                        {/* Right Column: Order Summary */}
                        <div className="lg:col-span-1">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="sticky top-32"
                            >
                                <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
                                    <div className="bg-primary p-4 text-primary-foreground text-center">
                                        <h3 className="font-bold text-lg">Resumo do Pedido</h3>
                                    </div>
                                    <CardContent className="p-6 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-xl text-foreground">{plan.name}</h4>
                                                <p className="text-sm text-muted-foreground">{plan.subtitle}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-xl text-primary">{plan.price}</div>
                                                <div className="text-xs text-muted-foreground">{plan.period}</div>
                                            </div>
                                        </div>

                                        <div className="bg-agro-yellow/20 border border-agro-yellow/50 rounded-lg p-3 flex items-start gap-3">
                                            <div className="bg-agro-yellow text-agro-green-dark rounded-full p-1 mt-0.5">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-agro-green-dark">Oferta de Fim de Ano Aplicada!</p>
                                                <p className="text-xs text-muted-foreground">
                                                    Você receberá <span className="font-bold text-foreground">{getDoubleTimeText(plan.period)}</span> de acesso pelo preço de {plan.period.replace('/', '')}.
                                                </p>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Subtotal</span>
                                                <span>{plan.price}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Bônus (2x Tempo)</span>
                                                <span className="text-primary font-bold">GRÁTIS</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">App Mobile</span>
                                                <span className="text-primary font-bold">INCLUSO</span>
                                            </div>
                                        </div>

                                        <Separator />

                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-lg">Total</span>
                                            <span className="font-bold text-2xl text-primary">{plan.price}</span>
                                        </div>

                                        <Button
                                            className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/25"
                                            variant="hero"
                                            onClick={() => document.getElementById('checkout-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }))}
                                            disabled={loading}
                                        >
                                            {loading ? "Processando..." : "Finalizar Compra Agora"}
                                        </Button>

                                        <p className="text-xs text-center text-muted-foreground">
                                            Ao finalizar, você concorda com nossos Termos de Uso.
                                        </p>
                                    </CardContent>
                                </Card>

                                {/* Important Message Box */}
                                <div className="mt-6 bg-card border border-border rounded-xl p-4 shadow-sm">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-primary/10 p-2 rounded-full">
                                            <Smartphone className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm mb-1">Acesso Imediato</h4>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                Após a compra, fale com nossa atendente para liberar seu acesso imediato e receber o link do App.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            {/* Floating WhatsApp Button */}
            <a
                href="https://wa.me/5562992211395?text=Olá! Acabei de finalizar minha compra no AgroInteligente e gostaria de liberar meu acesso."
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 flex items-center gap-2 group"
            >
                <MessageCircle className="w-6 h-6" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap font-bold">
                    Falar com Atendente
                </span>
            </a>
        </div>
    );
};

export default Checkout;
