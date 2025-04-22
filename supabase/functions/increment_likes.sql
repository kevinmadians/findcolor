
create or replace function increment_likes(palette_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update palettes
  set likes = likes + 1
  where id = palette_id;
end;
$$;

create or replace function decrement_likes(palette_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update palettes
  set likes = greatest(0, likes - 1)
  where id = palette_id;
end;
$$;
