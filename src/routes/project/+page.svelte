<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/LegacyInput.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;

	let { clients } = data;
	$: ({ clients } = data);

	export let form: ActionData;

	let loading = false;
	let projectForm: HTMLFormElement;

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<h1 class="text-3xl">New project</h1>
	<form
		action="?/create"
		method="post"
		use:enhance={handleSubmit}
		bind:this={projectForm}
		class="grid grid-cols-1 md:grid-cols-4 gap-3"
	>
		{#if form?.error}
			<Alert type="error" alertClasses="col-span-full">
				<span>Error! {capitalize(form.error.message)}</span>
			</Alert>
		{/if}

		<Input
			name="code"
			label="Project code"
			placeholder="Project code"
			helpText="Enter a project code here."
			disabled={loading}
			required
			value={form?.code ?? ''}
			bordered
		/>

		<Input
			formControlClasses="md:col-span-3"
			name="name"
			label="Project name"
			placeholder="Project name"
			helpText="Enter a project name here."
			disabled={loading}
			required
			value={form?.name ?? ''}
			bordered
		/>

		<Input
			formControlClasses="col-span-full"
			name="clientName"
			label="Client"
			type="text"
			placeholder="Client"
			helpText="Choose a client here."
			disabled={loading}
			value={form?.clientName ?? ''}
			bordered
			list="clientList"
		/>

		<datalist id="clientList">
			{#each clients || [] as client}
				<option value={client.name} />
			{/each}
		</datalist>

		<Button disabled={loading} primary block type="submit" buttonClasses="col-span-full">
			{#if loading}
				<span class="loading loading-spinner" />
				loading
			{:else}
				Create
			{/if}
		</Button>
	</form>
</section>
