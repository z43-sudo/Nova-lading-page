import express from 'express';
import Stripe from 'stripe';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Configuração do __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Carrega variáveis de ambiente do diretório pai
dotenv.config({ path: join(__dirname, '..', '.env') });

// Inicializa o Stripe com a chave secreta
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-11-20.acacia',
});

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
    origin: [
        process.env.VITE_APP_URL || 'http://localhost:8080',
        'http://localhost:8080',
        'http://localhost:5173'
    ],
    credentials: true,
}));

// Middleware para webhook do Stripe (raw body)
app.use('/webhook', express.raw({ type: 'application/json' }));

// Middleware para JSON (após o webhook)
app.use(express.json());

// ============================================
// ROTAS
// ============================================

/**
 * Health check
 */
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'Stripe Backend API está funcionando',
        stripeConfigured: !!process.env.STRIPE_SECRET_KEY,
    });
});

/**
 * Criar sessão de checkout
 */
app.post('/api/create-checkout-session', async (req, res) => {
    try {
        const { priceId, planName, successUrl, cancelUrl, customerEmail } = req.body;

        // Validações
        if (!priceId) {
            return res.status(400).json({ error: 'priceId é obrigatório' });
        }

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({
                error: 'Stripe não configurado. Configure STRIPE_SECRET_KEY no arquivo .env'
            });
        }

        // Logs de depuração
        const finalSuccessUrl = successUrl || `${process.env.VITE_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`;
        const finalCancelUrl = cancelUrl || `${process.env.VITE_APP_URL}/payment-cancel`;
        console.log('🔗 URLs de Redirecionamento:', { finalSuccessUrl, finalCancelUrl, VITE_APP_URL: process.env.VITE_APP_URL });

        // Cria a sessão de checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription', // ou 'payment' para pagamento único
            success_url: successUrl || `${process.env.VITE_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: cancelUrl || `${process.env.VITE_APP_URL}/payment-cancel`,
            customer_email: customerEmail,
            metadata: {
                planName: planName || 'N/A',
            },
            // Configurações adicionais
            allow_promotion_codes: true,
            billing_address_collection: 'required',
            locale: 'pt-BR',
        });

        res.json({
            sessionId: session.id,
            url: session.url,
        });
    } catch (error) {
        console.error('Erro ao criar checkout session:', error);
        res.status(500).json({
            error: error.message || 'Erro ao criar sessão de checkout'
        });
    }
});

/**
 * Buscar detalhes de uma sessão de checkout
 */
app.get('/api/checkout-session/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;

        if (!sessionId) {
            return res.status(400).json({ error: 'sessionId é obrigatório' });
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.json({
            id: session.id,
            status: session.status,
            customerEmail: session.customer_email,
            planName: session.metadata?.planName,
            amountTotal: session.amount_total,
            currency: session.currency,
            paymentStatus: session.payment_status,
        });
    } catch (error) {
        console.error('Erro ao buscar checkout session:', error);
        res.status(500).json({
            error: error.message || 'Erro ao buscar sessão de checkout'
        });
    }
});

/**
 * Webhook do Stripe para receber eventos
 * Configure este endpoint no Stripe Dashboard: https://dashboard.stripe.com/webhooks
 */
app.post('/webhook', async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('STRIPE_WEBHOOK_SECRET não configurado');
        return res.status(500).send('Webhook secret não configurado');
    }

    let event;

    try {
        // Verifica a assinatura do webhook
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Erro na verificação do webhook:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Processa o evento
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                console.log('✅ Checkout completado:', session.id);

                // AQUI: Adicione sua lógica para ativar a assinatura do usuário
                // Exemplo: atualizar banco de dados, enviar email, etc.
                await handleCheckoutComplete(session);
                break;

            case 'customer.subscription.created':
                const subscription = event.data.object;
                console.log('✅ Assinatura criada:', subscription.id);

                // AQUI: Adicione sua lógica para registrar a nova assinatura
                await handleSubscriptionCreated(subscription);
                break;

            case 'customer.subscription.updated':
                const updatedSubscription = event.data.object;
                console.log('✅ Assinatura atualizada:', updatedSubscription.id);

                // AQUI: Adicione sua lógica para atualizar a assinatura
                await handleSubscriptionUpdated(updatedSubscription);
                break;

            case 'customer.subscription.deleted':
                const deletedSubscription = event.data.object;
                console.log('❌ Assinatura cancelada:', deletedSubscription.id);

                // AQUI: Adicione sua lógica para cancelar a assinatura
                await handleSubscriptionDeleted(deletedSubscription);
                break;

            case 'invoice.payment_succeeded':
                const invoice = event.data.object;
                console.log('✅ Pagamento bem-sucedido:', invoice.id);

                // AQUI: Adicione sua lógica para confirmar o pagamento
                await handlePaymentSucceeded(invoice);
                break;

            case 'invoice.payment_failed':
                const failedInvoice = event.data.object;
                console.log('❌ Pagamento falhou:', failedInvoice.id);

                // AQUI: Adicione sua lógica para lidar com falha de pagamento
                await handlePaymentFailed(failedInvoice);
                break;

            default:
                console.log(`Evento não tratado: ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        console.error('Erro ao processar webhook:', error);
        res.status(500).json({ error: 'Erro ao processar webhook' });
    }
});

// ============================================
// FUNÇÕES DE PROCESSAMENTO DE EVENTOS
// ============================================

async function handleCheckoutComplete(session) {
    // TODO: Implementar lógica de negócio
    // Exemplo: Salvar no Supabase, enviar email de boas-vindas, etc.
    console.log('Processando checkout completo:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        planName: session.metadata?.planName,
    });
}

async function handleSubscriptionCreated(subscription) {
    // TODO: Implementar lógica de negócio
    console.log('Processando nova assinatura:', {
        subscriptionId: subscription.id,
        customerId: subscription.customer,
        status: subscription.status,
    });
}

async function handleSubscriptionUpdated(subscription) {
    // TODO: Implementar lógica de negócio
    console.log('Processando atualização de assinatura:', {
        subscriptionId: subscription.id,
        status: subscription.status,
    });
}

async function handleSubscriptionDeleted(subscription) {
    // TODO: Implementar lógica de negócio
    console.log('Processando cancelamento de assinatura:', {
        subscriptionId: subscription.id,
    });
}

async function handlePaymentSucceeded(invoice) {
    // TODO: Implementar lógica de negócio
    console.log('Processando pagamento bem-sucedido:', {
        invoiceId: invoice.id,
        amountPaid: invoice.amount_paid,
    });
}

async function handlePaymentFailed(invoice) {
    // TODO: Implementar lógica de negócio
    console.log('Processando falha de pagamento:', {
        invoiceId: invoice.id,
        attemptCount: invoice.attempt_count,
    });
}

// ============================================
// INICIALIZAÇÃO DO SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`💳 Stripe configurado: ${!!process.env.STRIPE_SECRET_KEY ? '✅' : '❌'}`);

    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn('⚠️  AVISO: STRIPE_SECRET_KEY não configurada!');
        console.warn('   Configure no arquivo .env na raiz do projeto');
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        console.warn('⚠️  AVISO: STRIPE_WEBHOOK_SECRET não configurada!');
        console.warn('   Configure após criar o webhook no Stripe Dashboard');
    }
});

export default app;
