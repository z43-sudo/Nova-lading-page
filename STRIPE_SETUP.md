# 🚀 Guia de Integração Stripe - AgroInteligente

Este guia contém todas as instruções para configurar e usar a integração do Stripe no seu projeto.

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Configuração do Stripe Dashboard](#configuração-do-stripe-dashboard)
3. [Configuração das Variáveis de Ambiente](#configuração-das-variáveis-de-ambiente)
4. [Instalação das Dependências](#instalação-das-dependências)
5. [Executando o Projeto](#executando-o-projeto)
6. [Testando a Integração](#testando-a-integração)
7. [Configuração do Webhook](#configuração-do-webhook)
8. [Deploy em Produção](#deploy-em-produção)

---

## 🔧 Pré-requisitos

- Node.js 18+ instalado
- Conta no Stripe (criar em https://stripe.com)
- Conta no Supabase (se ainda não tiver)

---

## 🎯 Configuração do Stripe Dashboard

### Passo 1: Criar Conta no Stripe

1. Acesse https://dashboard.stripe.com/register
2. Complete o cadastro
3. Ative o modo de teste (Test Mode) no canto superior direito

### Passo 2: Criar Produtos e Preços

1. No Dashboard do Stripe, vá em **Products** → **Add product**

2. **Plano Inicial (3 meses)**
   - Nome: `Plano Inicial - 3 Meses`
   - Descrição: `Plano inicial para pequenos produtores`
   - Preço: `R$ 147,00`
   - Tipo de cobrança: `Recurring` (Recorrente)
   - Intervalo: `Custom` → `Every 3 months`
   - Copie o **Price ID** (começa com `price_...`)

3. **Plano Profissional (6 meses)**
   - Nome: `Plano Profissional - 6 Meses`
   - Descrição: `Plano profissional para produtores médios`
   - Preço: `R$ 247,00`
   - Tipo de cobrança: `Recurring` (Recorrente)
   - Intervalo: `Custom` → `Every 6 months`
   - Copie o **Price ID** (começa com `price_...`)

### Passo 3: Obter as Chaves da API

1. No Dashboard, vá em **Developers** → **API keys**
2. Copie a **Publishable key** (começa com `pk_test_...`)
3. Copie a **Secret key** (começa com `sk_test_...`) - **NUNCA COMPARTILHE ESTA CHAVE!**

---

## 🔐 Configuração das Variáveis de Ambiente

### Passo 1: Configurar o arquivo `.env`

Na raiz do projeto, edite o arquivo `.env` (use o `.env.example` como referência):

```env
# Supabase Configuration
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase

# Stripe Configuration (Frontend)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_publicavel_aqui

# Stripe Configuration (Backend - NÃO COMMITAR)
STRIPE_SECRET_KEY=sk_test_sua_chave_secreta_aqui
STRIPE_WEBHOOK_SECRET=whsec_sua_chave_webhook_aqui

# App Configuration
VITE_APP_URL=http://localhost:5173
```

### Passo 2: Configurar os Price IDs

Edite o arquivo `src/lib/stripe.ts` e substitua os Price IDs:

```typescript
export const stripePlans: Record<string, StripePlan> = {
  inicial: {
    name: 'Inicial',
    priceId: 'price_XXXXX', // ⚠️ SUBSTITUIR pelo Price ID do Stripe
    amount: 14700,
    currency: 'brl',
    interval: 'month',
    intervalCount: 3,
  },
  profissional: {
    name: 'Profissional',
    priceId: 'price_YYYYY', // ⚠️ SUBSTITUIR pelo Price ID do Stripe
    amount: 24700,
    currency: 'brl',
    interval: 'month',
    intervalCount: 6,
  },
};
```

---

## 📦 Instalação das Dependências

### Frontend (já instalado)

As dependências do frontend já estão instaladas. Se precisar reinstalar:

```bash
npm install
```

### Backend

Instale as dependências do servidor:

```bash
cd server
npm install
```

---

## ▶️ Executando o Projeto

Você precisa executar **dois servidores** simultaneamente:

### Terminal 1: Frontend (Vite)

```bash
npm run dev
```

O frontend estará disponível em: http://localhost:5173

### Terminal 2: Backend (Express + Stripe)

```bash
cd server
npm run dev
```

O backend estará disponível em: http://localhost:3001

### Verificar se está funcionando

Acesse: http://localhost:3001/health

Você deve ver:
```json
{
  "status": "ok",
  "message": "Stripe Backend API está funcionando",
  "stripeConfigured": true
}
```

---

## 🧪 Testando a Integração

### Passo 1: Testar o Fluxo de Pagamento

1. Acesse http://localhost:5173/precos
2. Clique em "Começar agora" ou "Assinar agora" em qualquer plano
3. Você será redirecionado para o checkout do Stripe

### Passo 2: Usar Cartões de Teste

Use estes dados de teste do Stripe:

**Cartão de Sucesso:**
- Número: `4242 4242 4242 4242`
- Data: Qualquer data futura (ex: 12/25)
- CVC: Qualquer 3 dígitos (ex: 123)
- CEP: Qualquer CEP válido

**Cartão que Requer Autenticação:**
- Número: `4000 0027 6000 3184`

**Cartão que Falha:**
- Número: `4000 0000 0000 0002`

### Passo 3: Verificar o Resultado

Após o pagamento:
- **Sucesso**: Você será redirecionado para `/payment-success`
- **Cancelamento**: Você será redirecionado para `/payment-cancel`

---

## 🔔 Configuração do Webhook

Os webhooks permitem que o Stripe notifique seu backend sobre eventos (pagamentos, cancelamentos, etc.).

### Opção 1: Desenvolvimento Local (Stripe CLI)

1. **Instalar o Stripe CLI:**
   - Windows: https://github.com/stripe/stripe-cli/releases
   - Baixe e adicione ao PATH

2. **Login no Stripe CLI:**
   ```bash
   stripe login
   ```

3. **Iniciar o webhook local:**
   ```bash
   stripe listen --forward-to localhost:3001/webhook
   ```

4. **Copiar o Webhook Secret:**
   - O CLI mostrará algo como: `whsec_xxxxxxxxxxxxx`
   - Adicione ao `.env`: `STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx`

5. **Testar eventos:**
   ```bash
   stripe trigger checkout.session.completed
   ```

### Opção 2: Produção (Stripe Dashboard)

1. No Dashboard do Stripe, vá em **Developers** → **Webhooks**
2. Clique em **Add endpoint**
3. URL do endpoint: `https://seu-dominio.com/webhook`
4. Selecione os eventos:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Copie o **Signing secret** e adicione ao `.env` de produção

---

## 🚀 Deploy em Produção

### Passo 1: Atualizar Variáveis de Ambiente

No ambiente de produção, use as chaves **LIVE** do Stripe:

```env
# Stripe LIVE (Produção)
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_sua_chave_publicavel
STRIPE_SECRET_KEY=sk_live_sua_chave_secreta
STRIPE_WEBHOOK_SECRET=whsec_sua_chave_webhook_producao
VITE_APP_URL=https://seu-dominio.com
```

### Passo 2: Deploy do Backend

O backend pode ser hospedado em:
- **Vercel** (serverless functions)
- **Railway** (recomendado para Node.js)
- **Heroku**
- **AWS EC2**
- **DigitalOcean**

**Exemplo com Railway:**

1. Crie conta em https://railway.app
2. Conecte seu repositório GitHub
3. Configure as variáveis de ambiente
4. Deploy automático!

### Passo 3: Atualizar URL do Backend

No arquivo `src/lib/stripeService.ts`, atualize:

```typescript
const BACKEND_URL = process.env.NODE_ENV === 'production' 
  ? 'https://seu-backend.railway.app'
  : 'http://localhost:3001';
```

### Passo 4: Ativar Modo Live no Stripe

1. No Dashboard do Stripe, desative o "Test Mode"
2. Complete a ativação da conta (verificação de identidade, etc.)
3. Recrie os produtos e preços no modo LIVE
4. Atualize os Price IDs no código

---

## 📊 Monitoramento

### Logs do Stripe

- Acesse **Developers** → **Logs** no Dashboard
- Veja todas as requisições da API em tempo real

### Webhooks

- Acesse **Developers** → **Webhooks** → Seu endpoint
- Veja o histórico de eventos enviados e respostas

### Pagamentos

- Acesse **Payments** para ver todas as transações
- Acesse **Customers** para ver clientes
- Acesse **Subscriptions** para gerenciar assinaturas

---

## 🔒 Segurança

### ✅ Boas Práticas

- ✅ NUNCA commite o `.env` no Git
- ✅ Use `.env.example` como template
- ✅ Mantenha `STRIPE_SECRET_KEY` segura
- ✅ Valide webhooks com `STRIPE_WEBHOOK_SECRET`
- ✅ Use HTTPS em produção
- ✅ Implemente rate limiting no backend

### ❌ Nunca Faça

- ❌ Expor a Secret Key no frontend
- ❌ Processar pagamentos sem webhook verification
- ❌ Armazenar dados de cartão (deixe o Stripe fazer isso)
- ❌ Usar chaves de teste em produção

---

## 🆘 Troubleshooting

### Erro: "Stripe client not initialized"

**Solução:** Verifique se `VITE_STRIPE_PUBLISHABLE_KEY` está no `.env`

### Erro: "Price ID not configured"

**Solução:** Atualize os Price IDs em `src/lib/stripe.ts`

### Erro: "Backend não responde"

**Solução:** 
1. Verifique se o servidor backend está rodando na porta 3001
2. Teste: http://localhost:3001/health

### Webhook não funciona

**Solução:**
1. Verifique se `STRIPE_WEBHOOK_SECRET` está configurado
2. Use Stripe CLI para testar localmente
3. Verifique os logs do webhook no Dashboard

---

## 📚 Recursos Adicionais

- [Documentação do Stripe](https://stripe.com/docs)
- [Stripe Testing](https://stripe.com/docs/testing)
- [Webhooks Guide](https://stripe.com/docs/webhooks)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)

---

## 💬 Suporte

Se precisar de ajuda:
- WhatsApp: https://wa.me/5562992211395
- Email: suporte@agrointeligente.com

---

**Desenvolvido com ❤️ para AgroInteligente**
