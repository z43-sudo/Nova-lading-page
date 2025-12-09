# ✅ Checklist de Configuração Stripe

Use este checklist para garantir que tudo está configurado corretamente.

## 📝 Configuração Inicial

- [ ] Criar conta no Stripe (https://stripe.com)
- [ ] Ativar modo de teste (Test Mode)
- [ ] Criar produto "Plano Inicial - 3 Meses" (R$ 147,00)
- [ ] Criar produto "Plano Profissional - 6 Meses" (R$ 247,00)
- [ ] Copiar Price IDs dos produtos criados

## 🔑 Variáveis de Ambiente

Edite o arquivo `.env` na raiz do projeto:

- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` = `pk_test_...` (do Stripe Dashboard)
- [ ] `STRIPE_SECRET_KEY` = `sk_test_...` (do Stripe Dashboard)
- [ ] `VITE_APP_URL` = `http://localhost:5173`

## 💻 Código

Edite o arquivo `src/lib/stripe.ts`:

- [ ] Substituir `price_XXXXXXXXXXXXX` do plano Inicial pelo Price ID real
- [ ] Substituir `price_XXXXXXXXXXXXX` do plano Profissional pelo Price ID real

## 📦 Instalação

- [ ] Executar `npm install` na raiz do projeto
- [ ] Executar `cd server && npm install` para instalar dependências do backend

## ▶️ Executar

Abra **2 terminais**:

**Terminal 1 (Frontend):**
```bash
npm run dev
```
- [ ] Frontend rodando em http://localhost:5173

**Terminal 2 (Backend):**
```bash
cd server
npm run dev
```
- [ ] Backend rodando em http://localhost:3001
- [ ] Testar: http://localhost:3001/health deve retornar `{"status":"ok"}`

## 🧪 Testar

- [ ] Acessar http://localhost:5173/precos
- [ ] Clicar em "Começar agora" no plano Inicial
- [ ] Deve redirecionar para checkout do Stripe
- [ ] Usar cartão de teste: `4242 4242 4242 4242`
- [ ] Completar pagamento
- [ ] Deve redirecionar para página de sucesso

## 🔔 Webhook (Opcional para desenvolvimento)

- [ ] Instalar Stripe CLI
- [ ] Executar `stripe login`
- [ ] Executar `stripe listen --forward-to localhost:3001/webhook`
- [ ] Copiar webhook secret e adicionar ao `.env` como `STRIPE_WEBHOOK_SECRET`

## 🚀 Produção (Quando estiver pronto)

- [ ] Desativar Test Mode no Stripe
- [ ] Criar produtos novamente no modo LIVE
- [ ] Atualizar `.env` com chaves LIVE (`pk_live_...` e `sk_live_...`)
- [ ] Fazer deploy do backend (Railway, Vercel, etc.)
- [ ] Atualizar `VITE_APP_URL` com URL de produção
- [ ] Configurar webhook no Stripe Dashboard apontando para seu backend
- [ ] Testar pagamento real

---

## 🆘 Problemas Comuns

### ❌ Erro: "Stripe client not initialized"
**Solução:** Verifique se `VITE_STRIPE_PUBLISHABLE_KEY` está no `.env`

### ❌ Erro: "Price ID not configured"
**Solução:** Atualize os Price IDs em `src/lib/stripe.ts`

### ❌ Backend não responde
**Solução:** Certifique-se de que está rodando `npm run dev` dentro da pasta `server/`

### ❌ CORS error
**Solução:** Verifique se o backend está configurado para aceitar requisições de `http://localhost:5173`

---

## 📞 Precisa de Ajuda?

Consulte o arquivo `STRIPE_SETUP.md` para instruções detalhadas.
