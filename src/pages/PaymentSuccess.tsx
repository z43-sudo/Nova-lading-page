import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getCheckoutSession } from '@/lib/stripeService';

const PaymentSuccess = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [sessionData, setSessionData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (sessionId) {
            // Busca os detalhes da sessão
            getCheckoutSession(sessionId)
                .then((data) => {
                    setSessionData(data);
                    setError(false);
                })
                .catch((error) => {
                    console.error('Erro ao buscar sessão:', error);
                    setError(true);
                    // Mesmo com erro, mostramos a página de sucesso
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="section-padding pt-32">
                <div className="container-agro max-w-3xl">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-20"
                        >
                            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
                            <p className="text-muted-foreground">Carregando informações do pagamento...</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            {/* Ícone de Sucesso */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                className="w-24 h-24 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-8"
                            >
                                <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                            </motion.div>

                            {/* Título */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl md:text-5xl font-bold text-foreground mb-4"
                            >
                                Pagamento Confirmado! 🎉
                            </motion.h1>

                            {/* Descrição */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg text-muted-foreground mb-8"
                            >
                                Obrigado pela sua assinatura! Você já pode começar a usar todos os recursos do AgroInteligente.
                            </motion.p>

                            {/* Informações da Compra */}
                            {!loading && sessionData && !error && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="glass-card p-8 mb-8 text-left"
                                >
                                    <h3 className="text-xl font-bold mb-4">Detalhes da Compra</h3>
                                    <div className="space-y-2 text-muted-foreground">
                                        <p>
                                            <strong className="text-foreground">Plano:</strong>{' '}
                                            {sessionData.planName || 'N/A'}
                                        </p>
                                        <p>
                                            <strong className="text-foreground">Email:</strong>{' '}
                                            {sessionData.customerEmail || 'N/A'}
                                        </p>
                                        <p>
                                            <strong className="text-foreground">ID da Transação:</strong>{' '}
                                            {sessionId}
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {!loading && (error || !sessionId) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="glass-card p-8 mb-8 text-left bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800"
                                >
                                    <h3 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-100">📧 Confirmação enviada por email</h3>
                                    <p className="text-blue-700 dark:text-blue-300">
                                        Os detalhes completos da sua compra foram enviados para o seu email.
                                        Verifique sua caixa de entrada (e spam) para mais informações.
                                    </p>
                                </motion.div>
                            )}

                            {/* Próximos Passos */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="glass-card p-8 mb-8 text-left"
                            >
                                <h3 className="text-xl font-bold mb-4">Próximos Passos</h3>
                                <ol className="list-decimal list-inside space-y-3 text-muted-foreground">
                                    <li>Você receberá um email de confirmação em breve</li>
                                    <li>Acesse sua conta para começar a usar a plataforma</li>
                                    <li>Confira nossos tutoriais para aproveitar ao máximo</li>
                                    <li>Entre em contato com o suporte se precisar de ajuda</li>
                                </ol>
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
                                    onClick={() => navigate('/dashboard')}
                                    className="group"
                                >
                                    Ir para Dashboard
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Button>

                                <Button
                                    variant="outline"
                                    size="lg"
                                    onClick={() => window.print()}
                                    className="group"
                                >
                                    <Download className="w-5 h-5" />
                                    Baixar Recibo
                                </Button>
                            </motion.div>

                            {/* Suporte */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="text-sm text-muted-foreground mt-8"
                            >
                                Precisa de ajuda?{' '}
                                <a
                                    href="https://wa.me/5562992211395"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    Entre em contato com nosso suporte
                                </a>
                            </motion.p>
                        </motion.div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PaymentSuccess;
