import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({
	params: { projectId, revisionId, fileName },
	locals: { supabaseAdmin }
}) => {
	console.log('reached download');

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

	const fileKey = `${projectData.organizations.id}/${projectData.id}/${revisionId}/${fileName}`;

	const { error: storageError, data: storageResponse } = await supabaseAdmin.storage
		.from('files')
		.createSignedUrl(fileKey, 60);

	if (storageError || !storageResponse) {
		throw error(404, 'File not found');
	}

	console.log('reached download');

	throw redirect(303, storageResponse.signedUrl);
};
