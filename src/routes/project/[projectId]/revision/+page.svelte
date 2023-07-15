<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/Input.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let { project } = data;
	$: ({ project } = data);

	let revisionForm: HTMLFormElement;

	let loading = false;

	const handleCreate: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update({ reset: false });
		};
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<div>
		<h1 class="text-3xl">New revision</h1>
		<p class="text-base-content text-opacity-50">{project.code} {project.name}</p>
	</div>
	{#if form?.error}
		<Alert type="error" alertClasses="col-span-full">
			<span>Error! {capitalize(form.error.message)}</span>
		</Alert>
	{/if}
	<form
		action="?/create"
		method="post"
		use:enhance={handleCreate}
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
			value={form?.code ?? ''}
			bordered
			formControlClasses="col-span-full"
		/>
	</form>
	<div class="grid grid-cols-1 gap-3">
		<Button
			disabled={loading}
			primary
			type="submit"
			buttonClasses=""
			on:click={() => revisionForm.submit()}
		>
			{#if loading}
				<span class="loading loading-spinner" />
				Loading
			{:else}
				Create revision
			{/if}
		</Button>
	</div>
</section>
