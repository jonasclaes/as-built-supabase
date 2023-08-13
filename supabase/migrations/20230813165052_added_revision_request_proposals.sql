create table "public"."revision_request_proposals" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone default now(),
    "title" text not null,
    "description" text not null
);


alter table "public"."revision_request_proposals" enable row level security;

CREATE UNIQUE INDEX revision_request_proposals_pkey ON public.revision_request_proposals USING btree (id);

alter table "public"."revision_request_proposals" add constraint "revision_request_proposals_pkey" PRIMARY KEY using index "revision_request_proposals_pkey";
