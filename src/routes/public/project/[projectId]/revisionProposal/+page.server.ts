import { EmailStrategyFactory } from '$lib/email/EmailStrategyFactory';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params: { projectId }, locals: { supabaseAdmin } }) => {
	const { error: projectError, data: projectData } = await supabaseAdmin
		.from('projects')
		.select(`id, code, name, organizations ( id, name ), revisions ( id, code, created_at )`)
		.eq('id', projectId)
		.single();

	if (projectError || !projectData) {
		throw error(404, 'Project not found');
	}

	if (!projectData.organizations) {
		throw error(404, 'Organization not found');
	}

	return {
		project: projectData,
		organization: projectData.organizations
	};
}) satisfies PageServerLoad;

export const actions = {
	createRevisionProposal: async ({
		params: { projectId },
		request,
		url,
		locals: { supabaseAdmin }
	}) => {
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

		const { error: revision_proposal_error, data: revision_proposal } = await supabaseAdmin
			.from('revision_request_proposals')
			.insert({
				title,
				description,
				project: projectId,
				external_full_name: fullName,
				external_email: email
			})
			.select(`id`)
			.single();

		if (revision_proposal_error) {
			throw error(500, revision_proposal_error);
		}

		try {
			const emailStrategy = EmailStrategyFactory.getEmailStrategy();
			await emailStrategy.sendEvent('new-revision-request-proposal', email, {
				title,
				description,
				url: url.origin
			});
		} catch (err) {
			await supabaseAdmin
				.from('revision_request_proposals')
				.delete()
				.match({ id: revision_proposal.id });

			return fail(400, {
				fullName,
				email,
				title,
				description,
				error: `Could not send email to ${email}.`
			});
		}

		throw redirect(303, `/public/project/${projectId}`);
	}
} satisfies Actions;
