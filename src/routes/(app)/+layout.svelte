<script lang="ts">
	import { page } from '$app/stores';
	import Breadcrumb from '$lib/components/daisyui/Breadcrumb.svelte';
	import Breadcrumbs from '$lib/components/daisyui/Breadcrumbs.svelte';
	import Drawer from '$lib/components/daisyui/Drawer.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import HeaderSide from '$lib/components/HeaderSide.svelte';
	import { breadcrumbStore } from '$lib/stores/breadcrumbStore';
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
			<section class="flex flex-col gap-3 w-full max-w-2xl mx-auto p-3">
				<Breadcrumbs>
					{#each $breadcrumbStore as breadcrumb}
						<Breadcrumb href={breadcrumb.path}>{breadcrumb.name}</Breadcrumb>
					{/each}
				</Breadcrumbs>
				<slot />
			</section>
		</main>
		<Footer />

		<HeaderSide slot="side" />
	</Drawer>
</div>
