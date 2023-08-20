<script lang="ts">
	import { navbarStore } from '$lib/stores/navbarStore';

	let baseUrl = '#';
</script>

<header>
	<div class="navbar bg-base-300">
		<div class="navbar-start">
			<div class="flex-none lg:hidden">
				<button class="btn btn-square btn-ghost" on:click={() => ($navbarStore.open = true)}>
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
				</button>
			</div>
		</div>
		<div class="navbar-center">
			<a href={baseUrl} class="btn btn-ghost normal-case text-xl font-bold">AS-BUILT</a>
		</div>
		<div class="navbar-end">
			<div class="flex-none hidden lg:block">
				<ul class="menu menu-horizontal">
					{#each $navbarStore.items as item}
						<li><a href={item.path}>{item.name}</a></li>
					{/each}
				</ul>
			</div>
		</div>
	</div>
</header>
