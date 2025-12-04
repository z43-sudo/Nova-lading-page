import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            <div className="text-center max-w-2xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Página não encontrada
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Ops! A página que você está procurando não existe ou foi movida.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/">
                        <Button size="lg" className="gap-2">
                            <Home className="w-5 h-5" />
                            Voltar para Início
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.history.back()}
                        className="gap-2"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Voltar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
