import { AuthError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	signInWithMagicLink: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${url.origin}/auth/callback`,
				shouldCreateUser: false
			}
		});

		if (error && error instanceof AuthError) {
			return fail(error.status ?? 400, {
				email,
				message: error.message,
				success: false
			});
		}

		if (error) {
			return fail(500, {
				email,
				message: 'Server error. Try again later.',
				success: false
			});
		}

		return {
			email,
			message: 'Check your inbox for a magic link.',
			success: true
		};
	}
} satisfies Actions;
