import { DollarSign } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Financeiro = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gestão Financeira</h1>
            <EmptyState
                icon={DollarSign}
                title="Nenhum lançamento financeiro"
                description="Acompanhe o fluxo de caixa, contas a pagar e receber, e resultados da safra."
                actionLabel="Novo Lançamento"
                onAction={() => console.log("Novo lançamento")}
            />
        </div>
    );
};

export default Financeiro;
