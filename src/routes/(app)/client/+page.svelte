<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/LegacyButton.svelte';
	import Input from '$lib/components/daisyui/LegacyInput.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import type { ActionData, SubmitFunction } from './$types';

	export let form: ActionData;

	let loading = false;
	let clientForm: HTMLFormElement;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};

	$breadcrumbStore = [
		{ name: 'Dashboard', path: '/' },
		{ name: 'Client' },
		{ name: 'New', path: '/client' }
	];
</script>

<h1 class="text-3xl">New client</h1>
<form
	action="?/create"
	method="post"
	use:enhance={handleSubmit}
	bind:this={clientForm}
	class="grid grid-cols-1 md:grid-cols-4 gap-3"
>
	{#if form?.error}
		<Alert type="error" class="col-span-full">
			<span>Error! {capitalize(form.error.message)}</span>
		</Alert>
	{/if}

	<Input
		name="code"
		label="Client code"
		placeholder="Client code"
		helpText="Enter a client code here."
		disabled={loading}
		required
		value={form?.code ?? ''}
		bordered
	/>

	<Input
		formControlClasses="md:col-span-3"
		name="name"
		label="Client name"
		placeholder="Client name"
		helpText="Enter a client name here."
		disabled={loading}
		required
		value={form?.name ?? ''}
		bordered
	/>

	<Button disabled={loading} primary block type="submit" buttonClasses="col-span-full">
		{#if loading}
			<span class="loading loading-spinner" />
			loading
		{:else}
			Create
		{/if}
	</Button>
</form>
