import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PaymentCancel = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="section-padding pt-32">
                <div className="container-agro max-w-3xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-center"
                    >
                        {/* Ícone de Cancelamento */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                            className="w-24 h-24 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-8"
                        >
                            <XCircle className="w-12 h-12 text-orange-600 dark:text-orange-400" />
                        </motion.div>

                        {/* Título */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                        >
                            Pagamento Cancelado
                        </motion.h1>

                        {/* Descrição */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg text-muted-foreground mb-8"
                        >
                            Não se preocupe! Nenhuma cobrança foi realizada e você pode tentar novamente quando quiser.
                        </motion.p>

                        {/* Informações */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="glass-card p-8 mb-8 text-left"
                        >
                            <h3 className="text-xl font-bold mb-4">O que aconteceu?</h3>
                            <ul className="space-y-3 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Você cancelou o processo de pagamento</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Nenhuma cobrança foi realizada no seu cartão</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">•</span>
                                    <span>Seus dados estão seguros e não foram armazenados</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Razões Comuns */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="glass-card p-8 mb-8 text-left"
                        >
                            <h3 className="text-xl font-bold mb-4">Precisa de ajuda?</h3>
                            <p className="text-muted-foreground mb-4">
                                Se você teve algum problema durante o pagamento, estamos aqui para ajudar:
                            </p>
                            <ul className="space-y-2 text-muted-foreground">
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Dúvidas sobre os planos disponíveis</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Problemas técnicos durante o checkout</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Questões sobre formas de pagamento</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-primary mt-1">✓</span>
                                    <span>Precisa de um plano personalizado</span>
                                </li>
                            </ul>
                        </motion.div>

                        {/* Botões de Ação */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                size="lg"
                                onClick={() => navigate('/precos')}
                                className="group"
                            >
                                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                                Voltar aos Planos
                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                onClick={() =>
                                    window.open(
                                        'https://wa.me/5562992211395?text=Tive um problema durante o pagamento',
                                        '_blank'
                                    )
                                }
                                className="group"
                            >
                                <MessageCircle className="w-5 h-5" />
                                Falar com Suporte
                            </Button>
                        </motion.div>

                        {/* Garantia */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-12 p-6 bg-primary/5 rounded-2xl"
                        >
                            <p className="text-sm text-muted-foreground">
                                <strong className="text-foreground">💚 Garantia de Satisfação:</strong> Experimente
                                por 30 dias sem riscos. Se não ficar satisfeito, devolvemos 100% do seu dinheiro.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentCancel;
