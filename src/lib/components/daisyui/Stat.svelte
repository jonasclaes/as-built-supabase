<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';

	export let title: string | null = null;
	export let value: string | null = null;
	export let description: string | null = null;
	export let _class = '';
	export { _class as class };
</script>

<div class={combineClasses('stat', _class)} {...$$restProps}>
	{#if $$slots.figure}
		<div class="stat-figure text-secondary">
			<slot name="figure" />
		</div>
	{/if}
	{#if title}
		<div class="stat-title">{title}</div>
	{/if}
	{#if value}
		<div class="stat-value">{value}</div>
	{/if}
	{#if description}
		<div class="stat-desc">{description}</div>
	{/if}
	{#if $$slots.actions}
		<div class="stat-actions">
			<slot name="actions" />
		</div>
	{/if}
</div>
