-- Create a table for public profiles
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  avatar_url text,
  phone text,
  address text,
  
  -- Payment and Subscription fields
  payment_status text default 'trialing', -- 'trialing', 'active', 'past_due', 'canceled', 'unpaid'
  subscription_plan text default 'free', -- 'free', 'basic', 'pro', 'enterprise'
  stripe_customer_id text, -- ID do cliente no gateway de pagamento (Stripe, Pagar.me, etc)
  stripe_subscription_id text, -- ID da assinatura no gateway
  trial_ends_at timestamp with time zone default (now() + interval '30 days'), -- 30 dias de teste grátis por padrão
  current_period_end timestamp with time zone,
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create a function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Create a trigger to call the function on new user creation
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create a function to update the 'updated_at' column
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Create a trigger to update 'updated_at' whenever the profile is updated
create trigger update_profiles_updated_at
    before update on public.profiles
    for each row
    execute procedure update_updated_at_column();
