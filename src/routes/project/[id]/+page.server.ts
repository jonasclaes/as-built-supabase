import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: project } = await supabase
		.from('projects')
		.select(`id, code, name, client`)
		.eq('id', params.id)
		.single();

	const { data: client } = await supabase
		.from('clients')
		.select(`name`)
		.eq('id', project?.client)
		.single();

	const { data: clients } = await supabase.from('clients').select(`id, code, name`);

	return { session, project, client, clients };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ params, request, locals: { supabase, getSession } }) => {
		const id = params.id as string;
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
			.eq('id', id);

		if (error) {
			return fail(500, {
				code,
				name,
				clientName,
				error
			});
		}
	},
	delete: async ({ params, locals: { supabase } }) => {
		const id = params.id as string;

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
