<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { organization, project, revisionProposal } = data;
	$: ({ organization, project, revisionProposal } = data);
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">Revision proposal</h1>
		<p class="text-base-content text-opacity-50">{project.name} by {organization.name}</p>
	</div>
	<sub class="font-bold">Title:</sub>
	<h2 class="text-2xl">{revisionProposal.title}</h2>
	<sub class="font-bold">Description:</sub>
	<p>{revisionProposal.description}</p>
</section>
