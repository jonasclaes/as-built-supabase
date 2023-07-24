create table "public"."clients" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "organization" uuid not null,
    "code" text not null
);


alter table "public"."clients" enable row level security;

create table "public"."organizations" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "name" text
);


alter table "public"."organizations" enable row level security;

create table "public"."profiles" (
    "id" uuid not null,
    "updated_at" timestamp with time zone,
    "username" text,
    "full_name" text,
    "website" text,
    "organization" uuid
);


alter table "public"."profiles" enable row level security;

create table "public"."projects" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "code" text not null,
    "name" text not null,
    "organization" uuid not null,
    "client" uuid
);


alter table "public"."projects" enable row level security;

create table "public"."revisions" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "code" text not null,
    "project" uuid not null
);


alter table "public"."revisions" enable row level security;

CREATE UNIQUE INDEX clients_pkey ON public.clients USING btree (id);

CREATE UNIQUE INDEX organizations_pkey ON public.organizations USING btree (id);

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

CREATE UNIQUE INDEX projects_pkey ON public.projects USING btree (id);

CREATE UNIQUE INDEX revisions_pkey ON public.revisions USING btree (id);

alter table "public"."clients" add constraint "clients_pkey" PRIMARY KEY using index "clients_pkey";

alter table "public"."organizations" add constraint "organizations_pkey" PRIMARY KEY using index "organizations_pkey";

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."projects" add constraint "projects_pkey" PRIMARY KEY using index "projects_pkey";

alter table "public"."revisions" add constraint "revisions_pkey" PRIMARY KEY using index "revisions_pkey";

alter table "public"."clients" add constraint "clients_organization_fkey" FOREIGN KEY (organization) REFERENCES organizations(id) not valid;

alter table "public"."clients" validate constraint "clients_organization_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_organization_fkey" FOREIGN KEY (organization) REFERENCES organizations(id) not valid;

alter table "public"."profiles" validate constraint "profiles_organization_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."projects" add constraint "projects_client_fkey" FOREIGN KEY (client) REFERENCES clients(id) not valid;

alter table "public"."projects" validate constraint "projects_client_fkey";

alter table "public"."projects" add constraint "projects_organization_fkey" FOREIGN KEY (organization) REFERENCES organizations(id) not valid;

alter table "public"."projects" validate constraint "projects_organization_fkey";

alter table "public"."revisions" add constraint "revisions_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) not valid;

alter table "public"."revisions" validate constraint "revisions_project_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$function$
;

create policy "All access for organization user"
on "public"."clients"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.organization = clients.organization)))));


create policy "Enable read access for authenticated users in organization"
on "public"."organizations"
as permissive
for select
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.organization = organizations.id)))));


create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((auth.uid() = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((auth.uid() = id));


create policy "All access for organization user"
on "public"."projects"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.organization = projects.organization)))))
with check (true);


create policy "All access for organization user"
on "public"."revisions"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.organization = ( SELECT projects.organization
           FROM projects
          WHERE (projects.id = revisions.project)))))));




