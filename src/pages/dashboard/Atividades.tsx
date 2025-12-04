import { Calendar } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Atividades = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Atividades Agrícolas</h1>
            <EmptyState
                icon={Calendar}
                title="Nenhuma atividade planejada"
                description="Organize o dia a dia da fazenda. Crie e delegue tarefas para sua equipe e acompanhe o progresso."
                actionLabel="Nova Atividade"
                onAction={() => console.log("Criar nova atividade")}
            />
        </div>
    );
};

export default Atividades;
