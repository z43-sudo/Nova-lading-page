import { Truck } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Logistica = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Logística e Transporte</h1>
            <EmptyState
                icon={Truck}
                title="Nenhuma operação logística"
                description="Gerencie o transporte da sua produção, fretes e movimentações de carga."
                actionLabel="Nova Operação"
                onAction={() => console.log("Nova operação")}
            />
        </div>
    );
};

export default Logistica;
