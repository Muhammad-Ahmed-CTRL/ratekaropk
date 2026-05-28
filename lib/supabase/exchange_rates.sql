create table if not exists public.exchange_rates (
  id bigserial primary key,
  base_currency text not null default 'USD',
  quote_currency text not null default 'PKR',
  rate numeric(18, 6) not null check (rate > 0),
  source text not null,
  provider_updated_at timestamptz,
  fetched_at timestamptz not null default now(),
  raw jsonb,
  created_at timestamptz not null default now()
);

create index if not exists exchange_rates_latest_idx
on public.exchange_rates (base_currency, quote_currency, fetched_at desc);

alter table public.exchange_rates enable row level security;

drop policy if exists "Public can read exchange rates" on public.exchange_rates;

create policy "Public can read exchange rates"
on public.exchange_rates
for select
to anon, authenticated
using (true);

-- Do not create public insert, update, or delete policies.
-- Writes are performed only by the protected server cron route using the service role key.
