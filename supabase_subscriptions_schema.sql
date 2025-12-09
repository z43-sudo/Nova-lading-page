-- ============================================
-- TABELA DE ASSINATURAS STRIPE
-- ============================================
-- Execute este SQL no Supabase SQL Editor para criar a estrutura de assinaturas

-- Tabela de assinaturas
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Dados do Stripe
  stripe_customer_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  stripe_price_id TEXT,
  
  -- Informações da assinatura
  plan_name TEXT NOT NULL,
  status TEXT NOT NULL, -- active, canceled, past_due, etc.
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_customer_id ON subscriptions(stripe_customer_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_subscription_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilita RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Política: Usuários podem ver apenas suas próprias assinaturas
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Política: Apenas o sistema pode inserir assinaturas (via service role)
CREATE POLICY "Service role can insert subscriptions"
  ON subscriptions
  FOR INSERT
  WITH CHECK (true);

-- Política: Apenas o sistema pode atualizar assinaturas (via service role)
CREATE POLICY "Service role can update subscriptions"
  ON subscriptions
  FOR UPDATE
  USING (true);

-- ============================================
-- TABELA DE PAGAMENTOS (OPCIONAL)
-- ============================================

CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID REFERENCES subscriptions(id) ON DELETE CASCADE,
  
  -- Dados do Stripe
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_invoice_id TEXT,
  
  -- Informações do pagamento
  amount INTEGER NOT NULL, -- em centavos
  currency TEXT NOT NULL DEFAULT 'brl',
  status TEXT NOT NULL, -- succeeded, failed, pending, etc.
  
  -- Metadados
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_payments_subscription_id ON payments(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payments_stripe_payment_intent_id ON payments(stripe_payment_intent_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);

-- RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own payments"
  ON payments
  FOR SELECT
  USING (
    subscription_id IN (
      SELECT id FROM subscriptions WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Service role can insert payments"
  ON payments
  FOR INSERT
  WITH CHECK (true);

-- ============================================
-- FUNÇÕES ÚTEIS
-- ============================================

-- Função para verificar se um usuário tem assinatura ativa
CREATE OR REPLACE FUNCTION has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM subscriptions 
    WHERE user_id = user_uuid 
      AND status = 'active'
      AND current_period_end > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Função para obter a assinatura ativa de um usuário
CREATE OR REPLACE FUNCTION get_active_subscription(user_uuid UUID)
RETURNS TABLE (
  id UUID,
  plan_name TEXT,
  status TEXT,
  current_period_end TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.plan_name,
    s.status,
    s.current_period_end
  FROM subscriptions s
  WHERE s.user_id = user_uuid
    AND s.status = 'active'
    AND s.current_period_end > NOW()
  ORDER BY s.created_at DESC
  LIMIT 1;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View para dashboard de assinaturas
CREATE OR REPLACE VIEW subscription_overview AS
SELECT 
  s.id,
  s.user_id,
  u.email,
  s.plan_name,
  s.status,
  s.current_period_start,
  s.current_period_end,
  s.cancel_at_period_end,
  s.created_at,
  CASE 
    WHEN s.current_period_end > NOW() THEN TRUE
    ELSE FALSE
  END AS is_active
FROM subscriptions s
LEFT JOIN auth.users u ON s.user_id = u.id;

-- ============================================
-- DADOS DE EXEMPLO (OPCIONAL - APENAS PARA TESTE)
-- ============================================

-- Descomente para inserir dados de teste
/*
INSERT INTO subscriptions (
  user_id,
  stripe_customer_id,
  stripe_subscription_id,
  stripe_price_id,
  plan_name,
  status,
  current_period_start,
  current_period_end
) VALUES (
  auth.uid(), -- Substitua pelo ID do usuário de teste
  'cus_test123',
  'sub_test123',
  'price_test123',
  'Profissional',
  'active',
  NOW(),
  NOW() + INTERVAL '6 months'
);
*/
