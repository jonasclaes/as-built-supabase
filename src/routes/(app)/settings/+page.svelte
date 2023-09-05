<script lang="ts">
	import { enhance } from '$app/forms';
	import FormControl from '$lib/components/daisyui/FormControl.svelte';
	import FormInputLabel from '$lib/components/daisyui/FormInputLabel.svelte';
	import FormSelect from '$lib/components/daisyui/FormSelect.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import { addToast } from '$lib/stores/toasts';
	import type { PageData, SubmitFunction } from './$types';

	export let data: PageData;
	let { theme } = data;
	$: ({ theme } = data);

	$breadcrumbStore = [{ name: 'Settings', path: '/settings' }];

	interface Theme {
		name: string;
		value: string;
	}

	const availableThemes: Theme[] = [
		{ name: 'Light', value: 'corporate' },
		{ name: 'Dark', value: 'business' },
		{ name: 'Synthwave', value: 'synthwave' },
		{ name: 'Emerald', value: 'emerald' },
		{ name: 'Night', value: 'night' }
	];

	let updateThemeLoading = false;
	let updateForm: HTMLFormElement;

	const handleUpdateTheme: SubmitFunction = () => {
		updateThemeLoading = true;
		return async ({ update, result }) => {
			await update({ reset: false });
			updateThemeLoading = false;

			if (result.type === 'success' && result.data) {
				document.documentElement.setAttribute('data-theme', result.data.theme);
				addToast({
					type: 'success',
					message: `Your theme has been updated.`
				});
			}
		};
	};
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 class="text-3xl">Settings</h1>
<h2 class="text-2xl">Personal preferences</h2>
<div class="grid grid-cols-1 gap-3">
	<form action="?/updateTheme" method="post" use:enhance={handleUpdateTheme} bind:this={updateForm}>
		<FormControl>
			<FormInputLabel for="theme">Theme</FormInputLabel>
			<FormSelect
				id="theme"
				name="theme"
				style="bordered"
				disabled={updateThemeLoading}
				value={theme ?? 'corporate'}
				on:change={() => updateForm.requestSubmit()}
			>
				{#each availableThemes as theme}
					<option value={theme.value}>{theme.name}</option>
				{/each}
			</FormSelect>
		</FormControl>
	</form>
</div>
