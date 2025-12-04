import { Beef } from "lucide-react";
import { EmptyState } from "@/components/dashboard/EmptyState";

const Pecuaria = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Gestão Pecuária</h1>
            <EmptyState
                icon={Beef}
                title="Nenhum rebanho registrado"
                description="Controle seu rebanho, manejo sanitário, reprodução e engorda de forma eficiente."
                actionLabel="Cadastrar Rebanho"
                onAction={() => console.log("Cadastrar rebanho")}
            />
        </div>
    );
};

export default Pecuaria;
