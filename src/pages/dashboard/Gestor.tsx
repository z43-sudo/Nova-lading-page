import { UserCog } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Gestor = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Área do Gestor</h1>
            <EmptyState
                icon={UserCog}
                title="Nenhuma configuração de gestão"
                description="Defina metas, visualize relatórios gerenciais e configure parâmetros da fazenda."
                actionLabel="Configurar Gestão"
                onAction={() => console.log("Configurar gestão")}
            />
        </div>
    );
};

export default Gestor;
