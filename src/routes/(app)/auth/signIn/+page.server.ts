import { AuthError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	signIn: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password
		});

		if (error && error instanceof AuthError) {
			return fail(error.status ?? 400, {
				email,
				message: error.message
			});
		}

		if (error) {
			return fail(500, {
				email,
				message: 'Server error. Try again later.'
			});
		}

		throw redirect(303, '/');
	}
} satisfies Actions;
