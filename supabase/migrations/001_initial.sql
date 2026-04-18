-- Users profile (extends Supabase auth.users)
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text not null,
  phone text,
  role text not null check (role in ('buyer', 'traveler', 'both')),
  avatar_url text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view all profiles" on public.profiles
  for select using (true);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Requests (posted by buyers)
create table public.requests (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  item_name text not null,
  description text,
  item_url text,
  quantity int not null default 1,
  price_usd numeric(10,2) not null,
  from_country text not null default 'United States',
  to_country text not null default 'India',
  traveler_fee int not null default 500,
  deadline date not null,
  status text not null default 'open' check (status in ('open', 'matched', 'purchased', 'in_transit', 'delivered', 'cancelled')),
  created_at timestamptz default now()
);

alter table public.requests enable row level security;

create policy "Anyone can view open requests" on public.requests
  for select using (true);

create policy "Buyers can create requests" on public.requests
  for insert with check (auth.uid() = buyer_id);

create policy "Buyers can update own requests" on public.requests
  for update using (auth.uid() = buyer_id);

-- Orders (traveler accepts a request)
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  request_id uuid references public.requests(id) on delete cascade not null unique,
  traveler_id uuid references public.profiles(id) on delete cascade not null,
  status text not null default 'accepted' check (status in ('accepted', 'purchased', 'in_transit', 'delivered', 'completed', 'cancelled')),
  razorpay_order_id text,
  razorpay_payment_id text,
  payment_status text not null default 'pending' check (payment_status in ('pending', 'paid', 'released', 'refunded')),
  tracking_info text,
  delivery_photo_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "Buyer and traveler can view their orders" on public.orders
  for select using (
    auth.uid() = traveler_id or
    auth.uid() = (select buyer_id from public.requests where id = request_id)
  );

create policy "Travelers can create orders" on public.orders
  for insert with check (auth.uid() = traveler_id);

create policy "Travelers can update their orders" on public.orders
  for update using (auth.uid() = traveler_id);

-- Function to auto-update orders.updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger orders_updated_at
  before update on public.orders
  for each row execute procedure public.handle_updated_at();
