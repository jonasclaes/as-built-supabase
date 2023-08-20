import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params: { projectId, revisionId }, locals: { supabaseAdmin } }) => {
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

	const { error: revisionError, data: revisionData } = await supabaseAdmin
		.from('revisions')
		.select(`id, code`)
		.eq('id', revisionId)
		.single();

	if (revisionError || !revisionData) {
		throw error(404, 'Project not found');
	}

	const { data: files } = await supabaseAdmin.storage
		.from('files')
		.list(`${projectData.organizations.id}/${projectData.id}/${revisionData.id}`);

	return {
		organization: projectData.organizations,
		project: projectData,
		revision: revisionData,
		files: files ?? []
	};
}) satisfies PageServerLoad;
