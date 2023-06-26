<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<h1>{data.project?.name}</h1>
	<p>{data.project?.id}</p>
</section>
