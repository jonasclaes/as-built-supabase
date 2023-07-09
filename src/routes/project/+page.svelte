<script lang="ts">
	import { enhance } from '$app/forms';
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
		<div class="form-control w-full">
			<label class="label" for="code">
				<span class="label-text">Project code</span>
			</label>
			<input
				type="text"
				name="code"
				placeholder="Project code"
				id="code"
				class="input input-bordered w-full"
				value={form?.code ?? ''}
				disabled={loading}
				required
			/>
			<label class="label" for="code">
				<span class="label-text-alt">Enter a project code here.</span>
			</label>
		</div>

		<div class="form-control w-full md:col-span-3">
			<label class="label" for="name">
				<span class="label-text">Project name</span>
			</label>
			<input
				type="text"
				name="name"
				placeholder="Project name"
				id="name"
				class="input input-bordered w-full"
				value={form?.name ?? ''}
				disabled={loading}
				required
			/>
			<label class="label" for="name">
				<span class="label-text-alt">Enter a project name here.</span>
			</label>
		</div>

		<div class="col-span-full">
			<button type="submit" disabled={loading} class="btn btn-block btn-primary">
				{#if loading}
					<span class="loading loading-spinner" />
					loading
				{:else}
					Create
				{/if}</button
			>
		</div>
	</form>
</section>
