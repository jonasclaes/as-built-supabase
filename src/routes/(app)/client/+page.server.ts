import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	return {};
}) satisfies PageServerLoad;

export const actions = {
	create: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const code = formData.get('code') as string;
		const name = formData.get('name') as string;

		const session = await getSession();

		const { data: profile } = await supabase
			.from('profiles')
			.select(`organization`)
			.eq('id', session?.user.id)
			.single();

		const { error, data: client } = await supabase
			.from('clients')
			.insert({
				code,
				name,
				organization: profile?.organization
			})
			.select(`id`)
			.single();

		if (error) {
			return fail(500, {
				code,
				name,
				error
			});
		}

		if (!client) {
			return fail(500, {
				code,
				name,
				error: new Error('Unknown error')
			});
		}

		throw redirect(303, `/client/${client.id}`);
	}
} satisfies Actions;
