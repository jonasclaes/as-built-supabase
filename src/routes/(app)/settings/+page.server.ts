import { error, fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	if (!session) {
		throw error(401, { message: 'Unauthorized' });
	}

	const { error: profileError, data: profileData } = await supabase
		.from('profiles')
		.select(`id, theme`)
		.eq('id', session.user.id)
		.single();

	if (profileError) {
		throw error(500, { message: 'Internal Server Error' });
	}

	if (!profileData) {
		throw error(404, { message: 'Not Found' });
	}

	return {
		theme: profileData.theme
	};
}) satisfies PageServerLoad;

export const actions = {
	updateTheme: async ({ request, locals: { getSession, supabase } }) => {
		const formData = await request.formData();
		const theme = formData.get('theme') as string;

		const session = await getSession();

		if (!session) {
			return fail(401, { message: 'Unauthorized' });
		}

		const { error, data } = await supabase
			.from('profiles')
			.update({ theme })
			.eq('id', session.user.id)
			.select(`theme`)
			.single();

		if (error) {
			return fail(500, { message: 'Internal Server Error' });
		}

		if (!data) {
			return fail(404, { message: 'Not Found' });
		}

		return {
			theme: data.theme
		};
	}
} satisfies Actions;
