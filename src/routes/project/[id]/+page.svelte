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

	let projectForm: HTMLFormElement;
	let deleteForm: HTMLFormElement;

	let loading = false;
	let code: string = project?.code ?? '';
	let name: string = project?.name ?? '';
	let clientName: string = client?.name ?? '';

	const handleUpdate: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update({ reset: false });
		};
	};

	const handleDelete: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update({ reset: false });
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
	<form
		action="?/update"
		method="post"
		use:enhance={handleUpdate}
		bind:this={projectForm}
		class="grid grid-cols-1 md:grid-cols-4 gap-3"
	>
		<Input
			name="code"
			label="Project code"
			placeholder="Project code"
			helpText="Enter a project code here."
			disabled={loading}
			required
			value={form?.code ?? code}
			bordered
		/>

		<Input
			formControlClasses="col-span-3"
			name="name"
			label="Project name"
			placeholder="Project name"
			helpText="Enter a project name here."
			disabled={loading}
			required
			value={form?.name ?? name}
			bordered
		/>

		<Input
			formControlClasses="col-span-full"
			name="clientName"
			label="Client"
			placeholder="Client"
			helpText="Choose a client here."
			disabled={loading}
			value={form?.clientName ?? clientName}
			bordered
			list="clientList"
		/>

		<datalist id="clientList">
			{#each clients || [] as client (client.id)}
				<option value={client.name} />
			{/each}
		</datalist>
	</form>
	<form
		action="?/delete"
		method="post"
		use:enhance={handleDelete}
		bind:this={deleteForm}
		class="grid grid-cols-1 md:grid-cols-4 gap-3"
	/>
	<div class="grid grid-cols-3 gap-3">
		<Button
			disabled={loading}
			primary
			type="submit"
			buttonClasses=""
			on:click={() => projectForm.submit()}
		>
			{#if loading}
				<span class="loading loading-spinner" />
				loading
			{:else}
				Update
			{/if}
		</Button>
		<Button href="/" primary buttonClasses="">New revision</Button>
		<Button
			disabled={loading}
			accent
			type="submit"
			buttonClasses=""
			on:click={() => deleteForm.submit()}
		>
			{#if loading}
				<span class="loading loading-spinner" />
				loading
			{:else}
				Delete
			{/if}
		</Button>
	</div>
</section>
