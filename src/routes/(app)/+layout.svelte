<script lang="ts">
	import { page } from '$app/stores';
	import Drawer from '$lib/components/daisyui/Drawer.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderSide from '$lib/components/HeaderSide.svelte';
	import { navbarStore } from '$lib/stores/navbarStore';

	$: if ($page.data.session) {
		$navbarStore.items = [
			{
				name: 'Dashboard',
				path: '/'
			},
			{
				name: 'Account',
				path: '/account'
			},
			{
				name: 'Settings',
				path: '/settings'
			}
		];
	} else {
		$navbarStore.items = [
			{
				name: 'Login',
				path: '/auth/signIn'
			}
		];
	}
</script>

<div>
	<Drawer id="navbar" bind:open={$navbarStore.open}>
		<Header />
		<main class="grow">
			<slot />
		</main>
		<Footer />

		<HeaderSide slot="side" />
	</Drawer>
</div>
