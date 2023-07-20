<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/Input.svelte';
	import type { ActionData, SubmitFunction } from './$types';

	export let form: ActionData;

	let loading = false;

	const handleSignInWithMagicLink: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update({ reset: false });
		};
	};
</script>

<svelte:head>
	<title>Sign in</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3 pt-16 justify-center h-full">
	<h1 class="text-3xl md:text-5xl text-center font-bold">AS-BUILT</h1>
	<h2 class="text-xl md:text-3xl text-center">Sign in</h2>
	<div class="card bg-base-200">
		<div class="card-body">
			{#if !loading}
				{#if form?.success === false && form?.message}
					<Alert type="error">
						<span>Error! {capitalize(form.message)}</span>
					</Alert>
				{/if}

				{#if form?.success === true && form?.message}
					<Alert type="success">
						<span>Success! {capitalize(form.message)}</span>
					</Alert>
				{/if}
			{/if}

			<form
				action="?/signInWithMagicLink"
				method="post"
				use:enhance={handleSignInWithMagicLink}
				class="flex flex-col gap-3"
			>
				<Input
					name="email"
					label="Your email address"
					placeholder="Your email address"
					helpText="Please enter your email address here."
					disabled={loading}
					required
					value={form?.email ?? ''}
					bordered
				/>

				<Button primary block type="submit" disabled={loading}>Sign in with magic link</Button>
				<Button ghost block disabled={loading} href="/auth/signIn">Sign in</Button>
			</form>
		</div>
	</div>
</section>
