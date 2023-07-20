import { AuthError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	resetPassword: async ({ request, url, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: `${url.origin}/auth/resetPasswordForm`
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
			message: 'Check your inbox for a password reset link.',
			success: true
		};
	}
} satisfies Actions;
