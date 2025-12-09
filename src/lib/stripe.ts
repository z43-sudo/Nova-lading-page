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
export const stripePlans: Record<string, StripePlan> = {
    inicial: {
        name: 'Inicial',
        priceId: 'prod_TZPpCD33rZMOTG', // ⚠️ SUBSTITUIR pelo ID do Stripe
        amount: 14700, // R$ 147,00 em centavos
        currency: 'brl',
        interval: 'month',
        intervalCount: 3,
    },
    profissional: {
        name: 'Profissional',
        priceId: 'prod_TZPqKuNfnK5Q5E', // ⚠️ SUBSTITUIR pelo ID do Stripe
        amount: 24700, // R$ 247,00 em centavos
        currency: 'brl',
        interval: 'month',
        intervalCount: 6,
    },
    enterprise: {
        name: 'Enterprise',
        priceId: 'price_XXXXXXXXXXXXX', // ⚠️ SUBSTITUIR pelo ID do Stripe (se aplicável)
        amount: 0, // Personalizado
        currency: 'brl',
        interval: 'year',
        intervalCount: 1,
    },
};
