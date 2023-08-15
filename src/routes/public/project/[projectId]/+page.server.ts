import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

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
