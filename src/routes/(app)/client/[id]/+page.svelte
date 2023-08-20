<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/LegacyButton.svelte';
	import Input from '$lib/components/daisyui/LegacyInput.svelte';
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
		<Alert type="error" class="col-span-full">
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
		<Button disabled={loading} error type="submit" on:click={() => deleteForm.requestSubmit()}>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Delete
			{/if}
		</Button>
	</div>
	<h2 class="text-xl">Projects</h2>
	{#if client.projects && client.projects.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Code</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each client.projects as project}
						<tr class="hover">
							<td class="font-bold">
								<div class="flex items-center">
									<div>
										<div class="font-bold">{project.name}</div>
										<div class="text-sm opacity-50">
											{project.code}
										</div>
									</div>
								</div>
							</td>
							<th>
								<div class="flex justify-end">
									<a href="/project/{project.id}" class="btn btn-ghost btn-xs">Details</a>
								</div>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			You don't have any projects yet. Why don't you <a
				href="/project"
				class="text-primary underline hover:text-primary-focus">create</a
			> one now?
		</p>
	{/if}
</section>
