<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { projects } = data;
	$: ({ projects } = data);
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<h1>Testy</h1>
	{#each projects ?? [] as project}
		<p><span>{project.code}</span>&nbsp;{project.name}</p>
	{/each}
</section>
