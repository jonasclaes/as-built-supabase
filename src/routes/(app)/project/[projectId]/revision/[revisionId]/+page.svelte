<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import { formatBytes } from '$lib/Formatters';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/LegacyButton.svelte';
	import Input from '$lib/components/daisyui/LegacyInput.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { project, revision, files } = data;
	$: ({ project, revision, files } = data);

	let revisionForm: HTMLFormElement;
	let deleteForm: HTMLFormElement;
	let fileUploadModal: HTMLDialogElement;
	let fileDeleteModal: HTMLDialogElement;

	let fileDeleteName = '';

	let loading = false;
	let fileUploadLoading = false;
	let fileDeleteLoading = false;

	let code = revision.code ?? '';

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

	const handleUpload: SubmitFunction = () => {
		fileUploadLoading = true;

		return async ({ update, result }) => {
			fileUploadLoading = false;

			if (result.type === 'success') {
				fileUploadModal.close();
			}

			await update();
		};
	};

	const handleDeleteFile: SubmitFunction = () => {
		fileDeleteLoading = true;
		return async ({ update, result }) => {
			fileDeleteLoading = false;

			if (result.type === 'success') {
				fileDeleteModal.close();
			}

			await update({ reset: true });
		};
	};

	const openFileDeleteModal = (name: string) => {
		fileDeleteName = name;
		fileDeleteModal.showModal();
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">{project.name}</h1>
		<p class="text-base-content text-opacity-50">{project.code} {project.name}</p>
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
		bind:this={revisionForm}
		class="grid grid-cols-1 md:grid-cols-4 gap-3"
	>
		<Input
			name="code"
			label="Revision code"
			placeholder="Revision code"
			helpText="Enter a revision code here. We recommend semantic versioning for revisions. For example: V1.0.0 -> V1.0.1 -> V1.1.0"
			disabled={loading}
			required
			value={form?.code ?? code}
			bordered
			formControlClasses="col-span-full"
		/>
	</form>
	<form action="?/delete" method="post" use:enhance={handleDelete} bind:this={deleteForm} />
	<div class="grid md:grid-cols-4 gap-3">
		<Button
			disabled={loading}
			primary
			type="submit"
			buttonClasses=""
			on:click={() => revisionForm.requestSubmit()}
		>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Save revision
			{/if}
		</Button>
		<Button secondary type="button" on:click={() => fileUploadModal.showModal()}>Add a file</Button>
		<Button href="/project/{project.id}" secondary>Back to project</Button>
		<Button disabled={loading} error type="submit" on:click={() => deleteForm.requestSubmit()}>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Delete
			{/if}
		</Button>
	</div>
	<dialog class="modal" bind:this={fileUploadModal}>
		<form method="dialog" class="modal-box">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			<h3 class="font-bold text-lg">Add a file</h3>
			<p class="py-4">You can add files by selecting the input below.</p>
			<form
				action="?/uploadFiles"
				method="post"
				enctype="multipart/form-data"
				use:enhance={handleUpload}
				class="flex flex-col gap-3"
			>
				<input
					name="files"
					type="file"
					multiple
					class="file-input file-input-bordered file-input-primary w-full"
					disabled={fileUploadLoading}
				/>
				<Button primary type="submit" disabled={fileUploadLoading}>
					{#if fileUploadLoading}
						<span class="loading loading-spinner" />
						Uploading...
					{:else}
						Upload
					{/if}
				</Button>
			</form>
		</form>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
	<h2 class="text-2xl">Files</h2>
	{#if files && files.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Name</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each files as file}
						<tr class="hover">
							<td>
								<div class="flex items-center">
									<div>
										<div class="font-bold break-all">{file.name}</div>
										<div class="text-sm opacity-50">
											{new Date(file.created_at).toLocaleString()}
										</div>
										<div class="text-sm opacity-50">
											{formatBytes(file.metadata.size)}
										</div>
									</div>
								</div>
							</td>
							<td>
								<div class="join flex justify-end">
									<Button
										href="/project/{project.id}/revision/{revision.id}/file/{file.name}"
										target="_blank"
										primary
										size="xs"
										buttonClasses="join-item">Download</Button
									>
									<Button
										on:click={() => openFileDeleteModal(file.name)}
										error
										size="xs"
										buttonClasses="join-item">Delete</Button
									>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			You don't have any files yet. Why don't you <button
				on:click={() => fileUploadModal.showModal()}
				class="text-primary underline hover:text-primary-focus">upload</button
			> some now?
		</p>
	{/if}
	<dialog class="modal" bind:this={fileDeleteModal}>
		<form method="dialog" class="modal-box">
			<button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
			<h3 class="font-bold text-lg">Delete a file</h3>
			<p class="py-4">
				Are you sure you want to delete <span class="font-bold">{fileDeleteName}</span>?
			</p>
			<form
				action="?/deleteFile"
				method="post"
				use:enhance={handleDeleteFile}
				class="flex flex-col gap-3"
			>
				<input type="hidden" name="name" bind:value={fileDeleteName} />
				<div class="grid md:grid-cols-2 gap-3">
					<Button primary type="submit" disabled={fileDeleteLoading}>
						{#if fileDeleteLoading}
							<span class="loading loading-spinner" />
							Loading
						{:else}
							Yes
						{/if}
					</Button>
					<Button
						secondary
						type="button"
						disabled={fileDeleteLoading}
						on:click={() => {
							fileDeleteModal.close();
						}}
					>
						No
					</Button>
				</div>
			</form>
		</form>
		<form method="dialog" class="modal-backdrop">
			<button>close</button>
		</form>
	</dialog>
</section>
