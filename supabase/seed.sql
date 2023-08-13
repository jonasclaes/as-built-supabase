-- Create a new user
CREATE OR REPLACE FUNCTION public.create_user(email text, password text) RETURNS uuid AS $$
DECLARE user_id uuid;
encrypted_pw text;
BEGIN user_id := gen_random_uuid();
encrypted_pw := crypt(password, gen_salt('bf'));
INSERT INTO auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
VALUES (
    '00000000-0000-0000-0000-000000000000',
    user_id,
    'authenticated',
    'authenticated',
    email,
    encrypted_pw,
    '2023-05-03 19:41:43.585805+00',
    '2023-04-22 13:10:03.275387+00',
    '2023-04-22 13:10:31.458239+00',
    '{"provider":"email","providers":["email"]}',
    '{}',
    '2023-05-03 19:41:43.580424+00',
    '2023-05-03 19:41:43.585948+00',
    '',
    '',
    '',
    ''
  );
INSERT INTO auth.identities (
    id,
    user_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
VALUES (
    gen_random_uuid(),
    user_id,
    format(
      '{"sub":"%s","email":"%s"}',
      user_id::text,
      email
    )::jsonb,
    'email',
    '2023-05-03 19:41:43.582456+00',
    '2023-05-03 19:41:43.582497+00',
    '2023-05-03 19:41:43.582497+00'
  );
RETURN user_id;
END;
$$ LANGUAGE plpgsql;
-- Seed data
DO $$
DECLARE user_id_1 uuid;
DECLARE user_id_2 uuid;
DECLARE organization_id_1 uuid;
DECLARE organization_id_2 uuid;
DECLARE client_id_1 uuid;
DECLARE client_id_2 uuid;
DECLARE project_id_1 uuid;
DECLARE project_id_2 uuid;
BEGIN user_id_1 := public.create_user('test1@example.com', 'password123');
user_id_2 := public.create_user('test2@example.com', 'password123');
organization_id_1 := gen_random_uuid();
organization_id_2 := gen_random_uuid();
client_id_1 := gen_random_uuid();
client_id_2 := gen_random_uuid();
project_id_1 := gen_random_uuid();
project_id_2 := gen_random_uuid();
INSERT INTO "public"."organizations" (id, name)
VALUES (organization_id_1, 'Supabase 1'),
  (organization_id_2, 'Supabase 2');
INSERT INTO "public"."profiles" (id, username, full_name, website, organization)
VALUES (
    user_id_1,
    'test1',
    'Test User 1',
    'https://supabase.io',
    organization_id_1
  ),
  (
    user_id_2,
    'test2',
    'Test User 2',
    'https://supabase.io',
    organization_id_2
  );
INSERT INTO "public"."clients" (id, code, name, organization)
VALUES (
    client_id_1,
    'test1',
    'Test Client 1',
    organization_id_1
  ),
  (
    client_id_2,
    'test2',
    'Test Client 2',
    organization_id_2
  );
INSERT INTO "public"."projects" (id, code, name, organization, client)
VALUES (
    project_id_1,
    'test1',
    'Test Project 1',
    organization_id_1,
    client_id_1
  ),
  (
    project_id_2,
    'test2',
    'Test Project 2',
    organization_id_2,
    client_id_2
  );
END $$;