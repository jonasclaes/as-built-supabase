<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/Input.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;

	let { project, clients } = data;
	$: ({ project, clients } = data);

	export let form: ActionData;

	let projectForm: HTMLFormElement;
	let deleteForm: HTMLFormElement;

	let loading = false;
	let code: string = project.code ?? '';
	let name: string = project.name ?? '';
	let clientName: string = project.clients?.name ?? '';

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
		<h1 class="text-3xl">{project.name}</h1>
		<p class="text-base-content text-opacity-50">{project.code}</p>
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
			formControlClasses="md:col-span-3"
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
			{#each clients as client (client.id)}
				<option value={client.name} />
			{/each}
		</datalist>
	</form>
	<form action="?/delete" method="post" use:enhance={handleDelete} bind:this={deleteForm} />
	<div class="grid md:grid-cols-3 gap-3">
		<Button disabled={loading} primary type="submit" on:click={() => projectForm.requestSubmit()}>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Save project
			{/if}
		</Button>
		<Button href="/project/{project.id}/revision" secondary>New revision</Button>
		<Button disabled={loading} accent type="submit" on:click={() => deleteForm.requestSubmit()}>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Delete
			{/if}
		</Button>
	</div>
	<h2 class="text-xl">Revisions</h2>
	{#if project.revisions && project.revisions.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Code</th>
						<th>Created at</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each project.revisions as revision}
						<tr class="hover">
							<td class="font-bold">
								{revision.code}
							</td>
							<td>
								{new Date(revision.created_at ?? '').toLocaleString()}
							</td>
							<th>
								<div class="flex justify-end">
									<a
										href="/project/{project.id}/revision/{revision.id}"
										class="btn btn-ghost btn-xs">Details</a
									>
								</div>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			You don't have any revisions yet. Why don't you <a
				href="/project/{project.id}/revision"
				class="text-primary underline hover:text-primary-focus">create</a
			> one now?
		</p>
	{/if}
</section>
