<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { PageData } from './$types';

	export let data: PageData;
	export let form: Record<string, any>;

	let { session, supabase, profile, organization } = data;
	$: ({ session, supabase, profile, organization } = data);

	let profileForm: HTMLFormElement;
	let loading = false;
	let fullName: string = profile?.full_name ?? '';
	let username: string = profile?.username ?? '';
	let website: string = profile?.website ?? '';
	let organizationName: string = organization?.name ?? '';

	const handleSubmit: SubmitFunction = () => {
		loading = true;
		return async () => {
			loading = false;
		};
	};

	const handleSignOut: SubmitFunction = () => {
		loading = true;
		return async ({ update }) => {
			loading = false;
			update();
		};
	};
</script>

<div class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
	<form
		action="?/update"
		method="post"
		use:enhance={handleSubmit}
		bind:this={profileForm}
		class="grid grid-cols-1 md:grid-cols-2 gap-3"
	>
		<div class="form-control w-full">
			<label class="label" for="email">
				<span class="label-text">Email</span>
			</label>
			<input
				type="email"
				id="email"
				class="input input-bordered w-full"
				value={session?.user.email}
				disabled
			/>
			<label class="label" for="email">
				<span class="label-text-alt">Your email address. This cannot be changed.</span>
			</label>
		</div>

		<div class="form-control w-full">
			<label class="label" for="fullName">
				<span class="label-text">Full name</span>
			</label>
			<input
				type="text"
				name="fullName"
				placeholder="Your full name"
				id="fullName"
				class="input input-bordered w-full"
				value={form?.fullName ?? fullName}
			/>
			<label class="label" for="fullName">
				<span class="label-text-alt">Your full name.</span>
			</label>
		</div>

		<div class="form-control w-full col-span-full">
			<label class="label" for="organizationName">
				<span class="label-text">Organization name</span>
			</label>
			<input
				type="text"
				placeholder="Your organization name"
				id="organizationName"
				class="input input-bordered w-full"
				value={organizationName}
				disabled
			/>
			<label class="label" for="organizationName">
				<span class="label-text-alt">Your organization name.</span>
			</label>
		</div>

		<div class="form-control w-full">
			<label class="label" for="username">
				<span class="label-text">Username</span>
			</label>
			<input
				type="text"
				name="username"
				placeholder="Your username"
				id="username"
				class="input input-bordered w-full"
				value={form?.username ?? username}
			/>
			<label class="label" for="username">
				<span class="label-text-alt">Your username.</span>
			</label>
		</div>

		<div class="form-control w-full">
			<label class="label" for="website">
				<span class="label-text">Website</span>
			</label>
			<input
				type="url"
				name="website"
				placeholder="Your website"
				id="website"
				class="input input-bordered w-full"
				value={form?.website ?? website}
			/>
			<label class="label" for="website">
				<span class="label-text-alt">Your website.</span>
			</label>
		</div>

		<div class="col-span-full">
			<button type="submit" disabled={loading} class="btn btn-block btn-primary">
				{#if loading}
					<span class="loading loading-spinner" />
					loading
				{:else}
					Update
				{/if}</button
			>
		</div>
	</form>

	<form
		action="?/signout"
		method="post"
		use:enhance={handleSignOut}
		class="grid grid-cols-1 gap-3"
	>
		<div>
			<button disabled={loading} class="btn btn-block btn-secondary">Sign Out</button>
		</div>
	</form>
</div>
