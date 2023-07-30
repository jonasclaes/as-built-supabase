import { SIGNED_URL_JWT_SECRET, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { PublicProjectJWTPayload } from '$lib/jwt/PublicProjectJWTPayload';
import { createClient } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';
import * as jose from 'jose';
import type { Database } from '../../../SupabaseDatabaseDefinitions';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, cookies }) => {
	const signature = url.searchParams.get('signature');

	if (signature) {
		cookies.set('signature', signature, {
			httpOnly: true,
			secure: true
		});

		throw redirect(303, url.pathname);
	}

	const token = cookies.get('signature');

	if (!token) {
		throw error(400, 'Signature missing from cookie storage. Did you open a valid link?');
	}

	const payload: PublicProjectJWTPayload | undefined = await decryptJwtToken(token);

	if (!payload) {
		throw error(400, 'Signature error. Is the signature invalid?');
	}

	const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			persistSession: false
		}
	});

	const { data: public_token } = await supabase
		.from('public_tokens')
		.select(`id, is_revoked, organizations ( name ), projects ( name )`)
		.eq('id', payload.sub)
		.eq('organization', payload.organization)
		.eq('project', payload.project)
		.single();

	if (!public_token) {
		throw error(404, 'This token could not be found.');
	}

	if (public_token.is_revoked) {
		throw error(401, 'This token has been revoked.');
	}

	return {
		token,
		payload,
		public_token
	};
}) satisfies PageServerLoad;

const decryptJwtToken = async (token: string) => {
	try {
		const { payload } = await jose.jwtVerify(
			token,
			new TextEncoder().encode(SIGNED_URL_JWT_SECRET)
		);

		return payload;
	} catch (err) {
		if (
			err instanceof Error &&
			'code' in err &&
			err.code == 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED'
		) {
			throw error(400, 'Signature verification error. Is the signature invalid?');
		}
	}
};
