-- =============================================================
-- What to eat now? — Supabase PostgreSQL Schema
-- Includes RLS policies & pgvector-ready design
-- =============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- Reserve for future LLM vector semantic search
-- CREATE EXTENSION IF NOT EXISTS "vector";

-- =============================================================
-- 1. USERS TABLE
-- =============================================================
CREATE TABLE public.users (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email       TEXT NOT NULL UNIQUE,
  display_name TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_users_updated
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS: users can only read/update their own row
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- =============================================================
-- 2. ROULETTE CONFIGS TABLE
--    Stores named wheel presets (e.g. "Office Lunch", "Late Night")
-- =============================================================
CREATE TABLE public.roulette_configs (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  description TEXT,
  filters     JSONB NOT NULL DEFAULT '{}'::jsonb,
  -- filters schema: { radius_m, categories[], price_levels[], min_rating, open_now }
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_roulette_configs_user ON public.roulette_configs(user_id);

CREATE TRIGGER on_roulette_configs_updated
  BEFORE UPDATE ON public.roulette_configs
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- RLS: users own their configs
ALTER TABLE public.roulette_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own configs"
  ON public.roulette_configs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own configs"
  ON public.roulette_configs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own configs"
  ON public.roulette_configs FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own configs"
  ON public.roulette_configs FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================
-- 3. HISTORY LOGS TABLE
--    Records every spin result for the user
-- =============================================================
CREATE TABLE public.history_logs (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  restaurant_name     TEXT NOT NULL,
  restaurant_place_id TEXT,  -- external place_id (Google/Yelp) — NOT the raw data
  latitude            DOUBLE PRECISION NOT NULL,
  longitude           DOUBLE PRECISION NOT NULL,
  category            TEXT,
  rating              NUMERIC(2,1),
  chosen_at           TIMESTAMPTZ NOT NULL DEFAULT now(),
  config_id           UUID REFERENCES public.roulette_configs(id) ON DELETE SET NULL
  -- Future: embedding VECTOR(1536) for semantic search over history
);

CREATE INDEX idx_history_logs_user     ON public.history_logs(user_id);
CREATE INDEX idx_history_logs_chosen   ON public.history_logs(chosen_at DESC);
CREATE INDEX idx_history_logs_config   ON public.history_logs(config_id);

-- RLS: users own their history
ALTER TABLE public.history_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own history"
  ON public.history_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own history"
  ON public.history_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own history"
  ON public.history_logs FOR DELETE
  USING (auth.uid() = user_id);

-- =============================================================
-- 4. AUTO-CREATE USER PROFILE ON AUTH SIGN-UP
-- =============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email)
  VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
