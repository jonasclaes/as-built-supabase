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

	const handleLogin: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			await update({ reset: false });
		};
	};

	$breadcrumbStore = [{ name: 'Sign in', path: '/auth/signIn' }];
</script>

<svelte:head>
	<title>Sign in</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<h1 class="text-3xl md:text-5xl text-center font-bold">AS-BUILT</h1>
<h2 class="text-xl md:text-3xl text-center">Sign in</h2>
<div class="card bg-base-200">
	<div class="card-body">
		{#if form?.message}
			<Alert type="error">
				<span>Error! {capitalize(form.message)}</span>
			</Alert>
		{/if}

		<form action="?/signIn" method="post" use:enhance={handleLogin} class="flex flex-col gap-3">
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

			<Input
				name="password"
				label="Your password"
				placeholder="Your password"
				helpText="Please enter your password here."
				disabled={loading}
				required
				value={''}
				type="password"
				bordered
			/>

			<Button color="primary" styles={['block']} disabled={loading} type="submit">Sign in</Button>
			<Link color="secondary" styles={['block']} href="/auth/signInWithMagicLink"
				>Sign in with magic link</Link
			>
			<Link styles={['block']} href="/auth/resetPassword">Forgot password?</Link>
		</form>
	</div>
</div>
