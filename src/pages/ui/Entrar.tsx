import { motion } from "framer-motion";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
    Leaf,
    Mail,
    Lock,
    User,
    ArrowRight,
    CheckCircle2,
    TrendingUp,
    Shield,
    Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

const benefits = [
    {
        icon: TrendingUp,
        title: "Aumente sua produtividade",
        description: "Gestão completa da fazenda em uma única plataforma",
    },
    {
        icon: Shield,
        title: "Dados seguros",
        description: "Suas informações protegidas com criptografia de ponta",
    },
    {
        icon: Smartphone,
        title: "Acesse de qualquer lugar",
        description: "Use no celular, tablet ou computador",
    },
];

const Entrar = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [redirect, setRedirect] = useState<string | null>(null);
    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });
    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
    });

    const validateLogin = () => {
        let isValid = true;
        const newErrors = { email: "", password: "", name: "", confirmPassword: "" };

        if (!loginData.email.trim()) {
            newErrors.email = "Email é obrigatório";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = "Email inválido";
            isValid = false;
        }

        if (!loginData.password) {
            newErrors.password = "Senha é obrigatória";
            isValid = false;
        } else if (loginData.password.length < 6) {
            newErrors.password = "Senha deve ter no mínimo 6 caracteres";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const validateSignup = () => {
        let isValid = true;
        const newErrors = { email: "", password: "", name: "", confirmPassword: "" };

        if (!signupData.name.trim()) {
            newErrors.name = "Nome é obrigatório";
            isValid = false;
        }

        if (!signupData.email.trim()) {
            newErrors.email = "Email é obrigatório";
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
            newErrors.email = "Email inválido";
            isValid = false;
        }

        if (!signupData.password) {
            newErrors.password = "Senha é obrigatória";
            isValid = false;
        } else if (signupData.password.length < 6) {
            newErrors.password = "Senha deve ter no mínimo 6 caracteres";
            isValid = false;
        }

        if (!signupData.confirmPassword) {
            newErrors.confirmPassword = "Confirmação de senha é obrigatória";
            isValid = false;
        } else if (signupData.password !== signupData.confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateLogin()) {
            try {
                const { error } = await supabase.auth.signInWithPassword({
                    email: loginData.email,
                    password: loginData.password,
                });

                if (error) throw error;

                toast.success("Login realizado com sucesso!");
                setRedirect("/");
            } catch (error: any) {
                toast.error(error.message || "Erro ao realizar login");
            }
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateSignup()) {
            try {
                const { error } = await supabase.auth.signUp({
                    email: signupData.email,
                    password: signupData.password,
                    options: {
                        data: {
                            full_name: signupData.name
                        },
                    },
                });

                if (error) throw error;

                toast.success("Conta criada com sucesso! Verifique seu email.");
                setRedirect("/");
            } catch (error: any) {
                toast.error(error.message || "Erro ao criar conta");
            }
        }
    };

    if (redirect) {
        return <Navigate to={redirect} replace />;
    }

    return (
        <div className="min-h-screen bg-background flex">
            {/* Left Side - Benefits */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-agro-green to-agro-green-dark p-12 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-agro-lime/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-agro-yellow/10 rounded-full blur-3xl" />

                <div className="relative z-10 flex flex-col justify-between text-primary-foreground w-full max-w-lg mx-auto">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-agro-lime flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-agro-green-dark" />
                        </div>
                        <span className="text-2xl font-bold">
                            Agro<span className="text-agro-lime">Inteligente</span>
                        </span>
                    </div>

                    {/* Main Content */}
                    <div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                        >
                            Gestão agrícola{" "}
                            <span className="text-agro-lime">inteligente e simples</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-lg text-primary-foreground/90 mb-12"
                        >
                            Junte-se a milhares de produtores que já modernizaram a gestão de
                            suas fazendas.
                        </motion.p>

                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-12 h-12 bg-primary-foreground/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="w-6 h-6 text-agro-lime" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">{benefit.title}</h3>
                                        <p className="text-primary-foreground/80">
                                            {benefit.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center gap-6 text-sm text-primary-foreground/70">
                        <span>✓ 30 dias grátis</span>
                        <span>✓ Sem cartão de crédito</span>
                        <span>✓ Cancele quando quiser</span>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    {/* Mobile Logo */}
                    <div className="flex lg:hidden items-center gap-3 mb-8 justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-primary-foreground" />
                        </div>
                        <span className="text-2xl font-bold text-foreground">
                            Agro<span className="text-primary">Inteligente</span>
                        </span>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 mb-8 bg-muted p-1 rounded-full">
                        <button
                            onClick={() => setIsLogin(true)}
                            className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${isLogin
                                ? "bg-primary text-primary-foreground shadow-button"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Entrar
                        </button>
                        <button
                            onClick={() => setIsLogin(false)}
                            className={`flex-1 py-3 px-6 rounded-full font-semibold transition-all ${!isLogin
                                ? "bg-primary text-primary-foreground shadow-button"
                                : "text-muted-foreground hover:text-foreground"
                                }`}
                        >
                            Criar Conta
                        </button>
                    </div>

                    {/* Login Form */}
                    {isLogin ? (
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-2">
                                    Bem-vindo de volta!
                                </h2>
                                <p className="text-muted-foreground">
                                    Acesse sua conta para continuar
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="login-email" className="text-foreground mb-2">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="login-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                                        value={loginData.email}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, email: e.target.value })
                                        }
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="login-password" className="text-foreground mb-2">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="login-password"
                                        type="password"
                                        placeholder="••••••••"
                                        className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                                        value={loginData.password}
                                        onChange={(e) =>
                                            setLoginData({ ...loginData, password: e.target.value })
                                        }
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" className="rounded" />
                                    <span className="text-sm text-muted-foreground">
                                        Lembrar-me
                                    </span>
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-primary hover:underline font-medium"
                                >
                                    Esqueci a senha
                                </a>
                            </div>

                            <Button type="submit" size="lg" className="w-full group">
                                Entrar
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                            </Button>

                            <div className="relative">
                                <Separator className="my-6" />
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
                                    ou
                                </span>
                            </div>

                            <p className="text-center text-sm text-muted-foreground">
                                Não tem uma conta?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(false)}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Criar conta grátis
                                </button>
                            </p>
                        </form>
                    ) : (
                        /* Signup Form */
                        <form onSubmit={handleSignup} className="space-y-6">
                            <div>
                                <h2 className="text-3xl font-bold text-foreground mb-2">
                                    Crie sua conta
                                </h2>
                                <p className="text-muted-foreground">
                                    Comece grátis por 30 dias, sem cartão de crédito
                                </p>
                            </div>

                            <div>
                                <Label htmlFor="signup-name" className="text-foreground mb-2">
                                    Nome completo
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="signup-name"
                                        placeholder="Seu nome"
                                        className={`pl-10 ${errors.name ? "border-destructive" : ""}`}
                                        value={signupData.name}
                                        onChange={(e) =>
                                            setSignupData({ ...signupData, name: e.target.value })
                                        }
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-destructive text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="signup-email" className="text-foreground mb-2">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="signup-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                        className={`pl-10 ${errors.email ? "border-destructive" : ""}`}
                                        value={signupData.email}
                                        onChange={(e) =>
                                            setSignupData({ ...signupData, email: e.target.value })
                                        }
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-destructive text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <Label htmlFor="signup-password" className="text-foreground mb-2">
                                    Senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="signup-password"
                                        type="password"
                                        placeholder="Mínimo 6 caracteres"
                                        className={`pl-10 ${errors.password ? "border-destructive" : ""}`}
                                        value={signupData.password}
                                        onChange={(e) =>
                                            setSignupData({ ...signupData, password: e.target.value })
                                        }
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label
                                    htmlFor="signup-confirm-password"
                                    className="text-foreground mb-2"
                                >
                                    Confirme a senha
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="signup-confirm-password"
                                        type="password"
                                        placeholder="Digite a senha novamente"
                                        className={`pl-10 ${errors.confirmPassword ? "border-destructive" : ""
                                            }`}
                                        value={signupData.confirmPassword}
                                        onChange={(e) =>
                                            setSignupData({
                                                ...signupData,
                                                confirmPassword: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-destructive text-sm mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input type="checkbox" className="mt-1 rounded" required />
                                    <span className="text-sm text-muted-foreground">
                                        Concordo com os{" "}
                                        <a href="#" className="text-primary hover:underline">
                                            Termos de Uso
                                        </a>{" "}
                                        e{" "}
                                        <a href="#" className="text-primary hover:underline">
                                            Política de Privacidade
                                        </a>
                                    </span>
                                </label>
                            </div>

                            <Button type="submit" size="lg" className="w-full group">
                                Criar conta grátis
                                <CheckCircle2 className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </Button>

                            <div className="relative">
                                <Separator className="my-6" />
                                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4 text-sm text-muted-foreground">
                                    ou
                                </span>
                            </div>

                            <p className="text-center text-sm text-muted-foreground">
                                Já tem uma conta?{" "}
                                <button
                                    type="button"
                                    onClick={() => setIsLogin(true)}
                                    className="text-primary font-semibold hover:underline"
                                >
                                    Fazer login
                                </button>
                            </p>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default Entrar;
