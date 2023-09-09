<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/LegacyInput.svelte';
	import Link from '$lib/components/daisyui/Link.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
	import { addToast } from '$lib/stores/toasts';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;

	let { project, clients } = data;
	$: ({ project, clients } = data);

	export let form: ActionData;

	let projectForm: HTMLFormElement;
	let deleteForm: HTMLFormElement;
	let generateSignedLinkModal: HTMLDialogElement;

	let loading = false;
	let code: string = project.code ?? '';
	let name: string = project.name ?? '';
	let clientName: string = project.clients?.name ?? '';

	let generateSignedLinkLoading = false;
	let generateSignedLinkModalStep = 1;

	let publicTokenDeleteLoading = false;

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

	const handleOpenSignedLinkModal = () => {
		generateSignedLinkModalStep = 1;
		generateSignedLinkModal.showModal();
	};

	const handleGenerateSignedLink: SubmitFunction = () => {
		generateSignedLinkLoading = true;
		return async ({ update }) => {
			await update({ reset: true });
			generateSignedLinkModalStep = 2;
			generateSignedLinkLoading = false;
		};
	};

	const handleCopyGeneratedSignedLinkToClipboard = async () => {
		if (navigator.clipboard) {
			await navigator.clipboard.writeText(form?.signedLink ?? '');
			addToast({
				type: 'success',
				message: 'Copied signed link to clipboard'
			});
		}
	};

	const handleRevokePublicToken: SubmitFunction = () => {
		publicTokenDeleteLoading = true;
		return async ({ update }) => {
			await update({ reset: false });
			publicTokenDeleteLoading = false;
		};
	};

	$breadcrumbStore = [
		{ name: 'Dashboard', path: '/' },
		{ name: 'Project' },
		{ name: project.name, path: `/project/${project.id}` }
	];
</script>

<div>
	<h1 class="text-3xl">{project.name}</h1>
	<p class="text-base-content text-opacity-50">{project.code}</p>
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
<div class="grid md:grid-cols-4 gap-3">
	<Button
		disabled={loading}
		color="primary"
		type="button"
		on:click={() => projectForm.requestSubmit()}
	>
		{#if loading}
			<span class="loading loading-spinner" />
			Loading
		{:else}
			Save project
		{/if}
	</Button>
	<Link href="/project/{project.id}/revision" color="secondary">New revision</Link>
	<Button color="secondary" type="button" on:click={handleOpenSignedLinkModal}
		>Generate signed link</Button
	>
	<Button
		disabled={loading}
		color="error"
		type="button"
		on:click={() => deleteForm.requestSubmit()}
	>
		{#if loading}
			<span class="loading loading-spinner" />
			Loading
		{:else}
			Delete
		{/if}
	</Button>
</div>
<dialog class="modal" bind:this={generateSignedLinkModal}>
	<form method="dialog" class="modal-box">
		<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
		<h3 class="font-bold text-lg pb-2">Generate signed link</h3>
		{#if form?.signedLink == null}
			<p class="pb-2">Press the button below to generate a signed link and QR-code.</p>
		{/if}
		<form
			action="?/generateSignedLink"
			method="post"
			use:enhance={handleGenerateSignedLink}
			class="flex flex-col gap-3"
		>
			{#if generateSignedLinkModalStep == 1}
				<Input
					label="Description"
					placeholder="Unknown signed link"
					helpText="Enter a description for the signed link here. (optional)"
					name="description"
					value={form?.description ?? ''}
					bordered
					disabled={generateSignedLinkLoading}
				/>
				<Button color="primary" type="submit" disabled={generateSignedLinkLoading}>
					{#if generateSignedLinkLoading}
						<span class="loading loading-spinner" />
						Generating...
					{:else}
						Generate
					{/if}
				</Button>
			{/if}

			{#if generateSignedLinkModalStep == 2}
				<Input name="signedLink" value={form?.signedLink ?? ''} bordered disabled={true} />
				<Button color="primary" type="button" on:click={handleCopyGeneratedSignedLinkToClipboard}>
					Copy to clipboard
				</Button>
			{/if}
		</form>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
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
								<a href="/project/{project.id}/revision/{revision.id}" class="btn btn-ghost btn-xs"
									>Details</a
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
<h2 class="text-xl">Signed links</h2>
{#if project.public_tokens && project.public_tokens.length > 0}
	<div class="overflow-x-auto overflow-y-auto">
		<table class="table table-pin-rows">
			<thead>
				<tr>
					<th>Description</th>
					<th>Created at</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each project.public_tokens as public_token}
					<tr class="hover">
						<td class="font-bold">
							{public_token.description ?? 'No description provided'}
						</td>
						<td>
							{new Date(public_token.created_at ?? '').toLocaleString()}
						</td>
						<th>
							<div class="flex justify-end">
								<form
									action="?/revokePublicToken"
									method="post"
									use:enhance={handleRevokePublicToken}
								>
									<Input name="id" type="hidden" value={public_token.id} />
									<Button size="xs" color="error" disabled={publicTokenDeleteLoading}>
										{#if publicTokenDeleteLoading}
											<span class="loading loading-spinner" />
											Revoking...
										{:else}
											Revoke
										{/if}</Button
									>
								</form>
							</div>
						</th>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
{:else}
	<p class="text-center text-base-content text-opacity-50">
		You don't have any signed links yet. Why don't you <button
			on:click={handleOpenSignedLinkModal}
			class="text-primary underline hover:text-primary-focus">create</button
		> one now?
	</p>
{/if}
