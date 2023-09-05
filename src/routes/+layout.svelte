<script lang="ts">
	import { invalidate } from '$app/navigation';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Toast from '$lib/components/daisyui/Toast.svelte';
	import { toastStore } from '$lib/stores/toasts';
	import { onMount } from 'svelte';
	import { fly, slide } from 'svelte/transition';
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const {
			data: { subscription }
		} = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div>
	<slot />
	<Toast>
		{#each $toastStore as toast (toast.id)}
			<div in:slide out:fly>
				<Alert type={toast.type ?? ''}>{toast.message}</Alert>
			</div>
		{/each}
	</Toast>
</div>
