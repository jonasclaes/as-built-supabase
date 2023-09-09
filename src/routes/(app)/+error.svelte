<script lang="ts">
	import { page } from '$app/stores';
	import Hero from '$lib/components/daisyui/Hero.svelte';
	import Link from '$lib/components/daisyui/Link.svelte';
</script>

<Hero>
	<h1 class="text-5xl font-bold">{$page.status}</h1>
	<p class="py-6">
		{$page.error?.message}
	</p>
	<Link href="/" color="primary" slot="actions">Go to dashboard</Link>
</Hero>
