# 🚀 Integração Stripe - Guia Rápido

## ✅ Checklist de Configuração

### 1️⃣ Configurar Price IDs
- [ ] Acesse: https://dashboard.stripe.com/test/products
- [ ] Copie o Price ID do Plano Inicial (começa com `price_`)
- [ ] Copie o Price ID do Plano Profissional
- [ ] Cole em `src/lib/stripe.ts`

### 2️⃣ Configurar Variáveis de Ambiente (.env)
- [ ] Acesse: https://dashboard.stripe.com/test/apikeys
- [ ] Copie a Publishable Key (`pk_test_...`)
- [ ] Copie a Secret Key (`sk_test_...`)
- [ ] Adicione no arquivo `.env`:

```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_sua_chave_aqui
STRIPE_SECRET_KEY=sk_test_sua_chave_aqui
VITE_APP_URL=http://localhost:5173
```

### 3️⃣ Instalar e Executar
```bash
# Instalar dependências do backend
cd server
npm install

# Terminal 1: Frontend
npm run dev

# Terminal 2: Backend
cd server
npm run dev
```

### 4️⃣ Testar
- [ ] Acesse: http://localhost:5173/precos
- [ ] Clique em "Começar agora"
- [ ] Use cartão de teste: `4242 4242 4242 4242`

---

## 🔧 Estrutura de Arquivos

```
├── src/
│   ├── lib/
│   │   ├── stripe.ts              # ⚠️ Configurar Price IDs
│   │   └── stripeService.ts
│   ├── components/
│   │   └── StripePaymentButton.tsx
│   └── pages/
│       ├── PaymentSuccess.tsx
│       └── PaymentCancel.tsx
│
├── server/
│   ├── index.js                   # Servidor backend
│   └── package.json
│
└── .env                           # ⚠️ Configurar chaves Stripe
```

---

## 🚨 Problemas Comuns

### "Price ID not configured"
→ Substitua `price_XXXXX` pelos IDs reais em `src/lib/stripe.ts`

### "Failed to fetch"
→ Certifique-se que o backend está rodando em http://localhost:3001

### "Stripe client not initialized"
→ Adicione `VITE_STRIPE_PUBLISHABLE_KEY` no `.env`

---

## 📚 Links Úteis

- **Stripe Dashboard:** https://dashboard.stripe.com
- **API Keys:** https://dashboard.stripe.com/test/apikeys
- **Products:** https://dashboard.stripe.com/test/products
- **Documentação:** https://stripe.com/docs

---

## 🔒 Segurança

- ✅ `.env` está no `.gitignore`
- ✅ Use `pk_test_` e `sk_test_` em desenvolvimento
- ✅ Nunca commite a Secret Key

---

**Após configurar, teste o pagamento em http://localhost:5173/precos** 🎉
