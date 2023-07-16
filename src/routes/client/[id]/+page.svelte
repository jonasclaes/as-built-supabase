<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/Input.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { client } = data;
	$: ({ client } = data);

	let clientForm: HTMLFormElement;
	let deleteForm: HTMLFormElement;

	let loading = false;
	let code: string = client.code ?? '';
	let name: string = client.name ?? '';

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
		<h1 class="text-3xl">{client.name}</h1>
		<p class="text-base-content text-opacity-50">{client.code}</p>
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
		bind:this={clientForm}
		class="grid grid-cols-1 md:grid-cols-4 gap-3"
	>
		<Input
			name="code"
			label="Client code"
			placeholder="Client code"
			helpText="Enter a client code here."
			disabled={loading}
			required
			value={form?.code ?? code}
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
			value={form?.name ?? name}
			bordered
		/>
	</form>
	<form
		action="?/delete"
		method="post"
		use:enhance={handleDelete}
		bind:this={deleteForm}
		class="grid grid-cols-1 md:grid-cols-4 gap-3"
	/>
	<div class="grid md:grid-cols-2 gap-3">
		<Button disabled={loading} primary type="submit" on:click={() => clientForm.requestSubmit()}>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Save client
			{/if}
		</Button>
		<Button disabled={loading} accent type="submit" on:click={() => deleteForm.requestSubmit()}>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Delete
			{/if}
		</Button>
	</div>
</section>
