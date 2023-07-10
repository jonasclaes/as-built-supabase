<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/Input.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;

	let { project, client, clients } = data;
	$: ({ project, client, clients } = data);

	export let form: ActionData;

	let loading = false;

	let clientName: string = client?.name ?? '';

	const handleUpdate: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};

	const handleDelete: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">{project?.name}</h1>
		<p class="text-base-content text-opacity-50">{project?.code}</p>
	</div>
	{#if form?.error}
		<Alert type="error" alertClasses="col-span-full">
			<span>Error! {capitalize(form.error.message)}</span>
		</Alert>
	{/if}
	<form action="?/update" method="post" use:enhance={handleUpdate}>
		<Input
			formControlClasses="col-span-full"
			name="clientName"
			label="Client"
			type="text"
			placeholder="Client"
			helpText="Choose a client here."
			disabled={loading}
			value={form?.clientName ?? clientName}
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
				Update
			{/if}
		</Button>
	</form>
	<form
		action="?/delete"
		method="post"
		use:enhance={handleDelete}
		class="grid grid-cols-1 md:grid-cols-4 gap-3"
	>
		<Button disabled={loading} accent block type="submit" buttonClasses="col-span-full">
			{#if loading}
				<span class="loading loading-spinner" />
				loading
			{:else}
				Delete
			{/if}
		</Button>
	</form>
</section>
