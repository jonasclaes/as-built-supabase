<script lang="ts" context="module">
	export type ToastHorizontalLocation = '' | 'left' | 'middle' | 'right';
	export type ToastVerticalLocation = '' | 'top' | 'middle' | 'bottom';
</script>

<script lang="ts">
	import { combineClasses } from '$lib/CombineClasses';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	interface $$Props extends HTMLButtonAttributes {
		horizontalLocation?: ToastHorizontalLocation;
		verticalLocation?: ToastVerticalLocation;
		class?: string;
	}

	const HORIZONTAL_LOCATION_MAPS: Record<ToastHorizontalLocation, string> = {
		'': '',
		left: 'toast-start',
		middle: 'toast-center',
		right: 'toast-end'
	};

	const VERTICAL_LOCATION_MAPS: Record<ToastVerticalLocation, string> = {
		'': '',
		top: 'toast-top',
		middle: 'toast-middle',
		bottom: 'toast-bottom'
	};

	export let horizontalLocation: ToastHorizontalLocation = '';
	export let verticalLocation: ToastVerticalLocation = '';
	export let _class = '';
	export { _class as class };
</script>

<div
	class={combineClasses(
		'toast',
		HORIZONTAL_LOCATION_MAPS[horizontalLocation],
		VERTICAL_LOCATION_MAPS[verticalLocation],
		_class
	)}
	{...$$restProps}
>
	<slot />
</div>
