
create table if not exists courses (
  id          uuid          primary key default gen_random_uuid(),
  title       text          not null,
  progress    integer       not null default 0 check (progress between 0 and 100),
  icon_name   text          not null default 'BookOpen',
  created_at  timestamptz   not null default now()
);

alter table courses enable row level security;

create policy "Allow public read"
  on courses for select
  using (true);

insert into courses (title, progress, icon_name) values
  ('Advanced React Patterns',        75, 'Layers'),
  ('Next.js App Router Deep Dive',   42, 'Zap'),
  ('TypeScript Mastery',             88, 'Code2'),
  ('System Design Fundamentals',     31, 'Network');
