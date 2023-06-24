<script lang="ts">
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3 pt-16 justify-center h-full">
	<h1 class="text-3xl md:text-5xl text-center font-bold">AS-BUILT</h1>
	<h2 class="text-xl md:text-3xl text-center">Login</h2>
	<div class="card bg-neutral">
		<div class="card-body">
			<Auth
				supabaseClient={data.supabase}
				view="magic_link"
				redirectTo={`${data.url}/auth/callback`}
				showLinks={false}
				appearance={{
					extend: false,
					className: {
						container: 'supabase-auth-container',
						input: 'supabase-auth-input',
						button: 'supabase-auth-button',
						label: 'supabase-auth-label',
						message: 'supabase-auth-message'
					}
				}}
				additionalData={{}}
			/>
		</div>
	</div>
</section>
