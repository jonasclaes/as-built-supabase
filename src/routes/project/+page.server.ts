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

	const { data: projects } = await supabase
		.from('projects')
		.select(`id, code, name`)
		.eq('organization', profile?.organization);

	return { session, projects };
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

		const { error, data: project } = await supabase
			.from('projects')
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

		if (!project) {
			return fail(500, {
				code,
				name,
				error: new Error('Unknown error')
			});
		}

		throw redirect(303, `/project/${project.id}`);
	}
} satisfies Actions;
