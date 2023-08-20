<script lang="ts">
	export let href: string | undefined = undefined;
</script>

<li {...$$restProps}>
	{#if href}
		<a {href}>
			<slot />
		</a>
	{:else}
		<slot />
	{/if}
</li>
