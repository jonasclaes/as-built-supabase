import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: client } = await supabase
		.from('clients')
		.select(`id, code, name`)
		.eq('id', params.id)
		.single();

	if (!client) {
		throw error(404, 'Client not found');
	}

	return { session, client };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ params, request, locals: { supabase, getSession } }) => {
		const id = params.id as string;
		const formData = await request.formData();
		const code = formData.get('code') as string;
		const name = formData.get('name') as string;

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { error } = await supabase
			.from('clients')
			.update({
				code,
				name
			})
			.eq('id', id);

		if (error) {
			return fail(500, {
				code,
				name,
				error
			});
		}
	},
	delete: async ({ params, locals: { supabase } }) => {
		const id = params.id as string;

		const { error } = await supabase.from('clients').delete().eq('id', id);

		if (error) {
			return fail(500, {
				id,
				error
			});
		}

		throw redirect(303, `/`);
	}
} satisfies Actions;
