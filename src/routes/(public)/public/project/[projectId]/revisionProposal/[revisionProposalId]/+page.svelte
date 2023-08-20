<script lang="ts">
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import type { PageData } from './$types';

	export let data: PageData;

	let { organization, project, revisionProposal } = data;
	$: ({ organization, project, revisionProposal } = data);

	$breadcrumbStore = [
		{
			name: 'Project'
		},
		{
			name: project.name,
			path: `/public/project/${project.id}`
		},
		{
			name: 'Revision proposal'
		},
		{
			name: revisionProposal.title,
			path: `/public/project/${project.id}/revisionProposal/${revisionProposal.id}`
		}
	];
</script>

<div>
	<h1 class="text-3xl">Revision proposal</h1>
	<p class="text-base-content text-opacity-50">{project.name} by {organization.name}</p>
</div>
<sub class="font-bold">Title:</sub>
<p>{revisionProposal.title}</p>
<sub class="font-bold">Description:</sub>
<p>{revisionProposal.description}</p>
