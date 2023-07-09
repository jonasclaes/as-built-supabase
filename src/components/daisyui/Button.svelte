<script lang="ts" context="module">
	export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { applyClassIf } from '$lib/applyClassIf';
	import { combineClasses } from '$lib/combineClasses';

	export let primary = false;
	export let neutral = false;
	export let secondary = false;
	export let accent = false;
	export let ghost = false;
	export let link = false;
	export let info = false;
	export let success = false;
	export let warning = false;
	export let error = false;
	export let block = false;
	export let wide = false;
	export let outline = false;
	export let size: ButtonSize | null = null;
	export let glass = false;
	export let square = false;
	export let circle = false;
	export let type: HTMLButtonElement['type'] | null = null;
	export let disabled: boolean | null = null;
	export let buttonClasses = '';
</script>

<button
	class={combineClasses(
		'btn',
		buttonClasses,
		applyClassIf(size === 'xs', 'btn-xs'),
		applyClassIf(size === 'sm', 'btn-sm'),
		applyClassIf(size === 'md', 'btn-md'),
		applyClassIf(size === 'lg', 'btn-lg'),
		applyClassIf(neutral, 'btn-neutral'),
		applyClassIf(primary, 'btn-primary'),
		applyClassIf(secondary, 'btn-secondary'),
		applyClassIf(accent, 'btn-accent'),
		applyClassIf(ghost, 'btn-ghost'),
		applyClassIf(link, 'btn-link'),
		applyClassIf(info, 'btn-info'),
		applyClassIf(success, 'btn-success'),
		applyClassIf(warning, 'btn-warning'),
		applyClassIf(error, 'btn-error'),
		applyClassIf(block, 'btn-block'),
		applyClassIf(wide, 'btn-wide'),
		applyClassIf(outline, 'btn-outline'),
		applyClassIf(glass, 'glass'),
		applyClassIf(square, 'btn-square'),
		applyClassIf(circle, 'btn-circle')
	)}
	{type}
	{disabled}
>
	<slot />
</button>
