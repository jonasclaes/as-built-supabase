import { SIGNED_URL_JWT_SECRET } from '$env/static/private';
import { error, redirect } from '@sveltejs/kit';
import * as jose from 'jose';
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

	try {
		const { payload } = await jose.jwtVerify(
			token,
			new TextEncoder().encode(SIGNED_URL_JWT_SECRET)
		);

		return {
			token,
			payload
		};
	} catch (err) {
		if (err instanceof Error && 'code' in err && err.code == 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED') {
			throw error(400, 'Signature verification error. Is the signature invalid?');
		}
	}

}) satisfies PageServerLoad;
