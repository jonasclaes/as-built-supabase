<script lang="ts" context="module">
	export type StepColor =
		| ''
		| 'primary'
		| 'secondary'
		| 'accent'
		| 'success'
		| 'warning'
		| 'error'
		| 'info';
</script>

<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLBaseAttributes {
		color?: StepColor;
		class?: string;
	}

	const COLOR_MAPS: Record<StepColor, string> = {
		'': '',
		primary: 'step-primary',
		secondary: 'step-secondary',
		accent: 'step-accent',
		success: 'step-success',
		warning: 'step-warning',
		error: 'step-error',
		info: 'step-info'
	};

	export let color: StepColor = '';
	export let _class = '';
	export { _class as class };
</script>

<li class={combineClasses('step', COLOR_MAPS[color], _class)} {...$$restProps}>
	<slot />
</li>
