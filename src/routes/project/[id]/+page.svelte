<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/daisyui/Button.svelte';
	import type { ActionData, PageData, SubmitFunction } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let loading = false;

	const handleDelete: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<h1 class="text-3xl">{data.project?.name}</h1>
	<form
		action="?/delete"
		method="post"
		use:enhance={handleDelete}
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

		<input type="text" name="id" hidden required value={data.project?.id} />

		<div class="col-span-full">
			<Button disabled={loading} warning block type="submit">
				{#if loading}
					<span class="loading loading-spinner" />
					loading
				{:else}
					Delete
				{/if}
			</Button>
		</div>
	</form>
</section>
