<script lang="ts">
	import Header from './Header.svelte';
	import '../app.css';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<div>
	{#if session}
		<Header>
			<main>
				<slot />
			</main>
		</Header>
	{:else}
		<main>
			<slot />
		</main>
	{/if}
</div>
