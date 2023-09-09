<script lang="ts">
	import { enhance } from '$app/forms';
	import { capitalize } from '$lib/Capitalize';
	import Alert from '$lib/components/daisyui/Alert.svelte';
	import Button from '$lib/components/daisyui/Button.svelte';
	import Input from '$lib/components/daisyui/LegacyInput.svelte';
	import Link from '$lib/components/daisyui/Link.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
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

	$breadcrumbStore = [{ name: 'Sign in with magic link', path: '/auth/signInWithMagicLink' }];
</script>

<svelte:head>
	<title>Sign in</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

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

			<Button color="primary" styles={['block']} type="submit" disabled={loading}
				>Sign in with magic link</Button
			>
			<Link styles={['block', 'ghost']} href="/auth/signIn">Sign in</Link>
		</form>
	</div>
</div>
