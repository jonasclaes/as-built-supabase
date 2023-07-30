<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let { token, payload, public_token } = data;
	$: ({ token, payload, public_token } = data);
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">{public_token.projects?.name}</h1>
		<p class="text-base-content text-opacity-50">{public_token.organizations?.name}</p>
	</div>
	<p>Signature:</p>
	<code class="break-all">{token}</code>
	<p>Decoded data:</p>
	<textarea class="font-mono bg-base-200" rows="5">{JSON.stringify(payload, null, 2)}</textarea>
</section>
