<script lang="ts">
	import { enhance } from '$app/forms';
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
			<div class="col-span-full">
				<div class="alert alert-error">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="stroke-current shrink-0 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
					<span
						>Error! {form.error.message.charAt(0).toUpperCase() + form.error.message.slice(1)}</span
					>
				</div>
			</div>
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
