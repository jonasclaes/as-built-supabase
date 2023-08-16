<script lang="ts">
	import { page } from '$app/stores';
	import Footer from './Footer.svelte';

	let drawerOpen = false;

	interface NavbarItem {
		text: string;
		href: string;
	}

	let navbarItems: NavbarItem[] = [];

	if ($page.url.pathname.startsWith('/public')) {
		navbarItems = [
			{
				text: 'Project',
				href: `/public/project/${$page.data.project?.id ?? ''}`
			},
			{
				text: 'Create revision proposal',
				href: `/public/project/${$page.data.project?.id ?? ''}/createRevisionProposal`
			}
		];
	} else if ($page.data.session) {
		navbarItems = [
			{
				text: 'Dashboard',
				href: '/'
			},
			{
				text: 'Account',
				href: '/account'
			}
		];
	} else {
		navbarItems = [
			{
				text: 'Login',
				href: '/login'
			}
		];
	}
</script>

<header>
	<div class="drawer">
		<input id="nav-drawer" type="checkbox" class="drawer-toggle" bind:checked={drawerOpen} />
		<div class="drawer-content flex flex-col min-h-screen">
			<div class="navbar bg-base-300">
				<div class="navbar-start">
					<div class="flex-none lg:hidden">
						<label for="nav-drawer" class="btn btn-square btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								class="inline-block w-6 h-6 stroke-current"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M4 6h16M4 12h16M4 18h16"
								/></svg
							>
						</label>
					</div>
				</div>
				<div class="navbar-center">
					<a href="/" class="btn btn-ghost normal-case text-xl font-bold">AS-BUILT</a>
				</div>
				<div class="navbar-end">
					<div class="flex-none hidden lg:block">
						<ul class="menu menu-horizontal">
							{#each navbarItems as navbarItem}
								<li><a href={navbarItem.href}>{navbarItem.text}</a></li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
			<slot />
			<Footer />
		</div>
		<div class="drawer-side z-50">
			<label for="nav-drawer" class="drawer-overlay" />
			<ul class="menu p-4 w-80 h-full bg-base-200">
				{#each navbarItems as navbarItem}
					<li>
						<a
							href={navbarItem.href}
							on:click={() => {
								drawerOpen = false;
							}}>{navbarItem.text}</a
						>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</header>
