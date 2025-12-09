import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader2 } from 'lucide-react';
import { redirectToCheckout } from '@/lib/stripeService';
import { stripePlans } from '@/lib/stripe';
import { useToast } from '@/hooks/use-toast';

interface StripePaymentButtonProps {
    planKey: 'inicial' | 'profissional' | 'enterprise';
    planName: string;
    ctaText: string;
    highlighted?: boolean;
    customerEmail?: string;
    onError?: (error: Error) => void;
}

export function StripePaymentButton({
    planKey,
    planName,
    ctaText,
    highlighted = false,
    customerEmail,
    onError,
}: StripePaymentButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handlePayment = async () => {
        const plan = stripePlans[planKey];

        if (!plan) {
            toast({
                title: 'Erro',
                description: 'Plano não encontrado',
                variant: 'destructive',
            });
            return;
        }

        // Validação da chave do Stripe
        if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
            toast({
                title: 'Configuração Pendente',
                description: 'A chave do Stripe ainda não foi configurada. Por favor, configure VITE_STRIPE_PUBLISHABLE_KEY no arquivo .env',
                variant: 'destructive',
            });
            return;
        }

        // Validação do Price ID
        if (plan.priceId.includes('XXXXXXXXXXXXX')) {
            toast({
                title: 'Configuração Pendente',
                description: `O Price ID do plano ${planName} ainda não foi configurado. Configure em src/lib/stripe.ts`,
                variant: 'destructive',
            });
            return;
        }

        setIsLoading(true);

        try {
            await redirectToCheckout({
                priceId: plan.priceId,
                planName: planName,
                customerEmail: customerEmail,
            });
        } catch (error) {
            console.error('Erro ao processar pagamento:', error);

            toast({
                title: 'Erro ao processar pagamento',
                description: error instanceof Error ? error.message : 'Tente novamente mais tarde',
                variant: 'destructive',
            });

            if (onError && error instanceof Error) {
                onError(error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button
            variant={highlighted ? 'hero' : 'default'}
            size="lg"
            className="w-full group"
            onClick={handlePayment}
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                </>
            ) : (
                <>
                    {ctaText}
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </>
            )}
        </Button>
    );
}
