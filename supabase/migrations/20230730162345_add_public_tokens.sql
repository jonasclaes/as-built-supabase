create table "public"."public_tokens" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "organization" uuid not null,
    "project" uuid not null,
    "is_revoked" boolean not null default false,
    "description" text
);


alter table "public"."public_tokens" enable row level security;

CREATE UNIQUE INDEX public_tokens_pkey ON public.public_tokens USING btree (id);

alter table "public"."public_tokens" add constraint "public_tokens_pkey" PRIMARY KEY using index "public_tokens_pkey";

alter table "public"."public_tokens" add constraint "public_tokens_organization_fkey" FOREIGN KEY (organization) REFERENCES organizations(id) not valid;

alter table "public"."public_tokens" validate constraint "public_tokens_organization_fkey";

alter table "public"."public_tokens" add constraint "public_tokens_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) not valid;

alter table "public"."public_tokens" validate constraint "public_tokens_project_fkey";

create policy "All access for organization user"
on "public"."public_tokens"
as permissive
for all
to public
using ((EXISTS ( SELECT 1
   FROM profiles
  WHERE ((profiles.id = auth.uid()) AND (profiles.organization = public_tokens.organization)))))
with check (true);




