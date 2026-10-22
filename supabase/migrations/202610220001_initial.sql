begin;
create table public.user_roles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('editor','admin'))
);
alter table public.user_roles enable row level security;
create policy own_role on public.user_roles for select to authenticated using (user_id = (select auth.uid()));
revoke all on public.user_roles from anon, authenticated;
grant select on public.user_roles to authenticated;

create function public.is_editor() returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.user_roles where user_id = (select auth.uid()) and role in ('editor','admin'));
$$;
revoke all on function public.is_editor() from public;
grant execute on function public.is_editor() to anon, authenticated;

create table public.media_assets (
  id uuid primary key default gen_random_uuid(), path text not null unique,
  alt text not null default '', created_at timestamptz not null default now(),
  check (path = id::text || '.webp')
);
create table public.treatment_categories (
  id uuid primary key default gen_random_uuid(), title text unique not null,
  sort_order integer not null default 0
);
insert into public.treatment_categories(title, sort_order) values ('Micropigmentación',0),('Estética de la mirada',1);

create table public.treatments (
  id uuid primary key default gen_random_uuid(),
  title text not null check (length(title) between 1 and 180),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  category text not null references public.treatment_categories(title),
  summary text not null default '', description text not null default '',
  image_id uuid references public.media_assets(id) on delete restrict,
  session_duration text not null default '', result_duration text not null default '',
  before_care text not null default '', after_care text not null default '', touch_up text not null default '',
  seo_title text not null default '', seo_description text not null default '', featured boolean not null default false,
  status text not null default 'draft' check(status in ('draft','published')),
  sort_order integer not null default 0 check(sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.gallery_results (
  id uuid primary key default gen_random_uuid(), title text not null check(length(title) between 1 and 180),
  treatment_id uuid not null references public.treatments(id) on delete restrict,
  before_id uuid references public.media_assets(id) on delete restrict,
  after_id uuid references public.media_assets(id) on delete restrict,
  description text not null default '', authorized boolean not null default false, featured boolean not null default false,
  status text not null default 'draft' check(status in ('draft','published')),
  sort_order integer not null default 0 check(sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check(status <> 'published' or (authorized and before_id is not null and after_id is not null))
);
create table public.testimonials (
  id uuid primary key default gen_random_uuid(), title text not null check(length(title) between 1 and 180),
  author text not null check(length(author) between 1 and 120), description text not null,
  treatment_id uuid references public.treatments(id) on delete restrict,
  date date, authorized boolean not null default false,
  status text not null default 'draft' check(status in ('draft','published')),
  sort_order integer not null default 0 check(sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check(status <> 'published' or authorized)
);
create table public.faqs (
  id uuid primary key default gen_random_uuid(), title text not null check(length(title) between 1 and 180),
  answer text not null, treatment_id uuid references public.treatments(id) on delete restrict,
  status text not null default 'draft' check(status in ('draft','published')),
  sort_order integer not null default 0 check(sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.home_content (
  id uuid primary key default gen_random_uuid(), singleton boolean not null default true unique check(singleton),
  title text not null, subtitle text not null default '', introduction text not null default '', cta text not null default 'Hablemos por WhatsApp',
  image_id uuid references public.media_assets(id) on delete restrict,
  instagram_posts text not null default '',
  status text not null default 'draft' check(status in ('draft','published')),
  sort_order integer not null default 0 check(sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.site_settings (
  id uuid primary key default gen_random_uuid(), singleton boolean not null default true unique check(singleton),
  title text not null default 'Alexandra Sánchez', phone text not null default '626836018' check(phone ~ '^[0-9]{9,15}$'),
  whatsapp text not null default '34626836018' check(whatsapp ~ '^[0-9]{10,15}$'),
  instagram text not null default 'https://www.instagram.com/micro.alexandrasanchez/', facebook text not null default '',
  address text not null default '', hours text not null default '', biography text not null default '',
  image_id uuid references public.media_assets(id) on delete restrict,
  status text not null default 'draft' check(status in ('draft','published')),
  sort_order integer not null default 0 check(sort_order >= 0),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now(),
  check(instagram = '' or instagram ~ '^https://(www\.)?instagram\.com/'),
  check(facebook = '' or facebook ~ '^https://(www\.)?facebook\.com/')
);

create function public.touch_updated_at() returns trigger language plpgsql set search_path = '' as $$ begin new.updated_at = now(); return new; end $$;
do $$ declare t text; begin
  foreach t in array array['treatments','gallery_results','testimonials','faqs','home_content','site_settings'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy published_read on public.%I for select to anon, authenticated using (status = ''published'')', t);
    execute format('create policy editor_manage on public.%I for all to authenticated using ((select public.is_editor())) with check ((select public.is_editor()))', t);
    execute format('grant select on public.%I to anon', t);
    execute format('grant select, insert, update, delete on public.%I to authenticated', t);
    execute format('create trigger touch_updated before update on public.%I for each row execute function public.touch_updated_at()', t);
    execute format('create index on public.%I(status, sort_order, id)', t);
  end loop;
end $$;
create index on public.gallery_results(treatment_id);
create index on public.faqs(treatment_id);
create index on public.testimonials(treatment_id);
alter table public.treatment_categories enable row level security;
create policy category_read on public.treatment_categories for select to anon, authenticated using(true);
grant select on public.treatment_categories to anon, authenticated;
revoke insert, update, delete on public.treatment_categories from anon, authenticated;

-- This function only answers whether an asset belongs to published content.
create function public.media_is_public(asset uuid) returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.treatments where image_id = asset and status = 'published')
    or exists(select 1 from public.gallery_results where (before_id = asset or after_id = asset) and status = 'published' and authorized)
    or exists(select 1 from public.home_content where image_id = asset and status = 'published')
    or exists(select 1 from public.site_settings where image_id = asset and status = 'published');
$$;
revoke all on function public.media_is_public(uuid) from public;
grant execute on function public.media_is_public(uuid) to anon, authenticated;
alter table public.media_assets enable row level security;
create policy media_published on public.media_assets for select to anon, authenticated using(public.media_is_public(id));
create policy media_editor on public.media_assets for all to authenticated using((select public.is_editor())) with check((select public.is_editor()));
grant select on public.media_assets to anon;
grant select, insert, update, delete on public.media_assets to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('media','media',false,10485760,array['image/webp']);
create policy media_storage_read on storage.objects for select to anon, authenticated using(
  bucket_id = 'media' and ((select public.is_editor()) or exists(select 1 from public.media_assets where path = name and public.media_is_public(id)))
);
create policy media_storage_insert on storage.objects for insert to authenticated with check(bucket_id = 'media' and (select public.is_editor()) and name ~ '^[0-9a-f-]{36}\.webp$');
create policy media_storage_delete on storage.objects for delete to authenticated using(bucket_id = 'media' and (select public.is_editor()) and not exists(select 1 from public.media_assets where path = name));
commit;
