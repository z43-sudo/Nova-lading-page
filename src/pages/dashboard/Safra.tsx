import { Sprout } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Safra = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gestão de Safra</h1>
            <EmptyState
                icon={Sprout}
                title="Nenhuma safra registrada"
                description="Comece registrando sua primeira safra para acompanhar o ciclo produtivo, estimativas e resultados."
                actionLabel="Nova Safra"
                onAction={() => console.log("Criar nova safra")}
            />
        </div>
    );
};

export default Safra;
