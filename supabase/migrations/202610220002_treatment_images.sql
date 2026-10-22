begin;
alter table public.treatments add column detail_image_id uuid references public.media_assets(id) on delete restrict;
alter table public.treatments add column second_detail_image_id uuid references public.media_assets(id) on delete restrict;
create or replace function public.media_is_public(asset uuid) returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.treatments where (image_id = asset or detail_image_id = asset or second_detail_image_id = asset) and status = 'published')
    or exists(select 1 from public.gallery_results where (before_id = asset or after_id = asset) and status = 'published' and authorized)
    or exists(select 1 from public.home_content where image_id = asset and status = 'published')
    or exists(select 1 from public.site_settings where image_id = asset and status = 'published');
$$;
commit;
