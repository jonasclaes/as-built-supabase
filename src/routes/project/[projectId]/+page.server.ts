import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params: { projectId }, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: project } = await supabase
		.from('projects')
		.select(`id, code, name, client`)
		.eq('id', projectId)
		.single();

	if (!project) {
		throw error(404, 'Project not found');
	}

	const { data: client } = await supabase
		.from('clients')
		.select(`name`)
		.eq('id', project.client)
		.single();

	const { data: clients } = await supabase.from('clients').select(`id, code, name`).order('name');

	const { data: revisions } = await supabase
		.from('revisions')
		.select(`id, created_at, code`)
		.order('created_at', { ascending: false })
		.eq('project', projectId);

	return { session, project, client, clients: clients ?? [], revisions: revisions ?? [] };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ params, request, locals: { supabase, getSession } }) => {
		const projectId = params.projectId as string;
		const formData = await request.formData();
		const code = formData.get('code') as string;
		const name = formData.get('name') as string;
		const clientName = formData.get('clientName') as string;

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { data: client } = await supabase
			.from('clients')
			.select(`id`)
			.eq('name', clientName)
			.single();

		const { error } = await supabase
			.from('projects')
			.update({
				code,
				name,
				client: client?.id ?? null
			})
			.eq('id', projectId);

		if (error) {
			return fail(500, {
				code,
				name,
				clientName,
				error
			});
		}
	},
	delete: async ({ params: { projectId }, locals: { supabase } }) => {
		const { error } = await supabase.from('projects').delete().eq('id', projectId);

		if (error) {
			return fail(500, {
				error
			});
		}

		throw redirect(303, `/`);
	}
} satisfies Actions;
