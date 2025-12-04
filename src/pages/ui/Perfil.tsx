import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Settings, Mail, Phone, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const Perfil = () => {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session?.user) {
                setUserData({
                    full_name: session.user.user_metadata?.full_name || "",
                    email: session.user.email || "",
                    phone: session.user.user_metadata?.phone || "",
                    address: session.user.user_metadata?.address || "",
                });
            }
            setLoading(false);
        };

        fetchUser();
    }, []);

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    full_name: userData.full_name,
                    phone: userData.phone,
                    address: userData.address,
                }
            });

            if (error) throw error;
            toast.success("Perfil atualizado com sucesso!");
        } catch (error: any) {
            toast.error(error.message || "Erro ao atualizar perfil");
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />

            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="container-agro max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Meu Perfil</h1>
                                <p className="text-muted-foreground">Gerencie suas informações pessoais</p>
                            </div>
                        </div>

                        <div className="grid gap-8 md:grid-cols-[250px_1fr]">
                            {/* Sidebar Navigation (Optional for future expansion) */}
                            <nav className="flex flex-col gap-2">
                                <Button variant="secondary" className="justify-start">
                                    <User className="mr-2 h-4 w-4" />
                                    Dados Pessoais
                                </Button>
                                <Button variant="ghost" className="justify-start">
                                    <Settings className="mr-2 h-4 w-4" />
                                    Configurações
                                </Button>
                            </nav>

                            {/* Main Content */}
                            <div className="glass-card p-8 rounded-2xl border border-border/50">
                                <form onSubmit={handleUpdate} className="space-y-6">
                                    <div className="grid gap-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Nome Completo</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="full_name"
                                                    value={userData.full_name}
                                                    onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                                                    className="pl-10"
                                                    placeholder="Seu nome completo"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="email"
                                                    value={userData.email}
                                                    disabled
                                                    className="pl-10 bg-muted/50"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Telefone</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="phone"
                                                    value={userData.phone}
                                                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                    className="pl-10"
                                                    placeholder="(00) 00000-0000"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="address">Endereço</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                                <Input
                                                    id="address"
                                                    value={userData.address}
                                                    onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                                                    className="pl-10"
                                                    placeholder="Seu endereço"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <Separator />

                                    <div className="flex justify-end">
                                        <Button type="submit" disabled={loading}>
                                            <Save className="mr-2 h-4 w-4" />
                                            Salvar Alterações
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Perfil;
