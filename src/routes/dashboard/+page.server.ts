import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, full_name, website, organization`)
		.eq('id', session.user.id)
		.single();

	const { data: projects } = await supabase
		.from('projects')
		.select(`id, code, name, client`)
		.eq('organization', profile?.organization);

	const { data: clients } = await supabase
		.from('clients')
		.select(`id, code, name`)
		.eq('organization', profile?.organization);

	return { session, projects, clients };
}) satisfies PageServerLoad;
