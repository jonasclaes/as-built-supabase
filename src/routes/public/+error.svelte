<script lang="ts">
	import { page } from '$app/stores';
	import Hero from '$lib/components/daisyui/Hero.svelte';
</script>

<Hero title={$page.status.toString()} body={$page.error?.message} />
