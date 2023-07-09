import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: project } = await supabase
		.from('projects')
		.select(`id, code, name`)
		.eq('id', params.id)
		.single();

	return { session, project };
}) satisfies PageServerLoad;

export const actions = {
	delete: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		const { error } = await supabase.from('projects').delete().eq('id', id);

		if (error) {
			return fail(500, {
				id,
				error
			});
		}

		throw redirect(303, `/`);
	}
} satisfies Actions;
