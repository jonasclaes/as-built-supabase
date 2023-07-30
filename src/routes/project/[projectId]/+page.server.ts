import { SIGNED_URL_JWT_SECRET } from '$env/static/private';
import type { PublicProjectJWTPayload } from '$lib/jwt/PublicProjectJWTPayload';
import { error, fail, redirect } from '@sveltejs/kit';
import * as jose from 'jose';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params: { projectId }, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: project } = await supabase
		.from('projects')
		.select(
			`id, code, name, clients ( name ), revisions ( id, created_at, code ), public_tokens ( id, created_at, description )`
		)
		.eq('id', projectId)
		.eq('public_tokens.is_revoked', false)
		.order('created_at', { foreignTable: 'public_tokens' })
		.single();

	if (!project) {
		throw error(404, 'Project not found');
	}

	const { data: clients } = await supabase.from('clients').select(`id, code, name`).order('name');

	return { session, project, clients: clients ?? [] };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ params, request, locals: { supabase, getSession } }) => {
		const projectId = params.projectId as string;
		const formData = await request.formData();
		const code = formData.get('code') as string;
		const name = formData.get('name') as string;
		const clientName = formData.get('clientName') as string;

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { data: client } = await supabase
			.from('clients')
			.select(`id`)
			.eq('name', clientName)
			.single();

		const { error } = await supabase
			.from('projects')
			.update({
				code,
				name,
				client: client?.id ?? null
			})
			.eq('id', projectId);

		if (error) {
			return fail(500, {
				code,
				name,
				clientName,
				error
			});
		}
	},
	delete: async ({ params: { projectId }, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { error } = await supabase.from('projects').delete().eq('id', projectId);

		if (error) {
			return fail(500, {
				error
			});
		}

		throw redirect(303, `/`);
	},
	generateSignedLink: async ({
		params: { projectId },
		url,
		request,
		locals: { supabase, getSession }
	}) => {
		const formData = await request.formData();
		let description = formData.get('description') as string | null;

		if (!description || description === '') description = 'Unknown signed link';

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { data: profile } = await supabase
			.from('profiles')
			.select(`organization`)
			.eq('id', session.user.id)
			.single();

		if (!profile) {
			return fail(500, {
				error: new Error('Profile not found.'),
				description
			});
		}

		if (!profile.organization) {
			return fail(500, {
				error: new Error('Profile not connected to an organization.'),
				description
			});
		}

		const { data: public_token, error } = await supabase
			.from(`public_tokens`)
			.insert({
				organization: profile.organization,
				project: projectId,
				description: description
			})
			.select(`id, organization, project`)
			.single();

		if (error) {
			return fail(500, {
				error,
				description
			});
		}

		if (!public_token) {
			return fail(500, {
				error: new Error('Error during creation of public token.'),
				description
			});
		}

		const payload: PublicProjectJWTPayload = {
			sub: public_token.id,
			organization: public_token.organization,
			project: public_token.project
		};

		const token = await new jose.SignJWT(payload)
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.sign(new TextEncoder().encode(SIGNED_URL_JWT_SECRET));

		const signedLink = `${url.origin}/public/project?signature=${token}`;

		await new Promise((resolve) => setTimeout(resolve, 100));

		return {
			signedLink
		};
	},
	revokePublicToken: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const id = formData.get('id') as string;

		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { error } = await supabase
			.from('public_tokens')
			.update({
				is_revoked: true
			})
			.eq('id', id);

		if (error) {
			return fail(500, {
				error
			});
		}
	}
} satisfies Actions;
