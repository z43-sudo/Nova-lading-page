import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    Sprout,
    Calendar,
    Tractor,
    Beef,
    Truck,
    Package,
    DollarSign,
    Users,
    UserCog,
    Settings,
    Menu,
    X,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Visão Geral", href: "/dashboard" },
    { icon: Sprout, label: "Safra", href: "/dashboard/safra" },
    { icon: Calendar, label: "Atividades", href: "/dashboard/atividades" },
    { icon: Tractor, label: "Máquinas", href: "/dashboard/maquinas" },
    { icon: Beef, label: "Pecuária", href: "/dashboard/pecuaria" },
    { icon: Truck, label: "Logística", href: "/dashboard/logistica" },
    { icon: Package, label: "Estoque", href: "/dashboard/estoque" },
    { icon: DollarSign, label: "Financeiro", href: "/dashboard/financeiro" },
    { icon: Users, label: "Equipe", href: "/dashboard/equipe" },
    { icon: UserCog, label: "Gestor", href: "/dashboard/gestor" },
    { icon: Settings, label: "Configurações", href: "/dashboard/configuracoes" },
];

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const location = useLocation();

    return (
        <div className="min-h-screen bg-background flex">
            {/* Mobile Sidebar Overlay */}
            {!isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(true)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } fixed lg:relative lg:translate-x-0 z-50 w-64 h-screen bg-card border-r transition-transform duration-300 flex flex-col`}
            >
                <div className="p-6 flex items-center justify-between">
                    <span className="text-2xl font-bold">
                        Agro<span className="text-primary">Inteligente</span>
                    </span>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
                    {sidebarItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                to={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 mt-auto">
                    <Separator className="mb-4" />
                    <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10">
                        <LogOut className="w-5 h-5" />
                        Sair
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-hidden">
                <header className="h-16 border-b bg-card flex items-center justify-between px-6 lg:px-8">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            A
                        </div>
                        <span className="text-sm font-medium hidden sm:block">Alisson</span>
                    </div>
                </header>

                <div className="flex-1 overflow-auto p-6 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
