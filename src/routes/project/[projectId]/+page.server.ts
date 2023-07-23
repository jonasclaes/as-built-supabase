import { error, fail, redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params: { projectId }, locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: project } = await supabase
		.from('projects')
		.select(`id, code, name, clients ( name ), revisions ( id, created_at, code )`)
		.eq('id', projectId)
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
	generateSignedLink: async ({ params: { projectId }, url, locals: { supabase, getSession } }) => {
		const session = await getSession();

		if (!session) {
			throw redirect(303, '/');
		}

		const { data: profile } = await supabase
			.from('profiles')
			.select(`organization`)
			.eq('id', session.user.id)
			.single();

		const payload: Record<string, unknown> = {
			organization: profile?.organization,
			project: projectId
		};

		// TODO: Change the secret to an env secret. Do NOT put this code into production like this.
		const token = jwt.sign(payload, 'testymctestface');

		const signedLink = `${url.origin}/public/project?signature=${token}`;

		await new Promise((resolve) => setTimeout(resolve, 1000));

		return {
			signedLink
		};
	}
} satisfies Actions;
