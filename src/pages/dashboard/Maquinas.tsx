import { Tractor } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Maquinas = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Maquinário</h1>
            <EmptyState
                icon={Tractor}
                title="Nenhuma máquina cadastrada"
                description="Cadastre seus tratores, colheitadeiras e implementos para gerenciar manutenções e custos."
                actionLabel="Adicionar Máquina"
                onAction={() => console.log("Adicionar máquina")}
            />
        </div>
    );
};

export default Maquinas;
