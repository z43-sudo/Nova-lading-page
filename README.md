# 🌾 Agro Inteligente - Landing Page

Uma landing page moderna e responsiva para gestão agrícola inteligente.

## 🚀 Tecnologias

- **React** 18.3.1
- **TypeScript** 5.8.3
- **Vite** 5.4.19
- **Tailwind CSS** 3.4.17
- **Framer Motion** 12.23.24
- **Radix UI** (componentes UI)
- **React Router DOM** 6.30.1
- **Shadcn/UI**

## 📁 Estrutura do Projeto

```
Nova lading page/
├── public/                 # Arquivos estáticos
├── src/
│   ├── assets/            # Imagens e recursos
│   │   ├── hero-farm.jpg
│   │   ├── farmer-1.jpg
│   │   ├── farmer-2.jpg
│   │   └── farmer-3.jpg
│   ├── components/        # Componentes React
│   │   ├── ui/           # Componentes UI (shadcn)
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsSection.tsx
│   │   ├── TechnologySection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   ├── hooks/            # Custom React Hooks
│   ├── lib/              # Utilitários
│   ├── pages/            # Páginas da aplicação
│   │   ├── Index.tsx     # Página principal
│   │   └── NotFound.tsx  # Página 404
│   ├── App.tsx           # Componente raiz
│   ├── main.tsx          # Entrada da aplicação
│   └── index.css         # Estilos globais
├── index.html
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Design

O projeto utiliza um sistema de design customizado com:
- **Cores principais**: Verde agrícola (#2D8659) e amarelo limão (#A4D65E)
- **Fonte**: Nunito
- **Animações suaves**: Framer Motion
- **Componentes responsivos**: Mobile-first
- **Efeitos glassmorfismo**: Cards com backdrop-blur
- **Modo escuro**: Suporte completo

## ⚙️ Instalação

1. **Clone o repositório** (se ainda não tiver)
```bash
git clone <seu-repositorio>
cd "Nova lading page"
```

2. **Instale as dependências**
```bash
npm install
```

## 🏃 Executando o Projeto

### Modo Desenvolvimento
```bash
npm run dev
```
Abra [http://localhost:8080](http://localhost:8080) no navegador.

### Build de Produção
```bash
npm run build
```
Os arquivos otimizados estarão na pasta `dist/`.

### Preview do Build
```bash
npm run preview
```

## 📝 Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm run build:dev` - Cria o build em modo desenvolvimento
- `npm run lint` - Executa o ESLint
- `npm run preview` - Preview do build de produção

## 🎯 Funcionalidades

✅ Landing page totalmente responsiva
✅ Seções:
  - Hero com CTA
  - Benefícios
  - Tecnologias
  - Depoimentos
  - CTA final
  - Footer completo
✅ Navegação suave
✅ Animações profissionais
✅ Otimização de performance
✅ SEO otimizado
✅ Página 404 personalizada

## 🌐 Deploy

Este projeto pode ser facilmente deployado em:
- **Vercel**: `npm run build` + deploy
- **Netlify**: Conecte o repositório
- **GitHub Pages**: Configure o workflow
- **Lovable**: Através da plataforma Lovable.dev

## 📦 Build

O projeto está configurado para gerar builds otimizados com:
- Code splitting
- Tree shaking
- Minificação
- Otimização de assets
- Source maps (em desenvolvimento)

## 🔧 Configuração

### Vite
- Porta: 8080
- Host: `::`
- Alias `@` aponta para `./src`

### TypeScript
- Strict mode desabilitado para facilitar desenvolvimento
- Path aliases configurados

### Tailwind CSS
- Configuração customizada com cores do projeto
- Animações personalizadas
- Plugins: tailwindcss-animate

## 📄 Licença

Este projeto é privado.

## 👨‍💻 Desenvolvimento

Desenvolvido com ❤️ para o agronegócio brasileiro.

---

**Nota**: Certifique-se de ter Node.js (versão 18+) e npm instalados antes de executar o projeto.
