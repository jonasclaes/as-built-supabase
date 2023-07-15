import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: project } = await supabase
		.from('projects')
		.select(`id, code, name, client`)
		.eq('id', params.projectId)
		.single();

	if (!project) {
		throw error(404, 'Project not found');
	}

	return { session, project };
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ params, request, locals: { supabase, getSession } }) => {
		const projectId = params.projectId as string;
		const formData = await request.formData();
		const code = formData.get('code') as string;

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { error, data: revision } = await supabase
			.from('revisions')
			.insert({
				code,
				project: projectId
			})
			.select(`id`)
			.single();

		if (error) {
			return fail(500, {
				code,
				error
			});
		}

		if (!revision) {
			return fail(500, {
				code,
				error: new Error('Unknown error')
			});
		}

		throw redirect(303, `/project/${projectId}/revision/${revision.id}`);
	}
} satisfies Actions;
