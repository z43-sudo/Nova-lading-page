import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Shield, Link as LinkIcon, User } from "lucide-react";

const Configuracoes = () => {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Configurações</h1>

            <Tabs defaultValue="notificacoes" className="w-full">
                <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
                    <TabsTrigger value="geral">Geral</TabsTrigger>
                    <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
                    <TabsTrigger value="seguranca">Segurança</TabsTrigger>
                    <TabsTrigger value="integracoes">Integrações</TabsTrigger>
                </TabsList>

                <TabsContent value="geral" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="w-5 h-5" />
                                Informações da Conta
                            </CardTitle>
                            <CardDescription>
                                Gerencie suas informações pessoais e da fazenda.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nome da Fazenda</Label>
                                <Input id="name" placeholder="Fazenda Santa Maria" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="owner">Proprietário</Label>
                                <Input id="owner" placeholder="Seu nome" />
                            </div>
                            <Button>Salvar Alterações</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notificacoes" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Preferências de Notificação
                            </CardTitle>
                            <CardDescription>
                                Escolha como você deseja ser notificado sobre as atividades.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="email-notif" className="flex flex-col space-y-1">
                                    <span>Notificações por Email</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receba resumos diários e alertas importantes.</span>
                                </Label>
                                <Switch id="email-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="push-notif" className="flex flex-col space-y-1">
                                    <span>Notificações Push</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receba alertas em tempo real no navegador.</span>
                                </Label>
                                <Switch id="push-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="whatsapp-notif" className="flex flex-col space-y-1">
                                    <span>Alertas via WhatsApp</span>
                                    <span className="font-normal text-xs text-muted-foreground">Receba alertas críticos diretamente no seu WhatsApp.</span>
                                </Label>
                                <Switch id="whatsapp-notif" />
                            </div>
                            <Button>Salvar Preferências</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="seguranca" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Shield className="w-5 h-5" />
                                Segurança da Conta
                            </CardTitle>
                            <CardDescription>
                                Gerencie sua senha e métodos de autenticação.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="current-password">Senha Atual</Label>
                                <Input id="current-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="new-password">Nova Senha</Label>
                                <Input id="new-password" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                                <Input id="confirm-password" type="password" />
                            </div>
                            <Button variant="destructive">Atualizar Senha</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="integracoes" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <LinkIcon className="w-5 h-5" />
                                Integrações
                            </CardTitle>
                            <CardDescription>
                                Conecte-se com outros serviços e plataformas.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center">
                                        <span className="font-bold text-blue-600">W</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Previsão do Tempo</h4>
                                        <p className="text-sm text-muted-foreground">Conectar com serviço de meteorologia</p>
                                    </div>
                                </div>
                                <Button variant="outline">Conectar</Button>
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center">
                                        <span className="font-bold text-green-600">M</span>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Maquinário IoT</h4>
                                        <p className="text-sm text-muted-foreground">Sincronizar dados de telemetria</p>
                                    </div>
                                </div>
                                <Button variant="outline">Conectar</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Configuracoes;
