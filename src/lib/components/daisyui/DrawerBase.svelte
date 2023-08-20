<script lang="ts" context="module">
	export type DrawerPosition = '' | 'left' | 'right';
</script>

<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';
	import type { HTMLBaseAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLBaseAttributes {
		id: string;
		open: boolean;
		position?: DrawerPosition;
		class?: string;
	}

	const POSITION_MAPS: Record<DrawerPosition, string> = {
		'': '',
		left: '',
		right: 'drawer-end'
	};

	export let id = '';
	export let open = false;
	export let position: DrawerPosition = '';
	export let _class = '';
	export { _class as class };
</script>

<div class={combineClasses('drawer', POSITION_MAPS[position], _class)} {...$$restProps}>
	<input id={`drawer-${id}`} type="checkbox" class="drawer-toggle" bind:checked={open} />
	<slot />
	<slot name="side" />
</div>
