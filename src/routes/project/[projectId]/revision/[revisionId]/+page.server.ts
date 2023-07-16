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

	const { data: profile } = await supabase
		.from('profiles')
		.select(`organization`)
		.eq('id', session?.user.id)
		.single();

	const { data: files } = await supabase.storage
		.from('files')
		.list(`${profile?.organization}/${project.id}/${revision.id}`);

	return { session, project, revision, profile, files };
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
	},
	delete: async ({ params: { projectId, revisionId }, locals: { supabase } }) => {
		const { error } = await supabase.from('revisions').delete().eq('id', revisionId);

		if (error) {
			return fail(500, {
				error
			});
		}

		throw redirect(303, `/project/${projectId}`);
	}
} satisfies Actions;
