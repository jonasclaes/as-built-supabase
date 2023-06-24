<script lang="ts">
	import { page } from '$app/stores';

	interface NavbarItem {
		text: string;
		href: string;
	}

	const navbarItems: NavbarItem[] = [
		{
			text: 'Dashboard',
			href: '/dashboard'
		},
		{
			text: 'Account',
			href: '/account'
		}
	];
</script>

<header>
	<div class="drawer">
		<input id="nav-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content flex flex-col">
			<!-- Navbar -->
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
					<a href="/" class="btn btn-ghost normal-case text-xl">AS-BUILT</a>
				</div>
				<div class="navbar-end">
					<div class="flex-none hidden lg:block">
						<ul class="menu menu-horizontal">
							<!-- Navbar menu content here -->
							{#each navbarItems as navbarItem}
								<li><a href={navbarItem.href}>{navbarItem.text}</a></li>
							{/each}
						</ul>
					</div>
				</div>
			</div>
			<!-- Page content here -->
			<slot />
		</div>
		<div class="drawer-side">
			<label for="nav-drawer" class="drawer-overlay" />
			<ul class="menu p-4 w-80 h-full bg-base-200">
				<!-- Sidebar content here -->
				{#each navbarItems as navbarItem}
					<li><a href={navbarItem.href}>{navbarItem.text}</a></li>
				{/each}
			</ul>
		</div>
	</div>
</header>
