<script lang="ts">
	import FormControl from '$lib/components/daisyui/FormControl.svelte';
	import FormInputLabel from '$lib/components/daisyui/FormInputLabel.svelte';
	import FormSelect from '$lib/components/daisyui/FormSelect.svelte';
	import { availableThemes, themeStore } from '$lib/stores/themeStore';
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
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
</section>
