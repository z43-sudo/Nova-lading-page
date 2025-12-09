import { loadStripe, Stripe } from '@stripe/stripe-js';

// Carrega a chave pública do Stripe
const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
    console.warn('⚠️ VITE_STRIPE_PUBLISHABLE_KEY não está configurada no arquivo .env');
}

// Singleton do Stripe
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(stripePublishableKey || '');
    }
    return stripePromise;
};

// Tipos para os planos
export interface StripePlan {
    name: string;
    priceId: string; // ID do Price no Stripe Dashboard
    amount: number; // Valor em centavos
    currency: string;
    interval: 'month' | 'year';
    intervalCount: number;
}

// Configuração dos planos - SUBSTITUA OS priceId PELOS SEUS IDs DO STRIPE
// ⚠️ IMPORTANTE: Use PRICE ID (price_...), NÃO Product ID (prod_...)
// Para obter o Price ID:
// 1. Acesse: https://dashboard.stripe.com/products
// 2. Clique no produto
// 3. Na seção "Pricing", copie o ID que começa com "price_"
export const stripePlans: Record<string, StripePlan> = {
    inicial: {
        name: 'Inicial',
        // ⚠️ COLE O PRICE ID AQUI - Deve começar com "price_" (ex: price_1ABC123...)
        // Dashboard → Products → [Clique no Produto] → Seção "Pricing" → API ID
        priceId: 'price_1ScH05GYgIAmLgw9jIwTrqyj',
        amount: 14700, // R$ 147,00 em centavos
        currency: 'brl',
        interval: 'month',
        intervalCount: 3,
    },
    profissional: {
        name: 'Profissional',
        // ⚠️ COLE O PRICE ID AQUI - Deve começar com "price_" (ex: price_1XYZ789...)
        // NÃO use: req_..., prod_..., ou qualquer outro prefixo!
        priceId: 'price_1ScH0aGYgIAmLgw9SdKDLtom',
        amount: 24700, // R$ 247,00 em centavos
        currency: 'brl',
        interval: 'month',
        intervalCount: 6,
    },
    enterprise: {
        name: 'Enterprise',
        priceId: 'price_ENTERPRISE_AQUI', // Opcional - apenas se tiver plano Enterprise
        amount: 0, // Personalizado
        currency: 'brl',
        interval: 'year',
        intervalCount: 1,
    },
};
