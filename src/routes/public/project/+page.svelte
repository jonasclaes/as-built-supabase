<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">Placeholder</h1>
		<p class="text-base-content text-opacity-50">Public project</p>
	</div>
	<p>Signature:</p>
	<code class="break-all">{data.token}</code>
	<p>Decoded data:</p>
	<textarea class="font-mono bg-base-200" rows="5">{JSON.stringify(data.payload, null, 2)}</textarea
	>
</section>
