import { env } from '$env/dynamic/public';
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import type { Database } from '../SupabaseDatabaseDefinitions';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch, data, depends }) => {
	depends('supabase:auth');

	const supabase = createSupabaseLoadClient<Database>({
		supabaseUrl: env.PUBLIC_SUPABASE_URL,
		supabaseKey: env.PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: data.session
	});

	const {
		data: { session }
	} = await supabase.auth.getSession();

	return { supabase, session };
}) satisfies LayoutLoad;
