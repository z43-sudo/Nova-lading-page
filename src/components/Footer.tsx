import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const productLinks = [
  { label: "Funcionalidades", href: "/funcionalidades" },
  { label: "Preços", href: "/precos" },
  { label: "Integrações", href: "#" },
  { label: "FAQ", href: "/precos" }, // FAQ está na página de preços
];

const companyLinks = [
  { label: "Sobre nós", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Carreiras", href: "#" },
  { label: "Contato", href: "/contato" },
];

const Footer = () => {
  return (
    <footer className="bg-agro-green-dark text-primary-foreground py-16">
      <div className="container-agro">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-agro-lime flex items-center justify-center">
                <Leaf className="w-5 h-5 text-agro-green-dark" />
              </div>
              <span className="text-xl font-bold">
                Agro<span className="text-agro-lime">Inteligente</span>
              </span>
            </div>
            <p className="text-primary-foreground/70 leading-relaxed">
              Tecnologia para o campo. Gestão agrícola simples, inteligente e de alta precisão.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Produto</h4>
            <ul className="space-y-3">
              {productLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-primary-foreground/70 hover:text-agro-lime transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="font-bold text-lg mb-4">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.href} className="text-primary-foreground/70 hover:text-agro-lime transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contato</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Mail className="w-5 h-5 text-agro-lime" />
                contato@agrointeligente.com.br
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <Phone className="w-5 h-5 text-agro-lime" />
                (62) 992211395
              </li>
              <li className="flex items-center gap-3 text-primary-foreground/70">
                <MapPin className="w-5 h-5 text-agro-lime" />
                Goiás, Brasil
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-primary-foreground/60 text-sm">
            © 2024 Agro Inteligente. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-primary-foreground/60 hover:text-agro-lime text-sm transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-agro-lime text-sm transition-colors">
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
