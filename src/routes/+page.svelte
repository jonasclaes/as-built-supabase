<script lang="ts">
	import { ThemeSupa } from '@supabase/auth-ui-shared';
	import { Auth } from '@supabase/auth-ui-svelte';

	export let data;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1 class="text-3xl">Hello, world!</h1>
	<Auth
		supabaseClient={data.supabase}
		view="magic_link"
		redirectTo={`${data.url}/auth/callback`}
		showLinks={false}
		appearance={{ theme: ThemeSupa, style: { input: 'color: #fff' } }}
		additionalData={{}}
	/>
</section>
