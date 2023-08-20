import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({
	params: { projectId, revisionProposalId },
	locals: { supabaseAdmin }
}) => {
	const { error: projectError, data: projectData } = await supabaseAdmin
		.from('projects')
		.select(`id, code, name, organizations ( id, name )`)
		.eq('id', projectId)
		.single();

	if (projectError || !projectData) {
		throw error(404, 'Project not found');
	}

	if (!projectData.organizations) {
		throw error(404, 'Organization not found');
	}

	const { error: revisionProposalError, data: revisionProposalData } = await supabaseAdmin
		.from('revision_request_proposals')
		.select(`id, created_at, title, description, external_email, external_full_name`)
		.eq('id', revisionProposalId)
		.single();

	if (revisionProposalError || !revisionProposalData) {
		throw error(404, 'Project not found');
	}

	return {
		organization: projectData.organizations,
		project: projectData,
		revisionProposal: revisionProposalData
	};
}) satisfies PageServerLoad;
