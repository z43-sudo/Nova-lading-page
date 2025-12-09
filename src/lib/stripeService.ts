// Serviço para criar sessões de checkout do Stripe
const API_URL = import.meta.env.VITE_APP_URL || 'http://localhost:5173';
const BACKEND_URL = 'http://localhost:3001'; // ⚠️ AJUSTAR para URL do seu backend em produção

export interface CreateCheckoutSessionParams {
    priceId: string;
    planName: string;
    successUrl?: string;
    cancelUrl?: string;
    customerEmail?: string;
}

export interface CheckoutSessionResponse {
    sessionId: string;
    url: string;
}

/**
 * Cria uma sessão de checkout no Stripe
 */
export async function createCheckoutSession(
    params: CreateCheckoutSessionParams
): Promise<CheckoutSessionResponse> {
    const {
        priceId,
        planName,
        successUrl = `${API_URL}/payment-success`,
        cancelUrl = `${API_URL}/payment-cancel`,
        customerEmail,
    } = params;

    try {
        const response = await fetch(`${BACKEND_URL}/api/create-checkout-session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                priceId,
                planName,
                successUrl,
                cancelUrl,
                customerEmail,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao criar sessão de checkout');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao criar checkout session:', error);
        throw error;
    }
}

/**
 * Redireciona para o checkout do Stripe
 */
export async function redirectToCheckout(params: CreateCheckoutSessionParams): Promise<void> {
    try {
        const { url } = await createCheckoutSession(params);

        // Redireciona para a página de checkout do Stripe
        window.location.href = url;
    } catch (error) {
        console.error('Erro ao redirecionar para checkout:', error);
        throw error;
    }
}

/**
 * Verifica o status de uma sessão de checkout
 */
export async function getCheckoutSession(sessionId: string) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/checkout-session/${sessionId}`);

        if (!response.ok) {
            throw new Error('Erro ao buscar sessão de checkout');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar checkout session:', error);
        throw error;
    }
}
