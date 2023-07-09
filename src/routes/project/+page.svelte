<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/capitalize';
	import Alert from '../../components/daisyui/Alert.svelte';
	import Button from '../../components/daisyui/Button.svelte';
	import Input from '../../components/daisyui/Input.svelte';
	import type { ActionData, SubmitFunction } from './$types';

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
