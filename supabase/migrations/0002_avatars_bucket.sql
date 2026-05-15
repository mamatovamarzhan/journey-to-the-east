-- ─────────────────────────────────────────────────────────────────────
-- Adds a public "avatars" bucket for profile pictures.
-- Apply the same way as 0001: SQL Editor → paste → Run.
-- ─────────────────────────────────────────────────────────────────────

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

create policy "avatars are publicly readable"
  on storage.objects for select
  using (bucket_id = 'avatars');

create policy "authenticated users can upload avatars"
  on storage.objects for insert
  with check (bucket_id = 'avatars' and auth.role() = 'authenticated');

-- Allow a user to overwrite their own avatar file.
create policy "users can update their own avatar"
  on storage.objects for update
  using (bucket_id = 'avatars' and auth.uid() = owner)
  with check (bucket_id = 'avatars' and auth.uid() = owner);

create policy "users can delete their own avatar"
  on storage.objects for delete
  using (bucket_id = 'avatars' and auth.uid() = owner);
