import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({
	params: { projectId, revisionId },
	locals: { supabase, getSession }
}) => {
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

	const { data: revision } = await supabase
		.from('revisions')
		.select(`id, code`)
		.eq('id', revisionId)
		.single();

	if (!revision) {
		throw error(404, 'Revision not found');
	}

	return { session, project, revision };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ params: { revisionId }, request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const code = formData.get('code') as string;

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { error } = await supabase
			.from('revisions')
			.update({
				code
			})
			.eq('id', revisionId);

		if (error) {
			return fail(500, {
				code,
				error
			});
		}
	}
} satisfies Actions;
