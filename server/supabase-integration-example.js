// ============================================
// EXEMPLO DE INTEGRAÇÃO WEBHOOK + SUPABASE
// ============================================
// Este arquivo mostra como integrar os webhooks do Stripe com o Supabase
// Copie as funções necessárias para o seu server/index.js

import { createClient } from '@supabase/supabase-js';

// Inicializa o cliente Supabase com a Service Role Key
// IMPORTANTE: Use a SERVICE_ROLE_KEY, não a ANON_KEY, pois precisamos bypass RLS
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // ⚠️ Adicionar ao .env
const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================
// FUNÇÕES DE WEBHOOK
// ============================================

/**
 * Processa checkout completado
 * Cria ou atualiza a assinatura no Supabase
 */
async function handleCheckoutComplete(session) {
    try {
        console.log('Processando checkout completo:', session.id);

        // Busca informações adicionais da assinatura
        const subscription = await stripe.subscriptions.retrieve(session.subscription);

        // Busca ou cria o customer
        const customer = await stripe.customers.retrieve(session.customer);

        // Busca o user_id pelo email (você pode ajustar essa lógica)
        const { data: user, error: userError } = await supabase
            .from('auth.users')
            .select('id')
            .eq('email', session.customer_email)
            .single();

        if (userError) {
            console.error('Erro ao buscar usuário:', userError);
            // Você pode criar o usuário aqui se necessário
            return;
        }

        // Insere ou atualiza a assinatura
        const { data, error } = await supabase
            .from('subscriptions')
            .upsert({
                user_id: user.id,
                stripe_customer_id: session.customer,
                stripe_subscription_id: session.subscription,
                stripe_price_id: subscription.items.data[0].price.id,
                plan_name: session.metadata?.planName || 'Unknown',
                status: subscription.status,
                current_period_start: new Date(subscription.current_period_start * 1000),
                current_period_end: new Date(subscription.current_period_end * 1000),
                cancel_at_period_end: subscription.cancel_at_period_end,
            }, {
                onConflict: 'stripe_subscription_id'
            });

        if (error) {
            console.error('Erro ao salvar assinatura:', error);
            throw error;
        }

        console.log('✅ Assinatura salva com sucesso:', data);

        // Opcional: Enviar email de boas-vindas
        // await sendWelcomeEmail(session.customer_email, session.metadata?.planName);

    } catch (error) {
        console.error('Erro em handleCheckoutComplete:', error);
        throw error;
    }
}

/**
 * Processa criação de assinatura
 */
async function handleSubscriptionCreated(subscription) {
    try {
        console.log('Processando nova assinatura:', subscription.id);

        // Busca o customer para obter o email
        const customer = await stripe.customers.retrieve(subscription.customer);

        // Busca o user_id pelo email
        const { data: user, error: userError } = await supabase
            .from('auth.users')
            .select('id')
            .eq('email', customer.email)
            .single();

        if (userError) {
            console.error('Erro ao buscar usuário:', userError);
            return;
        }

        // Insere a assinatura
        const { data, error } = await supabase
            .from('subscriptions')
            .upsert({
                user_id: user.id,
                stripe_customer_id: subscription.customer,
                stripe_subscription_id: subscription.id,
                stripe_price_id: subscription.items.data[0].price.id,
                plan_name: subscription.metadata?.planName || 'Unknown',
                status: subscription.status,
                current_period_start: new Date(subscription.current_period_start * 1000),
                current_period_end: new Date(subscription.current_period_end * 1000),
                cancel_at_period_end: subscription.cancel_at_period_end,
            }, {
                onConflict: 'stripe_subscription_id'
            });

        if (error) {
            console.error('Erro ao salvar assinatura:', error);
            throw error;
        }

        console.log('✅ Assinatura criada com sucesso:', data);

    } catch (error) {
        console.error('Erro em handleSubscriptionCreated:', error);
        throw error;
    }
}

/**
 * Processa atualização de assinatura
 */
async function handleSubscriptionUpdated(subscription) {
    try {
        console.log('Processando atualização de assinatura:', subscription.id);

        // Atualiza a assinatura
        const { data, error } = await supabase
            .from('subscriptions')
            .update({
                status: subscription.status,
                current_period_start: new Date(subscription.current_period_start * 1000),
                current_period_end: new Date(subscription.current_period_end * 1000),
                cancel_at_period_end: subscription.cancel_at_period_end,
            })
            .eq('stripe_subscription_id', subscription.id);

        if (error) {
            console.error('Erro ao atualizar assinatura:', error);
            throw error;
        }

        console.log('✅ Assinatura atualizada com sucesso:', data);

    } catch (error) {
        console.error('Erro em handleSubscriptionUpdated:', error);
        throw error;
    }
}

/**
 * Processa cancelamento de assinatura
 */
async function handleSubscriptionDeleted(subscription) {
    try {
        console.log('Processando cancelamento de assinatura:', subscription.id);

        // Atualiza o status para cancelado
        const { data, error } = await supabase
            .from('subscriptions')
            .update({
                status: 'canceled',
            })
            .eq('stripe_subscription_id', subscription.id);

        if (error) {
            console.error('Erro ao cancelar assinatura:', error);
            throw error;
        }

        console.log('✅ Assinatura cancelada com sucesso:', data);

        // Opcional: Enviar email de cancelamento
        // await sendCancellationEmail(customer.email);

    } catch (error) {
        console.error('Erro em handleSubscriptionDeleted:', error);
        throw error;
    }
}

/**
 * Processa pagamento bem-sucedido
 */
async function handlePaymentSucceeded(invoice) {
    try {
        console.log('Processando pagamento bem-sucedido:', invoice.id);

        // Busca a assinatura relacionada
        const { data: subscription, error: subError } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('stripe_subscription_id', invoice.subscription)
            .single();

        if (subError) {
            console.error('Erro ao buscar assinatura:', subError);
            return;
        }

        // Registra o pagamento
        const { data, error } = await supabase
            .from('payments')
            .insert({
                subscription_id: subscription.id,
                stripe_payment_intent_id: invoice.payment_intent,
                stripe_invoice_id: invoice.id,
                amount: invoice.amount_paid,
                currency: invoice.currency,
                status: 'succeeded',
            });

        if (error) {
            console.error('Erro ao registrar pagamento:', error);
            throw error;
        }

        console.log('✅ Pagamento registrado com sucesso:', data);

        // Opcional: Enviar recibo por email
        // await sendReceiptEmail(invoice);

    } catch (error) {
        console.error('Erro em handlePaymentSucceeded:', error);
        throw error;
    }
}

/**
 * Processa falha de pagamento
 */
async function handlePaymentFailed(invoice) {
    try {
        console.log('Processando falha de pagamento:', invoice.id);

        // Busca a assinatura relacionada
        const { data: subscription, error: subError } = await supabase
            .from('subscriptions')
            .select('id, user_id')
            .eq('stripe_subscription_id', invoice.subscription)
            .single();

        if (subError) {
            console.error('Erro ao buscar assinatura:', subError);
            return;
        }

        // Registra a tentativa de pagamento falhada
        const { data, error } = await supabase
            .from('payments')
            .insert({
                subscription_id: subscription.id,
                stripe_payment_intent_id: invoice.payment_intent,
                stripe_invoice_id: invoice.id,
                amount: invoice.amount_due,
                currency: invoice.currency,
                status: 'failed',
            });

        if (error) {
            console.error('Erro ao registrar falha de pagamento:', error);
            throw error;
        }

        console.log('❌ Falha de pagamento registrada:', data);

        // Opcional: Enviar email de alerta
        // await sendPaymentFailedEmail(subscription.user_id, invoice);

    } catch (error) {
        console.error('Erro em handlePaymentFailed:', error);
        throw error;
    }
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

/**
 * Busca assinatura ativa de um usuário
 */
async function getActiveSubscription(userId) {
    const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .gt('current_period_end', new Date().toISOString())
        .single();

    if (error) {
        console.error('Erro ao buscar assinatura ativa:', error);
        return null;
    }

    return data;
}

/**
 * Verifica se um usuário tem assinatura ativa
 */
async function hasActiveSubscription(userId) {
    const subscription = await getActiveSubscription(userId);
    return !!subscription;
}

/**
 * Cancela assinatura de um usuário
 */
async function cancelSubscription(userId) {
    try {
        // Busca a assinatura ativa
        const subscription = await getActiveSubscription(userId);

        if (!subscription) {
            throw new Error('Nenhuma assinatura ativa encontrada');
        }

        // Cancela no Stripe
        const canceledSubscription = await stripe.subscriptions.update(
            subscription.stripe_subscription_id,
            { cancel_at_period_end: true }
        );

        // Atualiza no Supabase
        const { data, error } = await supabase
            .from('subscriptions')
            .update({
                cancel_at_period_end: true,
            })
            .eq('id', subscription.id);

        if (error) {
            throw error;
        }

        return data;

    } catch (error) {
        console.error('Erro ao cancelar assinatura:', error);
        throw error;
    }
}

// ============================================
// EXPORTAÇÕES
// ============================================

export {
    handleCheckoutComplete,
    handleSubscriptionCreated,
    handleSubscriptionUpdated,
    handleSubscriptionDeleted,
    handlePaymentSucceeded,
    handlePaymentFailed,
    getActiveSubscription,
    hasActiveSubscription,
    cancelSubscription,
};
