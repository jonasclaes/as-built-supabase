<script lang="ts">
	import FormControl from '$lib/components/daisyui/FormControl.svelte';
	import FormInputLabel from '$lib/components/daisyui/FormInputLabel.svelte';
	import FormSelect from '$lib/components/daisyui/FormSelect.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import { availableThemes, themeStore } from '$lib/stores/themeStore';

	$breadcrumbStore = [
		{
			name: 'Settings',
			path: '/public/settings'
		}
	];
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 class="text-3xl">Settings</h1>
<h2 class="text-2xl">Personal preferences</h2>
<div class="grid grid-cols-1 gap-3">
	<FormControl>
		<FormInputLabel for="theme">Theme</FormInputLabel>
		<FormSelect id="theme" style="bordered" bind:value={$themeStore}>
			{#each availableThemes as theme}
				<option value={theme.value}>{theme.name}</option>
			{/each}
		</FormSelect>
	</FormControl>
</div>
