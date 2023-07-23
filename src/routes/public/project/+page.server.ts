import { error, redirect } from '@sveltejs/kit';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import type { PageServerLoad } from './$types';

export const load = (async ({ url, cookies }) => {
	const signature = url.searchParams.get('signature');

	if (signature) {
		console.log(`Found a signature in the URL: ${signature}`);

		cookies.set('signature', signature, {
			httpOnly: true,
			secure: true
		});

		throw redirect(303, url.pathname);
	}

	const token = cookies.get('signature');

	try {
		const payload = verify(token ?? '', 'testymctestface');

		return {
			token,
			payload
		};
	} catch (err) {
		if (err instanceof JsonWebTokenError) {
			throw error(400, 'Signature verification error. Is the signature invalid?');
		}
	}

	return {
		token
	};
}) satisfies PageServerLoad;
