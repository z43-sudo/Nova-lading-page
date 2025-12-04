import { Users } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Equipe = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gestão de Equipe</h1>
            <EmptyState
                icon={Users}
                title="Nenhum colaborador cadastrado"
                description="Cadastre seus funcionários, gerencie funções e permissões de acesso ao sistema."
                actionLabel="Adicionar Colaborador"
                onAction={() => console.log("Adicionar colaborador")}
            />
        </div>
    );
};

export default Equipe;
