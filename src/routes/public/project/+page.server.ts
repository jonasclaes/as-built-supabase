import { SIGNED_URL_JWT_SECRET, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
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

	const payload = await decryptJwtToken(token);

	if (!payload) {
		throw error(400, 'Signature error. Is the signature invalid?');
	}

	const supabase = createClient<Database>(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
		auth: {
			persistSession: false
		}
	});

	const { data: organization } = await supabase
		.from('organizations')
		.select(`id, name`)
		.eq('id', payload.organization)
		.single();

	if (!organization) {
		throw error(404, 'Organization that owns this token could not be found.');
	}

	const { data: project } = await supabase
		.from('projects')
		.select(`id, name`)
		.eq('id', payload.project)
		.single();

	if (!project) {
		throw error(404, 'Project that owns this token could not be found.');
	}

	return {
		token,
		payload,
		organization,
		project
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
