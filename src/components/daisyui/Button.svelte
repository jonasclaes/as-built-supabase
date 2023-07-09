<script lang="ts" context="module">
	export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
</script>

<script lang="ts">
	import { applyClassIf } from '$lib/applyClassIf';
	import { combineClasses } from '$lib/combineClasses';
	import { prefixClass } from '$lib/prefix';

	export let primary: boolean = false;
	export let neutral: boolean = false;
	export let secondary: boolean = false;
	export let accent: boolean = false;
	export let ghost: boolean = false;
	export let link: boolean = false;
	export let info: boolean = false;
	export let success: boolean = false;
	export let warning: boolean = false;
	export let error: boolean = false;
	export let block: boolean = false;
	export let wide: boolean = false;
	export let outline: boolean = false;
	export let size: ButtonSize | null = null;
	export let glass: boolean = false;
	export let square: boolean = false;
	export let circle: boolean = false;
	export let type: HTMLButtonElement['type'] | null = null;
	export let disabled: HTMLButtonElement['disabled'] | null = null;
	let _classes: string = '';
	export { _classes as class };
</script>

<button
	class={combineClasses(
		'btn',
		_classes,
		applyClassIf(size !== null, prefixClass('btn-', size)),
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
