import { SIGNED_URL_JWT_SECRET, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import type { PublicProjectJWTPayload } from '$lib/jwt/PublicProjectJWTPayload';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import * as jose from 'jose';

export const supabase: Handle = async ({ event, resolve }) => {
	event.locals.supabase = createSupabaseServerClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event
	});

	/**
	 * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
	 */
	event.locals.getSession = async () => {
		const {
			data: { session }
		} = await event.locals.supabase.auth.getSession();
		return session;
	};

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range';
		}
	});
};

export const publicProjectAuth: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith('/public/project')) {
		const signature = event.url.searchParams.get('signature');

		if (signature) {
			event.cookies.set('public:project-jwt', signature, {
				httpOnly: true,
				secure: true
			});

			throw redirect(303, event.url.pathname);
		}

		const jwt = event.cookies.get('public:project-jwt');

		if (!jwt) {
			throw error(401, 'Unauthorized');
		}

		const payload: PublicProjectJWTPayload | undefined = await decryptJwtToken(jwt);

		if (!payload) {
			throw error(401, 'Unauthorized');
		}

		event.locals.supabaseAdmin = createSupabaseServerClient({
			supabaseUrl: PUBLIC_SUPABASE_URL,
			supabaseKey: SUPABASE_SERVICE_ROLE_KEY,
			event
		});

		const { error: publicTokenError, data: publicToken } = await event.locals.supabaseAdmin
			.from('public_tokens')
			.select(`id, is_revoked, organizations ( id ), projects ( id )`)
			.eq('id', payload.sub)
			.eq('organization', payload.organization)
			.eq('project', payload.project)
			.single();

		if (publicTokenError || !publicToken) {
			throw error(401, 'Unauthorized');
		}

		if (publicToken.is_revoked) {
			throw error(401, 'Unauthorized');
		}

		if (!publicToken.organizations || !publicToken.projects) {
			throw error(401, 'Unauthorized');
		}
	}

	return resolve(event);
};

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

export const handle: Handle = sequence(supabase, publicProjectAuth);
