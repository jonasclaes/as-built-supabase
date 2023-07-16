import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

type Project = {
	id?: string;
	code?: string;
	name?: string;
	client?: {
		name?: string;
	};
};

const projectsPerPage = 5;
const clientsPerPage = 5;

export const load = (async ({ url, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const projectIndex = parseInt(url.searchParams.get('projectIndex') ?? '1');
	const clientIndex = parseInt(url.searchParams.get('clientIndex') ?? '1');

	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, full_name, website, organization`)
		.eq('id', session.user.id)
		.single();

	const { data: projects, count: totalProjects } = await supabase
		.from('projects')
		.select(`id, code, name, client ( name )`, { count: 'exact' })
		.order(`code`)
		.range((projectIndex - 1) * projectsPerPage, projectIndex * projectsPerPage - 1)
		.eq('organization', profile?.organization)
		.returns<Project[]>();

	const { data: clients, count: totalClients } = await supabase
		.from('clients')
		.select(`id, code, name`, { count: 'exact' })
		.order(`code`)
		.range((clientIndex - 1) * clientsPerPage, clientIndex * clientsPerPage - 1)
		.eq('organization', profile?.organization);

	return {
		session,
		projects: projects ?? [],
		totalProjects: totalProjects ?? 0,
		projectIndex,
		projectsPerPage,
		clients: clients ?? [],
		totalClients: totalClients ?? 0,
		clientIndex,
		clientsPerPage
	};
}) satisfies PageServerLoad;
