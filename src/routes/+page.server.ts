import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const projectsPerPage = 5;
const clientsPerPage = 5;

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/auth/signIn');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, full_name, website, organization`)
		.eq('id', session.user.id)
		.single();

	const { data: projects, count: totalProjects } = await supabase
		.from('projects')
		.select(`id, code, name, clients ( name )`, { count: 'exact' })
		.order(`code`)
		.eq('organization', profile?.organization);

	const { data: clients, count: totalClients } = await supabase
		.from('clients')
		.select(`id, code, name`, { count: 'exact' })
		.order(`code`)
		.eq('organization', profile?.organization);

	return {
		session,
		projects: projects ?? [],
		totalProjects: totalProjects ?? 0,
		projectsPerPage,
		clients: clients ?? [],
		totalClients: totalClients ?? 0,
		clientsPerPage
	};
}) satisfies PageServerLoad;
