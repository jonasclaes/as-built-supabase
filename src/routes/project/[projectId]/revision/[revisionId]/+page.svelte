<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
	import { capitalize } from '$lib/capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/Input.svelte';
	import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { session, project, revision, profile, files } = data;
	$: ({ session, project, revision, profile, files } = data);

	let revisionForm: HTMLFormElement;
	let deleteForm: HTMLFormElement;

	let loading = false;

	let code = revision.code ?? '';

	let supabase = createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: session
	});
	$: createSupabaseLoadClient({
		supabaseUrl: PUBLIC_SUPABASE_URL,
		supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
		event: { fetch },
		serverSession: session
	});

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

	const downloadFile = async (key: string, name: string) => {
		const { error, data: file } = await supabase.storage.from('files').download(key);

		if (error) {
			console.error(error);
			return;
		}

		if (!file) {
			console.error('Unknown error');
			return;
		}

		// This is an ugly JS-hack in order to download a file from a blob.
		const url = URL.createObjectURL(file);
		const link = document.createElement('a');
		link.download = name;
		link.href = url;
		link.click();
		URL.revokeObjectURL(url);
		link.remove();
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">{project.name}</h1>
		<p class="text-base-content text-opacity-50">{project.code} {project.name}</p>
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
	<div class="grid md:grid-cols-3 gap-3">
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
		<Button href="/project/{project.id}" secondary>Back to project</Button>
		<Button disabled={loading} accent type="submit" on:click={() => deleteForm.requestSubmit()}>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Delete
			{/if}
		</Button>
	</div>
	<h2 class="text-xl">Files</h2>
	{#if files && files.length > 0}
		<div class="overflow-x-auto overflow-y-auto">
			<table class="table table-pin-rows">
				<thead>
					<tr>
						<th>Name</th>
						<th>Created at</th>
						<th>Type</th>
						<th />
					</tr>
				</thead>
				<tbody>
					{#each files as file}
						<tr class="hover">
							<td class="font-bold break-all">
								{file.name}
							</td>
							<td>
								{new Date(file.created_at).toLocaleString()}
							</td>
							<td>
								{file.metadata.mimetype}
							</td>
							<th>
								<Button
									type="button"
									primary
									size="xs"
									on:click={() =>
										downloadFile(
											`${profile?.organization}/${project.id}/${revision.id}/${file.name}`,
											file.name
										)}>Download</Button
								>
							</th>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p class="text-center text-base-content text-opacity-50">
			You don't have any files yet. Why don't you <a
				href="/project/{project.id}/revision/{revision.id}/upload"
				class="text-primary underline hover:text-primary-focus">upload</a
			> one now?
		</p>
	{/if}
</section>
