alter table "public"."revision_request_proposals" add column "external_email" text not null;

alter table "public"."revision_request_proposals" add column "external_full_name" text;

alter table "public"."revision_request_proposals" add column "project" uuid not null;

alter table "public"."revision_request_proposals" add constraint "revision_request_proposals_project_fkey" FOREIGN KEY (project) REFERENCES projects(id) not valid;

alter table "public"."revision_request_proposals" validate constraint "revision_request_proposals_project_fkey";
