<script lang="ts" context="module">
	export type StepLayout = '' | 'vertical' | 'horizontal';
</script>

<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLBaseAttributes {
		layout?: StepLayout;
		class?: string;
	}

	const LAYOUT_MAPS: Record<StepLayout, string> = {
		'': '',
		vertical: 'steps-vertical',
		horizontal: 'steps-horizontal'
	};

	export let layout: StepLayout = '';
	export let _class = '';
	export { _class as class };
</script>

<ul class={combineClasses('steps', LAYOUT_MAPS[layout], _class)} {...$$restProps}>
	<slot />
</ul>
