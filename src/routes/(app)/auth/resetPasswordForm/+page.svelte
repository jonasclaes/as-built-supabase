<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/LegacyButton.svelte';
	import Input from '$lib/components/daisyui/LegacyInput.svelte';
	import type { ActionData, SubmitFunction } from './$types';

	export let form: ActionData;

	let loading = false;

	const handleResetPassword: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update();
		};
	};
</script>

<svelte:head>
	<title>Reset password</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3 pt-16 justify-center h-full">
	<h1 class="text-3xl md:text-5xl text-center font-bold">AS-BUILT</h1>
	<h2 class="text-xl md:text-3xl text-center">Reset password</h2>
	<div class="card bg-base-200">
		<div class="card-body">
			{#if !loading}
				{#if form?.message}
					<Alert type="error">
						<span>Error! {capitalize(form.message)}</span>
					</Alert>
				{/if}
			{/if}

			<form
				action="?/resetPassword"
				method="post"
				use:enhance={handleResetPassword}
				class="flex flex-col gap-3"
			>
				<Input
					name="password"
					label="Your new password"
					placeholder="Your new password"
					helpText="Please enter your new password here."
					disabled={loading}
					required
					value={''}
					type="password"
					bordered
				/>

				<Button primary block type="submit" disabled={loading}>Change password</Button>
			</form>
		</div>
	</div>
</section>
