import { Package } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Estoque = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Controle de Estoque</h1>
            <EmptyState
                icon={Package}
                title="Estoque vazio"
                description="Controle insumos, peças e produtos. Mantenha seu inventário sempre atualizado."
                actionLabel="Adicionar Item"
                onAction={() => console.log("Adicionar item")}
            />
        </div>
    );
};

export default Estoque;
