# 📁 Estrutura da Integração Stripe

## Arquivos Criados/Modificados

```
Nova lading page/
│
├── 📄 .env.example                    # Template de variáveis de ambiente
├── 📄 .gitignore                      # Atualizado para proteger .env
├── 📄 STRIPE_SETUP.md                 # Guia completo de configuração
├── 📄 STRIPE_CHECKLIST.md             # Checklist rápido
│
├── src/
│   ├── lib/
│   │   ├── 📄 stripe.ts               # ⚠️ Configuração do Stripe (CONFIGURAR Price IDs)
│   │   └── 📄 stripeService.ts        # Serviço de comunicação com backend
│   │
│   ├── components/
│   │   └── 📄 StripePaymentButton.tsx # Componente de botão de pagamento
│   │
│   ├── pages/
│   │   ├── 📄 PaymentSuccess.tsx      # Página de sucesso
│   │   ├── 📄 PaymentCancel.tsx       # Página de cancelamento
│   │   └── ui/
│   │       └── 📄 Precos.tsx          # Atualizado com botões Stripe
│   │
│   └── 📄 App.tsx                     # Atualizado com novas rotas
│
└── server/                            # 🆕 Novo servidor backend
    ├── 📄 package.json                # Dependências do servidor
    └── 📄 index.js                    # ⚠️ Servidor Express + Stripe API

```

## 🔑 Variáveis de Ambiente Necessárias

Configure no arquivo `.env`:

```env
# Frontend
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...    # ⚠️ Obter do Stripe Dashboard
VITE_APP_URL=http://localhost:5173

# Backend
STRIPE_SECRET_KEY=sk_test_...              # ⚠️ Obter do Stripe Dashboard
STRIPE_WEBHOOK_SECRET=whsec_...            # ⚠️ Obter do Stripe CLI ou Dashboard
```

## 🎯 Locais que Precisam de Configuração

### 1️⃣ Arquivo `.env` (RAIZ DO PROJETO)
```
⚠️ ADICIONAR:
- VITE_STRIPE_PUBLISHABLE_KEY
- STRIPE_SECRET_KEY
```

### 2️⃣ Arquivo `src/lib/stripe.ts`
```typescript
⚠️ SUBSTITUIR os Price IDs:
- inicial.priceId: 'price_XXXXXXXXXXXXX'
- profissional.priceId: 'price_XXXXXXXXXXXXX'
```

### 3️⃣ Stripe Dashboard
```
⚠️ CRIAR:
- Produto: Plano Inicial (R$ 147,00 / 3 meses)
- Produto: Plano Profissional (R$ 247,00 / 6 meses)
- Copiar os Price IDs
```

## 🚀 Como Executar

### Terminal 1: Frontend
```bash
npm run dev
```
→ http://localhost:5173

### Terminal 2: Backend
```bash
cd server
npm install  # Primeira vez apenas
npm run dev
```
→ http://localhost:3001

## 🔄 Fluxo de Pagamento

```
1. Usuário clica em "Começar agora" na página /precos
   ↓
2. StripePaymentButton chama redirectToCheckout()
   ↓
3. Frontend faz POST para backend: /api/create-checkout-session
   ↓
4. Backend cria sessão no Stripe e retorna URL
   ↓
5. Usuário é redirecionado para checkout.stripe.com
   ↓
6. Usuário preenche dados do cartão
   ↓
7. Stripe processa pagamento
   ↓
8. Redirecionamento:
   - Sucesso → /payment-success?session_id=xxx
   - Cancelado → /payment-cancel
   ↓
9. Stripe envia webhook para /webhook (backend)
   ↓
10. Backend processa evento e atualiza banco de dados
```

## 📊 Endpoints da API Backend

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Verifica se o servidor está funcionando |
| POST | `/api/create-checkout-session` | Cria sessão de checkout |
| GET | `/api/checkout-session/:id` | Busca detalhes da sessão |
| POST | `/webhook` | Recebe eventos do Stripe |

## 🧪 Cartões de Teste

| Número | Resultado |
|--------|-----------|
| `4242 4242 4242 4242` | ✅ Sucesso |
| `4000 0027 6000 3184` | 🔐 Requer autenticação |
| `4000 0000 0000 0002` | ❌ Falha |

**Data:** Qualquer data futura (ex: 12/25)  
**CVC:** Qualquer 3 dígitos (ex: 123)

## 📝 Próximos Passos

Após configurar tudo:

1. ✅ Testar pagamento com cartão de teste
2. ✅ Verificar redirecionamento para página de sucesso
3. ✅ Configurar webhook (opcional para dev)
4. ✅ Implementar lógica de ativação de assinatura no webhook
5. ✅ Integrar com Supabase para salvar assinaturas
6. ✅ Testar em produção com chaves LIVE

## 🔒 Segurança

- ✅ `.env` está no `.gitignore`
- ✅ Secret Key nunca é exposta no frontend
- ✅ Webhooks são verificados com assinatura
- ✅ CORS configurado para aceitar apenas seu domínio

## 📚 Documentação

- **Guia Completo:** `STRIPE_SETUP.md`
- **Checklist:** `STRIPE_CHECKLIST.md`
- **Stripe Docs:** https://stripe.com/docs
- **Stripe Testing:** https://stripe.com/docs/testing

---

**Desenvolvido para AgroInteligente** 🌱
