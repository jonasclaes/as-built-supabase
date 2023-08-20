<script>
	import { navbarStore } from '$lib/stores/navbarStore';
</script>

<ul class="menu p-4 w-80 h-full bg-base-200">
	{#each $navbarStore.items as item}
		<li>
			<a href={item.path} on:click={() => ($navbarStore.open = false)}>{item.name}</a>
		</li>
	{/each}
</ul>
