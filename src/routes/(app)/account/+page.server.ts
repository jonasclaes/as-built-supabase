import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`username, full_name, website, organization`)
		.eq('id', session.user.id)
		.single();

	const { data: organization } = await supabase
		.from('organizations')
		.select(`name`)
		.eq('id', profile?.organization)
		.single();

	return { session, profile, organization };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string;
		const username = formData.get('username') as string;
		const website = formData.get('website') as string;

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { error } = await supabase.from('profiles').upsert({
			id: session?.user.id,
			full_name: fullName,
			username,
			website,
			updated_at: new Date().toISOString()
		});

		if (error) {
			return fail(500, {
				fullName,
				username,
				website
			});
		}

		return {
			fullName,
			username,
			website
		};
	},
	signout: async ({ locals: { supabase } }) => {
		await supabase.auth.signOut();
		throw redirect(303, '/');
	}
} satisfies Actions;
