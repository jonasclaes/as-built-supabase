import {
	PLUNK_SECRET_API_KEY,
	SIGNED_URL_JWT_SECRET,
	SUPABASE_SERVICE_ROLE_KEY
} from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { PublicProjectJWTPayload } from '$lib/jwt/PublicProjectJWTPayload';
import Plunk from '@plunk/node';
import { createClient } from '@supabase/supabase-js';
import { error, fail, redirect } from '@sveltejs/kit';
import * as jose from 'jose';
import type { Database } from '../../../../SupabaseDatabaseDefinitions';
import type { Actions, PageServerLoad } from './$types';

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

	const { error: public_token_error, data: public_token } = await supabase
		.from('public_tokens')
		.select(
			`id, is_revoked, organizations ( name ), projects ( code, name, revisions ( id, created_at, code ) )`
		)
		.eq('id', payload.sub)
		.eq('organization', payload.organization)
		.eq('project', payload.project)
		.single();

	if (public_token_error) {
		throw error(500, public_token_error);
	}

	if (!public_token) {
		throw error(404, 'This token could not be found.');
	}

	if (public_token.is_revoked) {
		throw error(401, 'This token has been revoked.');
	}

	if (!public_token.organizations) {
		throw error(404, 'Organization could not be found.');
	}

	if (!public_token.projects) {
		throw error(404, 'Project could not be found.');
	}

	return {
		project: public_token.projects,
		organization: public_token.organizations
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

export const actions = {
	createRevisionProposal: async ({ request }) => {
		const formData = await request.formData();
		const fullName = formData.get('fullName') as string | null;
		const email = formData.get('email') as string | null;
		const title = formData.get('title') as string | null;
		const description = formData.get('description') as string | null;

		if (!fullName) {
			return fail(400, {
				fullName,
				email,
				title,
				description,
				missing: 'fullName'
			});
		}

		if (!email) {
			return fail(400, {
				fullName,
				email,
				title,
				description,
				missing: 'email'
			});
		}

		if (!title) {
			return fail(400, {
				fullName,
				email,
				title,
				description,
				missing: 'title'
			});
		}

		if (!description) {
			return fail(400, {
				fullName,
				email,
				title,
				description,
				missing: 'description'
			});
		}

		const plunk = new Plunk(PLUNK_SECRET_API_KEY);
		await plunk.events.track({
			event: 'new-revision-request-proposal',
			email: 'jonas@jonasclaes.be',
			data: {
				title
			}
		});

		// throw redirect(303, `/public/project/revisionProposal/${0}`);
	}
} satisfies Actions;
