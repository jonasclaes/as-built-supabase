import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({
	params: { projectId, revisionId, fileName },
	locals: { supabase, getSession }
}) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`organization`)
		.eq('id', session.user.id)
		.single();

	const fileKey = `${profile?.organization}/${projectId}/${revisionId}/${fileName}`;

	const { error: storageError, data: storageResponse } = await supabase.storage
		.from('files')
		.createSignedUrl(fileKey, 60);

	if (storageError) {
		throw error(500, storageError.toString());
	}

	if (!storageResponse) {
		throw error(500, 'Unknown error');
	}

	throw redirect(303, storageResponse.signedUrl);
};
